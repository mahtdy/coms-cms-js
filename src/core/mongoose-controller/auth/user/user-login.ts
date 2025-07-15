import { Response } from "../../../controller";
import BaseLogIn from "../../../logInController";
import BlockListRepository from "../../repositories/blocklist/repository";
import SystemConfigRepository from "../../repositories/system/repository";
import BaseUser from "../../repositories/user/model";
import UserRepository from "../../repositories/user/repository";
import { Body, Session } from "../../../decorators/parameters";
import BaseController from "../../controller";
import SmsMessager from "../../../messaging/smsMessager";
import UserAuthenticator from "./userAuthenticator";
import BlockList from "../../repositories/blocklist/model";
import LoginHistory from "../../repositories/loginHistory/model";
import LoginHistoryRepository from "../../repositories/loginHistory/repository";
import speakeasy from "speakeasy";
import { z } from "zod"
import RandomGenarator from "../../../random";
import { Types } from "mongoose";
import { Route } from "../../../application";

interface checkCaptchaType {
    captcha: boolean,
    type?: string,
    // session : any
}

function checkNeedCaptcha(index: number) {

    return (target: any,
        propertyKey: string,
        propertyDescriptor: PropertyDescriptor
    ): PropertyDescriptor => {
        propertyDescriptor = propertyDescriptor;

        const originalMethod = propertyDescriptor.value;


        propertyDescriptor.value = async function (...args: any[]) {
            var session = args[index]
            try {
                if (session["sendCaptcha"]) {
                    var secret_key = ""
                    try {
                        return await new Promise((resolve, reject) => {
                            // request.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${args[0].body.token}`,
                            //     {
                            //         'headers': {
                            //             'Content-Type': 'application/json'
                            //         },
                            //         body: JSON.stringify({}),
                            //     }, async function (error: any, response: any) {

                            //         if (error) {
                            //             return resolve(await originalMethod.apply(this, args))
                            //         }
                            //         var responseData = JSON.parse(response.body)

                            //         if (responseData.success) {
                            //             return resolve(await originalMethod.apply(this, args))
                            //         }
                            //         else {
                            //             return resolve(new ApiResponse.BadRequestResponse("کپتچا ارسال شود", {
                            //                 sendCaptch: true
                            //             }).send(args[1]))
                            //         }
                            //     })
                        })
                    } catch (error) {

                    }
                }
                else {
                    var result = await originalMethod.apply(this, args);

                    return result;
                }
            } catch (err) {
                throw err
            }
        };
        Object.defineProperty(propertyDescriptor.value, 'name', {
            writable: true,
            value: propertyKey
        });
        // propertyDescriptor.value = originalMethod.name
        return propertyDescriptor;
    }
}



export default class LogInController<T extends BaseUser> extends BaseLogIn {
    userRepository: UserRepository<T>;
    sessionExpires: number;
    constructor(baseRoute: string, repo: UserRepository<T>) {
        super(baseRoute)
        this.userRepository = repo;
        this.sessionExpires = 1200000
        this.initApis()
    }

    @checkNeedCaptcha(1)
    async checkLogin(
        @Body({
            destination: "phoneNumber",
            schema: BaseController.phone
        }) phoneNumber: string,
        @Session() session: any
    ): Promise<Response> {
        try {
            var user = await this.userRepository.findOne({
                phoneNumber
            },
                {
                    fromDb: true,
                    projection: {}
                }
            )
        } catch (error) {
            throw error
        }
        if (user == null) {
            return {
                status: 404,
                message: "موردی یافت نشد"
            }
        }
        var blockList = await new BlockListRepository().findOne({
            id: user._id,
            expireDate: {
                $gte: new Date()
            },
            owner: "user"
        })
        if (blockList != null) {
            return {
                status: 403,
                data: { expireDate: blockList.expireDate }
            }
        }

        if (user.towFactorTocken && await new SystemConfigRepository().isExists({
            key: "user-2f-status",
            value: true
        })) {
            session["towFactorTocken"] = user.towFactorTocken
        }
        session['phoneNumber'] = phoneNumber
        session['canLogIn'] = true
        session['userId'] = user._id
        if (session['cookie']) {
            session['cookie'] = {}
        }
        session.cookie.expires = new Date(Date.now() + this.sessionExpires)

        return {
            status: 200,
            message: "رمز خود را وارد کنید",
            session
        }
    }

