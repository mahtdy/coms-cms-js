import AdminRepository from "../repositories/admin/repository"
import SmsMessager from "../../messaging/smsMessager";
import EmailMessager from "../../messaging/emailMessager";
import qrcode from "qrcode"
import speakeasy from "speakeasy"
import { BaseAdmin } from "../repositories/admin/model"
import BaseController, { ControllerOptions } from "../controller";
import { promisify } from "util"
import RandomGenarator from "../../random"
import { Admin, Body, Next, Session } from "../../decorators/parameters";
import { z, ZodString } from "zod"
import { AdminInfo } from "../auth/admin/admin-logIn"
import { Response } from "../../controller";
import { Get, Middleware, Post } from "../../decorators/method";
import LanguageRepository from "../repositories/language/repository";

var toDataURL = promisify(qrcode.toDataURL)

export default class AdminAccount extends BaseController<BaseAdmin>{
    languageRepo: LanguageRepository
    constructor(baseRoute: string, repo: AdminRepository<BaseAdmin>, options?: ControllerOptions) {
        super(baseRoute, repo, options)
        this.languageRepo = new LanguageRepository()
    }

    async setPaswword(
        @Body({
            destination: "password",
            schema: z.string().min(8)
        }) password: string,
        @Admin() admin: AdminInfo,
        @Session() session: any
    ): Promise<Response | undefined> {
        try {
            var verifed = await this.repository.comparePassword(admin, password)
            if (verifed) {
                var expired = Date.now() + (1000 * 300)
                session["secirity_expired"] = [expired]
                return {
                    status: 200,
                    data: { expired },
                    message: "موفق",
                    session
                }
            }
            else {
                return {
                    status: 400,
                    message: "رمز غلط"
                }
            }
        } catch (error) {
            throw error
        }
    }

    checkPasswordExpired(@Session() session: any): Response {
        var expired = session["secirity_expired"]
        if (!expired || expired < Date.now()) {
            return {
                status: 403,
                data: { sendPassword: true },
                message: "عدم دسترسی"
            }
        }
        return {
            next: true
        }
    }


    getPasswordExpired(@Session() session: any): Response {
        var expired = session['secirity_expired']
        if (!expired || expired < Date.now()) {
            return {
                status: 403,
                message: "عدم دسترسی",
                data: { sendPassword: true }
            }
        }
        return {
            status: 200,
            data: { expired }
        }
    }

    // async getAdminInfo(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    //     var adminInfo = SessionHandler.get(req, "admin")

    //     if (adminInfo != undefined && adminInfo["_id"] != undefined) {
    //         var admin = await this.repository.findById(adminInfo["_id"])
    //         if (admin == null) {
    //             return new ApiResponse.ForbiddenResponse("عدم دسترسی", {}).send(res)
    //         }
    //         req.adminInfo = admin
    //         next()
    //     } else {
    //         return new ApiResponse.ForbiddenResponse("عدم دسترسی", {}).send(res)
    //     }
    // }

    async getProfile(@Admin() admin: AdminInfo): Promise<Response> {
        // console.log(admin)
        return super.findById(admin._id, {
            projection: {
                "_id": 1,
                "towFactorEnable": 1,

                "phoneNumber": 1,
                "phoneRegistered": 1,
                isSuperAdmin: 1,

                "email": 1,
                "isEmailRegistered": 1,


                "towFactorLogIn": 1,

                "name": 1,
                "familyName": 1,
                "image": 1,

                "passwordLastChange": 1,
                "securityQuestion": 1,

                "validIPList": 1

            }
        })
    }


    @Post("/language")
    async setLanguage(
        @Session() session: any,
        @Body({
            destination: "language",
            schema: BaseController.id
        }) language: string
    ): Promise<Response> {
        try {
            let isExists = await this.languageRepo.isExists({
                _id: language
            })
            if (!isExists) {
                return {
                    status: 404,
                    message : "زبان یافت نشد"
                }
            }

            session.language = language
            return  {
                session , 
                status : 200,
                message : "عملیات موفق"
            }
        } catch (error) {
            throw error
        }
    }