    @checkNeedCaptcha(1)
    async logIn(
        @Body({
            destination: "password",
            schema: z.string().min(8)
        }) password: string,
        @Session() session: any
    ): Promise<Response> {
        try {
            var user = await this.userRepository.findOne({
                phoneNumber: session["phoneNumber"]
            }, {
                projection: {
                    password: 1,
                    name: 1,
                    family: 1,
                    email: 1,
                    phoneNumber: 1,
                    changePassword : 1
                },
                fromDb: true
            }
            )
        } catch (error) {
            throw error
        }
        if (user == null) {
            return {
                status: 404,
                message: "موردی یافت نشد"
            }
        }

        if (await this.userRepository.comparePassword(user, password) == false) {
            this.sendWrongPhoneAlert(user)
            this.checkBlock(user)
            var checkCaptcha = await this.checkCaptcha(session)

            if (checkCaptcha?.captcha) {
                return {
                    status: 401,
                    message: "کد وارد شده اشتباه است",
                    data: {
                        captcha: true,
                        type: checkCaptcha.type
                    }
                }
            }
            return {
                status: 401,
                message: "رمز وارد شده نادرست است"
            }
        }
        if(user.changePassword) {
            session["canChangePassword"] = true
            session["userId"] = user._id
            return {
                status: 200,
                message: "لطفا ابتدا رمز خود را عوض کنید",
                data: { changePassword: true },
                session
            }
        }
        var conf = await new SystemConfigRepository().getConf("password-days-limit")
        if (conf != null) {
            try {
                if (await this.userRepository.isExists({
                    _id: user._id,
                    $or: [
                        {
                            passwordLastChange: {
                                $lte: new Date(Date.now() - (1000 * 24 * 60 * 60 * conf.value))
                            }
                        }, {
                            changePassword : true
                        }
                    ]
                })) {
                    session["canChangePassword"] = true
                    session["userId"] = user._id
                    return {
                        status: 200,
                        message: "لطفا ابتدا رمز خود را عوض کنید",
                        data: { changePassword: true },
                        session
                    }
                }
            } catch (error) {
                throw error
            }
        }

        if (session["towFactorTocken"]) {
            session["logInWithTowFactor"] = true
            session["user"] = user
            if (session['cookie']) {
                session['cookie'] = {}
            }
            session.cookie.expires = new Date(Date.now() + this.sessionExpires)
            return {
                status: 200,
                message: "کد دو عاملی خود را وارد کنید",
                data: { towFactor: true }
            }
        }

        var token = await this.authenticate(user)

        if (session['cookie']) {
            session['cookie'] = {}
        }
        session.cookie.expires = new Date(Date.now() - 1)
        return {
            status: 200,
            message: "با موفقیت وارد شدید",
            session,
            responseHeader: {
                "auth-token": token
            }
        }

    }

    @checkNeedCaptcha(1)
    async towFactor(
        @Body({
            destination: "code",
            schema: BaseController.totp
        }) code: string,
        @Session() session: any
    ): Promise<Response> {
        if (session["logInWithTowFactor"] != true) {
            return {
                status: 400,
                message: "ابتدا رمز خود را وارد کنید"
            }
        }


        let isVerified = speakeasy.totp.verify({
            secret: session["towFactorTocken"],
            encoding: "ascii",
            token: code
        })

        if (!isVerified) {
            this.sendWrongPhoneAlert(session["user"])
            this.checkBlock(session["user"])
            var checkCaptcha = await this.checkCaptcha(session)
            if (checkCaptcha?.captcha) {
                return {
                    status: 401,
                    message: "کد وارد شده اشتباه است",
                    data: {
                        captcha: true,
                        type: checkCaptcha.type
                    }
                }
            }
            return {
                status: 401,
                message: "کد وارد شده اشتباه است"
            }
        }


        var token = await this.authenticate(session["user"])

        if (session['cookie']) {
            session['cookie'] = {}
        }
        session.cookie.expires = new Date(Date.now() - 1)

        return {
            status: 200,
            message: "با موفقیت وارد شدید",
            session,
            responseHeader: {
                "auth-token": token
            }
        }
    }

    checkPhone(@Session() session: any): Response {
        if (session["canLogIn"] != true) {
            return {
                status: 400,
                message: "ابتدا شماره تلفن خود را وارد کنید"
            }
        }
        return {
            next: true
        }
    }

    @checkNeedCaptcha(1)
    async checkRandom(
        @Body({
            destination: "random",
            schema: BaseController.random
        }) random: number,
        @Session() session: any
    ): Promise<Response> {
        if (session["random"] != random || random == undefined) {
            this.sendWrongPhoneAlert(await this.userRepository.findOne({
                phoneNumber: session["phoneNumber"]
            }) as BaseUser)
            this.checkBlock(await this.userRepository.findOne({
                phoneNumber: session["phoneNumber"]
            }) as BaseUser)
            var checkCaptcha = await this.checkCaptcha(session)
            if (checkCaptcha?.captcha) {
                return {
                    status: 401,
                    message: "کد وارد شده اشتباه است",
                    data: {
                        captcha: true,
                        type: checkCaptcha.type
                    }
                }
            }
            return {
                status: 401,
                message: "کد وارد شده اشتباه است"
            }
        }

        if (session["isForget"]) {
            session["canChangePassword"] = true
            if (session['cookie']) {
                session['cookie'] = {}
            }
            session.cookie.expires = new Date(Date.now() + this.sessionExpires)
            return {
                status: 200,
                message: "رمز جدید خود را وارد کنید",
                session
            }
        }

        try {
            var user = await this.userRepository.findOne({
                phoneNumber: session["phoneNumber"]
            })
        } catch (error) {
            throw error
        }

        if (user == null) {
            return {
                status: 404,
                message: "شماره تلفن شما یافت نشد"
            }
        }
        var conf = await new SystemConfigRepository().getConf("password-days-limit")
        if (conf != null) {
            try {
                if (await this.userRepository.isExists({
                    _id: user._id,
                    $or: [
                        {
                            passwordLastChange: {
                                $lte: new Date(Date.now() - (1000 * 24 * 60 * 60 * conf.value))
                            }
                        }, {
                            changePassword : true
                        }
                    ]
                })) {
                    session["canChangePassword"] = true
                    session["userId"] = user._id
                    return {
                        status: 200,
                        message: "لطفا ابتدا رمز خود را عوض کنید",
                        data: { changePassword: true },
                        session
                    }
                }
            } catch (error) {
                throw error
            }

        }
        // console.log(user)
        var token = await this.authenticate(user)

        if (session['cookie']) {
            session['cookie'] = {}
        }
        session.cookie.expires = new Date(Date.now() - 1)

        return {
            status: 200,
            message: "با موفقیت وارد شدید",
            session,
            responseHeader: {
                "auth-token": token
            }
        }

    }

    @checkNeedCaptcha(2)
    async sendRandom(
        @Body({
            destination: "way",
            schema: z.enum(["email", "phone"])
        }) way: "email" | "phone",
        @Body({
            destination: "isForget",
            schema: z.boolean()
        }) isForget: boolean,
        @Session() session: any
    ): Promise<Response> {
        var random: Number = RandomGenarator.randomNumber()
        if (way == "email") {
            if (await new SystemConfigRepository().isExists({
                key: "user-2f-email",
                value: false
            })) {
                return {
                    status: 400,
                    message: "این قابلیت در حال حاضر غیرفعال است"
                }
            }
            var result = true
        }
        else {
            if (await new SystemConfigRepository().isExists({
                key: "user-2f-sms",
                value: false
            })) {
                return {
                    status: 400,
                    message: "این قابلیت در حال حاضر غیرفعال است"
                }
            }
            try {
                var result = await SmsMessager.send({
                    receptor: session['phoneNumber'],
                    template: 'rigisterPhoneNumber',
                    parameters: {
                        random: random,
                    }
                })
            } catch (error) {
                throw error
            }
        }

        if (result == false) {
            return {
                status: 500,
                message: "مشکلی در سرویس پیامکی رخ داده است"
            }
        }

        if (isForget) {
            session["isForget"] = true
        }
        session["random"] = random

        if (session['cookie']) {
            session['cookie'] = {}
        }
        session.cookie.expires = new Date(Date.now() + this.sessionExpires)

        return {
            status: 200,
            message: "کد ورود با موفقیت برای شما ارسال شد",
            session
        }

    }

    @checkNeedCaptcha(1)
    async changePassword(
        @Body({
            destination: "password",
            schema: z.string().min(8)
        }) password: string,
        @Session() session: any
    ): Promise<Response> {
        if (session["canChangePassword"] != true) {
            return {
                status: 400,
                message: "شما مجاز به تغییر رمز عبور نیستید"
            }
        }

        try {
            var admin = await this.userRepository.changePassword(session["userId"], password)
        } catch (error) {
            throw error
        }

        if (admin == null) {
            return {
                status: 404,
                message: "کاربری با اطلاعات وارد شده یافت نشد"
            }
        }

        if (session['cookie']) {
            session['cookie'] = {}
        }
        session.cookie.expires = new Date(Date.now() - 1)

        return {
            status: 200,
            message: "رمز شما با موفقیت تغییر کرد",
            session
        }
    }