    @Get("/language")
    async getLanguage(
        @Session() session : any
    ) :Promise<Response>{
        return {
            data : session.language
        }
    }


    async changePassword(
        @Body({
            destination: "password",
            schema: z.string().min(8)
        }) password: string,
        @Admin() admin: any
    ): Promise<Response> {
        try {
            var admin = await this.repository.changePassword(admin._id, password)
        } catch (error) {
            throw error
        }
        if (admin == null) {
            return {
                status: 400,
                message: "کاربری با اطلاعات وارد شده یافت نشد"
            }
        }
        return {
            status: 200,
            message: "رمز شما با موفقیت تغییر یافت"
        }
    }


    async toggleTwoFactor(
        @Admin() adminInfo: AdminInfo,

    ): Promise<Response> {
        try {
            var admin = await this.repository.findById(adminInfo._id, {
                projection: {
                    towFactorEnable: 1,
                    phoneRegistered: 1,
                    _id: 1
                }
            })
            if (admin == null) {
                return {
                    status: 400,
                    message: "کاربری با اطلاعات وارد شده یافت نشد"
                }
            }

            if (admin.towFactorEnable) {

                return super.editById(admin?._id, {
                    $set: {
                        towFactorEnable: false
                    }
                }, {
                    ok: true
                })
            }
            else {
                if (admin.phoneRegistered != true) {
                    return {
                        status: 400,
                        message: "ابتدا شماره تلفن خود را تایید کنید"
                    }
                }
                return super.editById(admin?._id, {
                    $set: {
                        towFactorEnable: true
                    }
                }, {
                    ok: true
                })
            }
        } catch (error) {
            throw error
        }
    }

    async verifyPhoneNumber(
        @Body({
            destination: "phoneNumber",
            schema: BaseController.phone
        }) phoneNumber: string,
        @Admin() adminInfo: AdminInfo,
        @Session() session: any
    ): Promise<Response> {

        try {
            var admin = await this.repository.findById(adminInfo._id)
            if (admin == null) {
                return {
                    status: 400,
                    message: "کاربری با اطلاعات وارد شده یافت نشد"
                }
            }
            if (phoneNumber) {
                var isExists = await this.repository.isExists({
                    _id: {
                        $ne: admin._id
                    },
                    phoneNumber: {
                        $eq: phoneNumber
                    }
                })
                if (isExists) {
                    return {
                        status: 400,
                        message: "شماره تلفن تکراری"
                    }
                }
            }
            else {
                if (admin.phoneRegistered) {
                    return {
                        status: 400,
                        message: "این شماره تلفن قبلا تایید شده است"
                    }
                }
                phoneNumber = admin.phoneNumber
            }

            var random = RandomGenarator.randomNumber()

            var result = await SmsMessager.send({
                template: "adminAddPhone",
                receptor: phoneNumber,
                parameters: {
                    random: random,
                    name: admin.name
                }
            })
            if (result == false) {
                throw new Error("sms error")
            }
            session["adminNewPhoneNumber"] = phoneNumber
            session["phoneVerifyRandom"] = random
            return {
                status: 200,
                message: "موفق"
            }
        } catch (error) {
            throw error
        }
    }

    async confirmVerifyPhoneNumber(
        @Body({
            destination: "random",
            schema: BaseController.random
        }) random: number,
        @Admin() admin: AdminInfo,
        @Session() session: any,
    ): Promise<Response> {

        var adminRandom = session["phoneVerifyRandom"]


        if (random != adminRandom) {
            return {
                status: 400,
                message: "کد وارد شده اشتباه است"
            }
        }
        return super.editById(admin._id, {
            $set: {
                phoneNumber: session["adminNewPhoneNumber"],
                phoneRegistered: true
            }
        }, {
            ok: true
        })
    }