    async sendWrongPhoneAlert(user: BaseUser) {
        var systemConfig = new SystemConfigRepository()
        if (await systemConfig.isExists({
            key: "user-wrong-login-send-sms",
            value: true
        })) {
            try {
                await SmsMessager.send({
                    parameters: {
                        date: new Date().toLocaleString("fa-IR")
                    },
                    receptor: user.phoneNumber,
                    template: "alertWrongLogIn"
                })
            } catch (error) {

            }
        }
        if (await systemConfig.isExists({
            key: "user-wrong-login-send-email",
            value: true
        })) {

        }
    }

    async authenticate(user: BaseUser) {
        var userAuthenticator: UserAuthenticator = new UserAuthenticator()

        return userAuthenticator.authenticate({
            name: user.name,
            family: user.family,
            id: user._id,
            phoneNumber: user.phoneNumber,
            email: user.email
        })
    }

    async checkBlock(user: BaseUser) {
        var systemConfigRepo = new SystemConfigRepository()
        var blockListRepo = new BlockListRepository()
        var loginHistoryRepo = new LoginHistoryRepository()
        if (await systemConfigRepo.isExists({
            key: "user-wrong-login-status",
            value: true
        })) {
            try {
                var blockList = await blockListRepo.findOne({
                    id: user.id,
                    owner: "user",
                    expireDate: {
                        $gte: new Date()
                    }
                })
            } catch (error) {
                return
            }

            var step = 1
            if (blockList != null) {
                step = blockList.step + 1
            }

            try {
                var loginHistory = await loginHistoryRepo.findOne({
                    owner: "user",
                    id: user._id
                })

            } catch (error) {
                return
            }
            if (loginHistory == null) {
                try {
                    await loginHistoryRepo.insert({
                        owner: "user",
                        id: user._id,
                        count: 1
                    } as unknown as LoginHistory)
                    return
                } catch (error) {
                    return
                }

            }

            try {
                var blockCount = await systemConfigRepo.findOne({
                    key: "user-wrong-login-blockcount" + step
                })

            } catch (error) {
                return
            }

            if (blockCount?.value <= loginHistory.count) {
                await loginHistoryRepo.deleteById(loginHistory._id)
                if (blockList != null) {
                    await blockListRepo.deleteById(blockList._id)
                }
                var blockTime = await systemConfigRepo.findOne({
                    key: "user-wrong-login-blocktime" + step
                })
                await blockListRepo.insert({
                    expireDate: new Date(Date.now() + 1000 * 60 * blockTime?.value),
                    id: user._id,
                    owner: "user",
                    step: step
                } as unknown as BlockList)
            }

            else {
                await loginHistoryRepo.updateOne({
                    _id: loginHistory._id
                }, {
                    $inc: {
                        "count": 1
                    }
                })
                return
            }
        }
    }

    public async checkCaptcha(session: any): Promise<checkCaptchaType | undefined> {
        var systemConfig = new SystemConfigRepository()
        try {
            if (await systemConfig.isExists({
                key: "user-wrong-login-captch",
                value: true
            })) {
                var wrongLoginCount = session["wrongLogInCount"]
                if (wrongLoginCount == undefined) {
                    session["wrongLogInCount"] = 1
                    return {
                        captcha: false
                    }
                }
                wrongLoginCount += 1
                var wrongCount = await systemConfig.getConf("user-wrong-login-captch-count")
                if (wrongCount != null && wrongCount.value <= wrongLoginCount) {
                    session["sendCaptcha"] = true
                    return {
                        captcha: true,
                        type: "1"
                    }
                }

                else {
                    session["wrongLogInCount"] = wrongLoginCount
                    return {
                        captcha: false
                    }
                }
            }
        } catch (error) {
            return {
                captcha: false
            }
        }

    }

    initApis() {
        this.addRoute("/logIn/check", "post", this.checkLogin.bind(this))
        this.addRoute("/logIn", "post", this.logIn.bind(this))
        this.addRoute("/logIn/towFactor", "post", this.towFactor.bind(this))
        this.addRoute("/logIn/sendRandom", "post", this.sendRandom.bind(this))
        this.addRoute("/logIn/random", "post", this.checkRandom.bind(this))
        this.addRoute("/logIn/password", "put", this.changePassword.bind(this))
    }
}

export interface UserInfo {
    name?: string,
    id?: Types.ObjectId | string,
    phoneNumber?: string,
    email?: string
}