    async verifyEmail(
        @Body({
            destination: "email",
            schema: BaseController.email.optional()
        }) email: string,
        @Admin() admin: AdminInfo,
        @Session() session: any

    ): Promise<Response> {

        try {
            if (email) {
                var isExists = await this.repository.isExists({
                    _id: {
                        $ne: admin._id
                    },
                    email: {
                        $eq: email
                    }
                })
                if (isExists) {
                    return {
                        status: 400,
                        message: "ایمیل تکراری"
                    }
                }
            }
            else {
                if (admin.isEmailRegistered) {
                    return {
                        status: 400,
                        message: "این ایمیل قبلا تایید شده است"
                    }
                }
                email = admin.email
            }

            var random = RandomGenarator.randomNumber()

            var result = await EmailMessager.send({
                receptor: email,
                parameters: {
                    random: random,
                    name: admin.name
                },
                template: "adminAddPhone"
            })

            if (result == false) {
                throw new Error("sms error")
            }
            session['adminNewEmail'] = email
            session['emailVerifyRandom'] = random
            return {
                status: 200,
                session,
                message: "موفق"
            }
        } catch (error) {
            throw error
        }
    }

    async confirmVerifyEmail(
        @Body({
            destination: "random",
            schema: BaseController.random
        }) random: number,
        @Admin() admin: any,
        @Session() session: any

    ): Promise<Response> {
        var adminRandom = session["emailVerifyRandom"]


        if (random != adminRandom) {
            return {
                status: 400,
                message: "کد وارد شده اشتباه است"
            }
        }

        return super.editById(admin._id, {
            $set: {
                email: session["adminNewEmail"],
                isEmailRegistered: true
            }
        }, {
            ok: true
        })
    }



    async refreshTowFactor(
        @Session() session: any
    ): Promise<Response> {
        var secret = speakeasy.generateSecret({ length: 20 });

        var image = await toDataURL(secret.otpauth_url as string)

        session["ascii"] = secret.ascii
        return {
            status: 200,
            message: "عملیات موفق",
            data: {
                image,
                ascii: secret.ascii
            }
        }
    }

    async verifyTowFactor(
        @Body({
            destination: "code",
            schema: BaseController.totp
        }) code: string,
        @Admin() admin: AdminInfo,
        @Session() session: any
    ): Promise<
        Response
    > {
        var ascii = session["ascii"]
        if (ascii == undefined) {
            return {
                status: 400,
                message: "ابتدا کد دوعاملی را بسازید"
            }
        }
        let verifed = speakeasy.totp.verify({
            secret: ascii,
            encoding: "ascii",
            token: code
        })

        if (!verifed) {
            return {
                status: 400,
                message: "کد دوعاملی اشتباه است"
            }
        }
        return super.editById(admin._id, {
            $set: {
                towFactorTocken: ascii,
                towFactorLogIn: true
            }
        }, {
            ok: true
        })
    }

    async disableTowFactor(
        @Admin() admin: AdminInfo
    ): Promise<Response> {
        return this.editById(admin._id, {
            $set: {
                towFactorLogIn: false
            },
            $unset: {
                towFactorTocken: 1
            }
        }, {
            ok: true
        })
    }


    async addSecurityQuestion(
        @Body({
            destination: "question",
            schema: z.string()
        }) question: string,
        @Body({
            destination: "answer",
            schema: z.string()
        }) answer: string,
        @Admin() admin: AdminInfo
    ): Promise<Response> {
        return this.editById(admin._id, {
            $set: {
                securityQuestion: {
                    question,
                    answer
                }
            },
        }, {
            ok: true
        })
    }


    async addIP(
        @Body({
            destination: "ip",
            schema: BaseController.ip
        }) ip: string,
        @Admin() admin: AdminInfo
    ): Promise<Response> {

        return super.editById(admin._id, {
            $addToSet: {
                validIPList: ip
            }
        }, {
            ok: true
        })
    }

    async changeIP(
        @Body({
            destination: "ip",
            schema: BaseController.ip
        }) ip: string,
        @Body({
            destination: "newIp",
            schema: BaseController.ip
        }) newIp: string,
        @Admin() admin: AdminInfo
    ): Promise<Response> {

        try {
            var isExists = await this.repository.isExists({
                _id: admin._id,
                validIPList: newIp
            })
            if (isExists) {
                return {
                    status: 400,
                    message: "تکراری است"
                }
            }

        } catch (error) {
            throw error
        }

        return this.editOne({
            _id: admin._id,
            validIPList: ip
        }, {
            $set: {
                "validIPList.$": newIp
            }
        }, {
            ok: true
        })
    }

    async deleteIP(
        @Body({
            destination: "ip",
            schema: BaseController.ip
        }) ip: string,
        @Admin() admin: AdminInfo
    ): Promise<Response> {
        return super.editById(admin._id, {
            $pull: {
                validIPList: ip
            }
        }, {
            ok: true
        })
    }

    initApis(): void {
        this.addRoute("/profile", "get", this.getProfile.bind(this), {
            // preExecs: [{
            //     func: this.checkPasswordExpired.bind(this),
            // }],
        })
        this.addRoute("/password", "post", this.setPaswword.bind(this))
        this.addRoute("/password/expire", "get", this.getPasswordExpired.bind(this), {
            preExecs: [{
                func: this.checkPasswordExpired.bind(this),
            }],
        })
        this.addRoute("/password", "put", this.changePassword.bind(this), {
            preExecs: [{
                func: this.checkPasswordExpired.bind(this),
            }],
        })
        this.addRoute("/towFactor/toggle", "post", this.toggleTwoFactor.bind(this), {
            preExecs: [{
                func: this.checkPasswordExpired.bind(this),
            }],
        })
        this.addRoute("/phoneNumber/verify", "post", this.verifyPhoneNumber.bind(this), {
            preExecs: [{
                func: this.checkPasswordExpired.bind(this),
            }],
        })
        this.addRoute("/phoneNumber/confirm", "post", this.confirmVerifyPhoneNumber.bind(this), {
            preExecs: [{
                func: this.checkPasswordExpired.bind(this),
            }],
        })
        this.addRoute("/email/verify", "post", this.verifyEmail.bind(this), {
            preExecs: [{
                func: this.checkPasswordExpired.bind(this),
            }],
        })
        this.addRoute("/email/confirm", "post", this.confirmVerifyEmail.bind(this), {
            preExecs: [{
                func: this.checkPasswordExpired.bind(this),
            }],
        })
        this.addRoute("/oauth/refresh", "post", this.refreshTowFactor.bind(this), {
            preExecs: [{
                func: this.checkPasswordExpired.bind(this),
            }],
        })
        this.addRoute("/oauth/confirm", "post", this.verifyTowFactor.bind(this), {
            preExecs: [{
                func: this.checkPasswordExpired.bind(this),
            }],
        })
        this.addRoute("/oauth/disable", "post", this.disableTowFactor.bind(this), {
            preExecs: [{
                func: this.checkPasswordExpired.bind(this),
            }],
        })
        this.addRoute("/security/question", "post", this.addSecurityQuestion.bind(this), {
            preExecs: [{
                func: this.checkPasswordExpired.bind(this),
            }],
        })
        this.addRoute("/ip/add", "post", this.addIP.bind(this), {
            preExecs: [{
                func: this.checkPasswordExpired.bind(this),
            }],
        })
        this.addRoute("/ip/edit", "put", this.changeIP.bind(this), {
            preExecs: [{
                func: this.checkPasswordExpired.bind(this),
            }],
        })
        this.addRoute("/ip/delete", "post", this.deleteIP.bind(this), {
            preExecs: [{
                func: this.checkPasswordExpired.bind(this),
            }],
        })
    }


}

