import { Body, IP, Session } from "../../../decorators/parameters"
import { Response } from "../../../controller"
import BaseLogIn from "../../../logInController"
import { BaseAdmin } from "../../repositories/admin/model"
import AdminRepository from "../../repositories/admin/repository"

import BlockListRepository from "../../repositories/blocklist/repository"
import AdminAuthenticator from "./adminAuthenticator"
import SystemConfigRepository from "../../repositories/system/repository"
import SmsMessager from "../../../messaging/smsMessager"
import RandomGenarator from "../../../random"


import speakeasy from "speakeasy"
import { z } from "zod"
import { alertWrongLogIn, checkAdminBlock, checkAdminNeedCaptcha } from "./decorators"
import { Get, Log, Middleware, Post } from "../../../decorators/method"
import { Types } from "mongoose"
import BaseController from "../../controller"
import RefreshTokenRepository from "../../repositories/refreshToken/repository"




export default class LogInController<T extends BaseAdmin> extends BaseLogIn {
    adminRepository: AdminRepository<T>
    authenticator: AdminAuthenticator
    sessionExpires: number;
    sessionDuretion: number;
    refreshTokenRepo: RefreshTokenRepository
    constructor(baseRoute: string, repo: AdminRepository<T>) {
        super(baseRoute)
        this.adminRepository = repo
        this.authenticator = new AdminAuthenticator();
        this.sessionExpires = 120000
        this.sessionDuretion = 6000000
        this.refreshTokenRepo = new RefreshTokenRepository()
        this.initApis()
    }


    @Log
    @checkAdminNeedCaptcha(3)
    async logInAdmin(
        @Body({
            destination: "username",
            schema: z.string().min(8).default("hassan77")
        }) username: string,
        @Body({
            destination: "password",
            schema: BaseController.password
        }) password: string,
        @IP() ip: string,
        @Session() session: any
    ): Promise<Response> {
        try {
            var admin = await this.adminRepository.checkLogin(username, ip) as T
        } catch (error) {
            throw error
        }
        if (admin == null) {
            var condAdmin = await this.adminRepository.findOne({
                $or: [
                    {
                        userName: username
                    },
                    {
                        email: username
                    },
                    {
                        phoneNumber: username
                    }
                ]
            })


            if (condAdmin != null) {
                var blockList = await new BlockListRepository().findOne({
                    id: condAdmin._id,
                    expireDate: {
                        $gte: new Date()
                    },
                    owner: "admin"
                }, {
                    fromDb: true
                })
                if (blockList != null) {
                    return {
                        status: 403,
                        data: {
                            expireDate: blockList.expireDate
                        },
                        message: "شما بلاک شدید"
                    }
                }
                this.authenticator.alertWrongLogIn(condAdmin)
                var checkBlock = await this.authenticator.checkBlock(condAdmin)
                if (checkBlock.isBlocked) {
                    return {
                        status: 403,
                        data: {
                            expireDate: checkBlock.expireDate
                        },
                        message: "شما بلاک شدید"
                    }
                }

                var checkCaptcha = await this.authenticator.checkCaptcha(condAdmin)
                session = checkCaptcha?.session
                if (checkCaptcha?.captcha == true) {
                    return {
                        status: 401,
                        session,
                        data: {
                            captcha: true,
                            type: checkCaptcha.type
                        },
                        message: "رمز عبور یا نام کاربری اشتباه است"
                    }
                }
            }

            return {
                status: 401,
                message: "رمز عبور یا نام کاربری اشتباه است"
            }
        }

        if (await this.adminRepository.comparePassword(admin, password) == false) {
            var blockList = await new BlockListRepository().findOne({
                id: admin._id,
                expireDate: {
                    $gte: new Date()
                },
                owner: "admin"
            })
            if (blockList != null) {
                return {
                    status: 403,
                    data: {
                        expireDate: blockList.expireDate
                    },
                    message: "شما بلاک شدید"
                }
            }

            this.authenticator.alertWrongLogIn(admin)
            var checkBlock = await this.authenticator.checkBlock(admin)

            if (checkBlock.isBlocked) {
                return {
                    status: 403,
                    data: {
                        expireDate: checkBlock.expireDate
                    },
                    message: "شما بلاک شدید"
                }
            }

            var checkCaptcha = await this.authenticator.checkCaptcha(admin, session)
            session = checkCaptcha?.session
            if (checkCaptcha?.captcha == true) {
                return {
                    status: 401,
                    data: {
                        captcha: true,
                        type: checkCaptcha.type
                    },
                    session,
                    message: "رمز عبور یا نام کاربری اشتباه است"
                }
            }

            return {
                status: 401,
                message: "رمز عبور یا نام کاربری اشتباه است"
            }

        }

        var blockList = await new BlockListRepository().findOne({
            id: admin._id,
            expireDate: {
                $gte: new Date()
            },
            owner: "admin"
        })
        if (blockList != null) {
            return {
                status: 403,
                data: {
                    expireDate: blockList.expireDate
                },
                message: "شما بلاک شدید"
            }
        }

        else {
            var conf = await new SystemConfigRepository().getConf("password-days-limit")
            if (conf != null) {
                try {
                    if (await this.adminRepository.isExists({
                        _id: admin._id,
                        passwordLastChange: {
                            $lte: new Date(Date.now() - (1000 * 24 * 60 * 60 * conf.value))
                        }
                    })) {
                        session["changePassword"] = true
                        session["adminId"] = admin._id

                        return {
                            status: 200,
                            data: {
                                changePassword: true
                            },
                            message: "لطفا ابتدا رمز خود را عوض کنید",
                            session
                        }
                    }
                } catch (error) {
                    throw error
                }

            }

            if (admin.changePassword) {
                try {
                    session["changePassword"] = true
                    session["adminId"] = admin._id

                    return {
                        status: 200,
                        data: {

                            changePassword: true
                        },
                        message: "لطفا ابتدا رمز خود را عوض کنید",
                        session
                    }
                }
                catch (error) {
                    throw error
                }
            }
            //tow factor
            var isExists = await new SystemConfigRepository().isExists({
                key: "admin-2f-status",
                value: false
            })

            if (!isExists && admin.towFactorEnable) {
                var towFactor = false
                session['towFactor'] = true
                session['tocken'] = admin.towFactorTocken
                session['adminId'] = admin._id

                if (session['cookie']) {
                    // session['cookie'] = {}
                }
                session.cookie.expires = new Date(Date.now() + 600000)

                if (admin.towFactorLogIn) {
                    towFactor = true
                }
                else {

                    var random: Number = RandomGenarator.randomNumber()
                    var result = await SmsMessager.send({
                        parameters: {
                            random: random,
                            name: admin.name,
                        },
                        receptor: admin.phoneNumber,
                        template: "adminLogInWithRandom"
                    })
                    if (result == false) {
                        towFactor = true
                    }
                    else {
                        session['AdminRandom'] = random
                        if (session['cookie']) {
                            // session['cookie'] = {}
                        }
                        session.cookie.expires = new Date(Date.now() + this.sessionExpires)
                    }

                }
                return {
                    status: 200,
                    data: {
                        phoneNumber: admin.phoneNumber,
                        email: admin.email,
                        towFactor: true,
                        oauth: towFactor
                    },
                    session,
                    message: "کد دو عاملی را وارد کنید"
                }
            }
            else {
                try {
                    await this.adminRepository.logIn(admin._id)
                } catch (error) {
                    throw error
                }

                try {
                    var isExists = await new SystemConfigRepository().isExists({
                        key: "admin-2f-all",
                        value: true
                    })
                    if (isExists) {
                        session['towFactor'] = true
                        session['tocken'] = admin.towFactorTocken
                        session['adminId'] = admin._id
                        session['checkTowFactor'] = admin._id
                        if (session['cookie']) {
                            // session['cookie'] = {}
                        }
                        session.cookie.expires = new Date(Date.now() + 600000)

                        var towFactor = false
                        if (admin.towFactorLogIn) {

                            towFactor = true
                        }
                        else {
                            var random: Number = RandomGenarator.randomNumber()
                            var result = await SmsMessager.send({
                                parameters: {
                                    random: random,
                                    name: admin.name,
                                },
                                receptor: admin.phoneNumber,
                                template: "adminLogInWithRandom"
                            })
                            if (result == false) {
                                towFactor = true
                            }
                            else {

                                session['AdminRandom'] = random
                                if (session['cookie']) {
                                    // session['cookie'] = {}
                                }
                                session.cookie.expires = new Date(Date.now() + this.sessionExpires)
                            }

                        }

                        return {
                            status: 200,
                            data: {
                                phoneNumber: admin.phoneNumber,
                                email: admin.email,
                                towFactor: true,
                                oauth: towFactor
                            },
                            session,
                            message: "کد دو عاملی را وارد کنید"
                        }
                    }

                    var hash = RandomGenarator.generateHashStr(30)
                    session = await this.authenticator.authenticate(session, admin, {
                        // expire: req.sessionDuretion
                        expire: this.sessionDuretion,
                        hash
                    })


                } catch (error) {
                    throw error
                }
                return {
                    status: 200,
                    data: {
                        name: admin.name,
                        family: admin.familyName,
                        phoneNumber: admin.phoneNumber,
                        email: admin.email,
                        hash
                    },
                    session,
                    message: "عملیات موفق"
                }

            }
        }
    }

    async getLoginInfo(@Session() session: any): Promise<Response> {
        try {
            // var adminId = SessionHandler.get(req, 'adminId')
            var adminId = session['adminId']
            var admin = await this.adminRepository.findById(adminId, {
                projection: {
                    phoneNumber: 1,
                    email: 1,
                    isEmailRegistered: 1,
                    towFactorLogIn: 1,
                    securityQuestion: 1
                }
            })
            return {
                session,
                data: {
                    admin
                },
                message: "موفق"
            }

        } catch (error) {
            throw error
        }
    }

    async logOutAdmin(@Session() session: any): Promise<Response> {
        session.destroy((err: any) => {

        })
        return {
            session,
            message: "موفق"
        }
    }


    @Log
    @alertWrongLogIn(1)
    @checkAdminBlock(1)
    @checkAdminNeedCaptcha(1)
    async checkTowFactorCode(
        @Body({
            destination: "code",
            schema: z.string().length(6).regex(/^[0-9]*$/)
        }) code: string,
        @Session() session: any): Promise<Response> {
        let isVerified = speakeasy.totp.verify({
            secret: session.tocken,
            encoding: "ascii",
            token: code
        })

        if (!isVerified) {
            var admin = await this.adminRepository.findById(session.adminId)
            var checkBlock = await this.authenticator.checkBlock(admin)
            if (checkBlock.isBlocked) {
                return {
                    status: 403,
                    message: "شما بلاک شدید",
                    data: {

                    }
                }
            }
            var checkCaptcha = await this.authenticator.checkCaptcha(session, admin)
            session = checkCaptcha?.session
            if (checkCaptcha?.captcha == true) {
                return {
                    status: 401,
                    data: {
                        captcha: true,
                        type: checkCaptcha.type
                    },
                    message: "رمز عبور یا نام کاربری اشتباه است",
                    session
                }
            }
            return {
                status: 401,
                data: {

                },
                message: "کد دو عاملی اشتباه است",
                session
            }
        }


        try {
            var admin = await this.adminRepository.getAdminAndLogIn(session["adminId"])
        } catch (error) {
            throw error
        }

        if (admin == null) {
            return {
                status: 404,
                data: {

                },
                message: "کاربر یافت نشد",
                session
            }
        }

        try {
            var hash = RandomGenarator.generateHashStr(30)
            session = await this.authenticator.authenticate(session, admin, {
                expire: this.sessionDuretion,
                hash: hash
            })

        } catch (error) {
            throw error
        }

        return {
            status: 200,
            data: {
                name: admin.name,
                family: admin.familyName,
                hash
            },
            session
        }

    }


    @Log
    @checkAdminBlock(1)
    @checkAdminNeedCaptcha(1)
    async logInWithOtherWay(
        @Body({
            destination: "way",
            schema: z.enum(["phone", "email"])
        })
        way: "phone" | "email",
        @Session() session: any
    ): Promise<Response> {
        var adminId = session.adminId

        try {
            var admin = await this.adminRepository.findById(adminId, {
                fromDb: true,
                projection: {
                    phoneNumber: 1,
                    email: 1,
                    name: 1
                }
            })
        } catch (error) {
            throw error
        }

        if (admin == null) {
            return {
                status: 404,
                message: "اطلاعات کاربری یافت نشد"
            }
        }

        var random: Number = RandomGenarator.randomNumber()
        var result: boolean = true;

        if (way == "phone") {
            //send to phone
            var isExists = true
            await new SystemConfigRepository().isExists({
                key: "admin-2f-sms",
                value: false
            })
            if (!isExists) {
                return {
                    status: 400,
                    message: "ورود با این روش در حال حاضر غیرفعال است",
                    data: {}
                }
            }
            try {
                result = await SmsMessager.send({
                    parameters: {
                        random: random,
                        name: admin.name,
                    },
                    receptor: admin.phoneNumber,
                    template: "adminLogInWithRandom"
                })

            } catch (error) {
                throw error
            }
        }

        else if (way == 'email') {
            if (await new SystemConfigRepository().isExists({
                key: "admin-2f-email",
                value: false
            })) {
                return {
                    status: 400,
                    message: "ورود با این روش در حال حاضر غیرفعال است",
                    data: {}
                }
            }
            result = true
            //send to email
        }

        if (result) {
            session['AdminRandom'] = random
            if (!session['cookie']) {
                // session['cookie'] = {}
            }
            session.cookie.expires = new Date(Date.now() + this.sessionExpires)
            return {
                status: 200,
                data: {},
                message: "کد برای شما ارسال شد",
                session
            }
        }
        return {
            status: 500,
            message: "مشکلی در ارسال کد پیش آمده است"
        }


    }

    @Log
    @alertWrongLogIn(1)
    @checkAdminBlock(1)
    @checkAdminNeedCaptcha(1)
    async verifyCode(
        @Body({
            destination: "random",
            schema: BaseController.random
        }) candRandom: number,
        @Session() session: any
    ): Promise<Response> {

        var random = session['AdminRandom']

        if (random == undefined) {
            return {
                status: 403,
                data: {},
                message: "سشن شما از بین رفته است"
            }
        }

        if (random != candRandom) {
            var admin = await this.adminRepository.findById(session["adminId"])
            var checkBlock = await this.authenticator.checkBlock(admin)

            if (checkBlock.isBlocked) {
                return {
                    status: 403,
                    data: {},
                    message: "شما بلاک شدید"
                }
            }

            var checkCaptcha = await this.authenticator.checkCaptcha(session, admin)
            session = checkCaptcha?.session
            if (checkCaptcha?.captcha == true) {
                return {
                    status: 401,
                    data: {
                        captcha: true,
                        type: checkCaptcha.type
                    },
                    session,
                    message: "کد وارد شده نامعتبر است"
                };
            }
            return {
                status: 401,
                data: {},
                session,
                message: "کد وارد شده نامعتبر است"
            };
        }

        try {
            var admin = await this.adminRepository.getAdminAndLogIn(session["adminId"])
        } catch (error) {
            throw error
        }

        if (admin == null) {
            return {
                status: 404,
                session,
                data: {},
                message: "کاربر یافت نشد"
            }
        }

        try {
            var hash = RandomGenarator.generateHashStr(30)
            await this.authenticator.authenticate(session, admin, {
                expire: this.sessionDuretion,
                hash
            })
            if (admin.towFactorTocken == undefined && await new SystemConfigRepository().isExists({
                key: "admin-2f-all",
                value: true
            })) {
                session['checkTowFactor'] = true
            }
        } catch (error) {
            throw error
        }
        return {
            status: 200,
            data: {
                name: admin.name,
                family: admin.familyName,
                hash: hash
            },
            session,
            message: "عملیات موفق"
        }

    }

    @Log
    @checkAdminBlock(1)
    @checkAdminNeedCaptcha(2)
    async forgetPassword(
        @Body({
            destination: "way",
            schema: z.enum(["phone", "email"])
        }) way: "phone" | "email",
        @Body({
            destination: "input",
            schema: z.string().regex(/^([0][9][01239][0-9]{8,8})|([\w-\.]+@([\w-]+\.)+[\w-]{2,4})$/).default("09901415681").describe("email or phone")
        }) input: string,
        @Session() session: any,
        @IP() ip: string,
    ): Promise<Response> {
        var query: any = {}
        if (way == 'phone') {
            query.phoneNumber = input
        }
        else if (way == 'email') {
            query.email = input
        }

        try {
            var admin = await this.adminRepository.checkLogin(input, ip)
        } catch (error) {
            throw error
        }

        if (admin == null) {
            return {
                status: 404,
                data: {},
                message: "کاربری با اطلاعات وارد وجود ندارد"
            }
        }

        var random = RandomGenarator.randomNumber()
        var result: boolean = true

        if (way == "phone") {
            //send to phone
            try {
                result = await SmsMessager.send({
                    parameters: {
                        random: random,
                        name: admin.name
                    },
                    receptor: admin.phoneNumber,
                    template: "adminLogInWithRandom"
                })
            } catch (error) {
                throw error
            }
        }

        else if (way == 'email') {
            result = true
            //send to email
        }

        if (result) {
            session["AdminForgetRandom"] = random
            session["adminId"] = admin._id
            // session["AdminForgetRandom"] = way
            if (!session["cookie"]) {
                session["cookie"] = {}
            }
            session.cookie.expires = new Date(Date.now() + this.sessionExpires)
            return {
                status: 200,
                message: "کد برای شما ارسال شد",
                session
            }
        }
        return {
            status: 500,
            message: "مشکلی در ارسال کد پیش آمده است"
        }

    }

    @Log
    @checkAdminBlock(1)
    @checkAdminNeedCaptcha(1)
    async forgetWithSecurityQuestion(
        @Body({
            destination: "answer",
            schema: z.string()
        }) answer: string,
        @Session() session: any
    ): Promise<Response> {
        try {
            var adminId = session["adminId"]
            var isExists = await this.adminRepository.isExists({
                _id: adminId,
                "securityQuestion.answer": answer
            })
            if (isExists) {
                session["changePassword"] = true
                if (!session["cookie"]) {
                    session["cookie"] = {}
                }
                session.cookie.expires = new Date(Date.now() + this.sessionExpires)

                return {
                    status: 200,
                    data: {
                        forget: true
                    },
                    message: "رمز جدید را وارد کنید",
                    session
                }
            }
            return {
                status: 400,
                message: "جواب نادرست",
                data: {}
            }
        } catch (error) {
            throw error
        }
    }


    @Log
    @checkAdminBlock(1)
    @checkAdminNeedCaptcha(1)
    async forgetWithTowFactor(
        @Body({
            destination: "code",
            schema: z.string().length(6).regex(/^[0-9]*$/)
        }) code: string,
        @Session() session: any
    ): Promise<Response> {
        try {
            var admin = await this.adminRepository.findById(session["adminId"])
        } catch (error) {
            throw error
        }

        if (admin == null) {
            return {
                status: 404,
                message: "کاربری با اطلاعات وارد وجود ندارد"
            }
        }

        if (admin.towFactorLogIn && admin.towFactorTocken) {
            var isVerified = speakeasy.totp.verify({
                secret: admin.towFactorTocken,
                encoding: "ascii",
                token: code
            })
            if (isVerified) {
                session["changePassword"] = true
                if (!session["cookie"]) {
                    session["cookie"] = {}
                }
                session.cookie.expires = new Date(Date.now() + this.sessionExpires)
                return {
                    status: 200,
                    data: {
                        forget: true
                    },
                    session
                }
            }
        }

        var admin = await this.adminRepository.findById(session["adminId"])

        var checkBlock = await this.authenticator.checkBlock(admin)

        if (checkBlock.isBlocked) {
            return {
                status: 403,
                message: "شما بلاک شدید",
                session
            }
        }

        var checkCaptcha = await this.authenticator.checkCaptcha(session, admin)
        session = checkCaptcha?.session
        if (checkCaptcha?.captcha == true) {
            return {
                status: 401,
                data: {
                    captcha: true,
                    type: checkCaptcha.type
                },
                message: "رمز عبور یا نام کاربری اشتباه است",
                session
            }
        }
        return {
            status: 401,
            message: "کد وارد شده اشتباه است",
            session
        }

    }


    @Log
    @alertWrongLogIn(1)
    @checkAdminBlock(1)
    @checkAdminNeedCaptcha(1)
    async verifyForgetPassword(
        @Body({
            destination: "random",
            schema: BaseController.random
        }) candRandom: number,
        @Session() session: any
    ): Promise<Response | undefined> {
        var random = session["AdminForgetRandom"]

        if (random == undefined) {
            return {
                status: 403,
                message: "سشن شما از بین رفته است",
            }
        }

        if (random == candRandom) {
            session["changePassword"] = true
            if (!session["cookie"]) {
                session["cookie"] = {}
            }
            session.cookie.expires = new Date(Date.now() + this.sessionExpires)
            return {
                status: 200,
                message: "رمز جدید را وارد کنید",
                session,
                data: {
                    forget: true
                }
            }
        }
        var admin = await this.adminRepository.findById(session["adminId"])

        var checkBlock = await this.authenticator.checkBlock(admin)

        if (checkBlock.isBlocked) {
            return {
                status: 403,
                data: {},
                message: "شما بلاک شدید",
                session
            }
        }

        var checkCaptcha = await this.authenticator.checkCaptcha(session, admin)
        session = checkCaptcha?.session
        if (checkCaptcha?.captcha == true) {
            return {
                status: 401,
                data: {
                    captcha: true,
                    type: checkCaptcha.type
                },
                session,
                message: "کد وارد شده اشتباه است"
            }
        }
        return {
            status: 401,
            data: {},
            session,
            message: "کد وارد شده اشتباه است"
        }
    }


    @Log
    @checkAdminBlock(1)
    @checkAdminNeedCaptcha(1)
    async changePassword(
        @Body({
            destination: "password",
            schema: BaseController.password
        }) password: string,
        @Session() session: any
    ): Promise<Response> {
        if (session["changePassword"] == undefined) {
            return {
                status: 403,
                message: "سشن شما از بین رفته است"
            }
        }
        try {
            var admin = await this.adminRepository.changePassword(session["adminId"], password)
        } catch (error) {
            throw error
        }
        if (admin == null) {
            return {
                status: 404,
                data: {},
                message: "کاربری با اطلاعات وارد شده یافت نشد"
            }
        }
        session.destroy((err: any) => {

        })
        return {
            status: 200,
            data: {},
            message: "رمز شما با موفقیت تغییر یافت",

        }
    }


    async relogin(
        @Body({
            destination: "password",
            schema: BaseController.password
        }) password: string,
        @Body({
            destination: "refreshToken",
            schema: z.string()
        }) refreshToken: string,
        @Session() session: any
    ): Promise<Response> {
        try {
            var tokenData = await this.refreshTokenRepo.findOne({
                refresh: refreshToken,
                expire: {
                    $gte: new Date()
                },
                tries: {
                    $lte: 2
                }
            })

            if (tokenData == null) {
                return {
                    status: 400,
                    data: {}
                }
            }
            const admin = await this.adminRepository.findById(tokenData.admin)
            if (admin == null) {
                return {
                    status: 400,
                    data: {}
                }
            }
            if (await this.adminRepository.comparePassword(admin, password) == false) {
                await this.refreshTokenRepo.updateOne({
                    _id: tokenData._id
                }, {
                    $set: {
                        tries: tokenData.tries + 1
                    }
                })

                return {
                    status: 400,
                    data: {}
                }
            }


            var hash = RandomGenarator.generateHashStr(30)

            session = await this.authenticator.authenticate(session, admin, {
                expire: this.sessionDuretion,
                hash
            })


            return {
                status: 200,
                data: {
                    name: admin.name,
                    family: admin.familyName,
                    phoneNumber: admin.phoneNumber,
                    email: admin.email,
                    hash
                },
                session
            }


        } catch (error) {
            throw error
        }
    }


    @Post("/login/refresh")
    async refreshLogin(
        @Body({
            destination: "hash",
            schema: z.string()
        }) refreshToken: string,
        @Session() session: any
    ): Promise<Response> {
        try {
            var tokenData = await this.refreshTokenRepo.findOne({
                refresh: refreshToken,
                expire: {
                    $gte: new Date()
                }
                // tries : {
                //     $lte : 2
                // }
            })

            if (tokenData == null) {
                return {
                    status: 400,
                    data: {}
                }
            }
            const admin = await this.adminRepository.findById(tokenData.admin)
            if (admin == null) {
                return {
                    status: 400,
                    data: {}
                }
            }


            var hash = RandomGenarator.generateHashStr(30)

            session = await this.authenticator.authenticate(session, admin, {
                expire: this.sessionDuretion,
                hash
            })


            return {
                status: 200,
                data: {
                    name: admin.name,
                    family: admin.familyName,
                    phoneNumber: admin.phoneNumber,
                    email: admin.email,
                    hash
                },
                session
            }


        } catch (error) {
            throw error
        }
    }

    @Get("/timeout")
    async getLoginTimeout() {
        return {
            status: 200,
            data: {
                timeout: this.sessionDuretion,
                interval: 10000
            }
        }
    }

    initApis() {
        this.addRoute("/logIn", "post", this.logInAdmin.bind(this))
        this.addRoute("/logIn/info", "get", this.getLoginInfo.bind(this))
        this.addRoute("/logOut", "post", this.logOutAdmin.bind(this))
        this.addRoute("/logIn/towFactor", "post", this.checkTowFactorCode.bind(this))
        this.addRoute("/logIn/otherWay", "post", this.logInWithOtherWay.bind(this))
        this.addRoute("/logIn/verifyCode", "post", this.verifyCode.bind(this))
        this.addRoute("/logIn/forgetPassword", "post", this.forgetPassword.bind(this))
        this.addRoute("/logIn/forgetPassword/otherWay", "post", this.forgetPassword.bind(this))
        this.addRoute("/logIn/forgetPassword/securityQuestion", "post", this.forgetWithSecurityQuestion.bind(this))
        this.addRoute("/logIn/forgetPassword/towFactor", "post", this.forgetWithTowFactor.bind(this))
        this.addRoute("/logIn/forgetPassword/verify", "post", this.verifyForgetPassword.bind(this))
        this.addRoute("/logIn/password", "put", this.changePassword.bind(this))
        this.addRoute("/relogin", "post", this.relogin.bind(this))
    }


}


export interface AdminInfo {
    isSuperAdmin: boolean,
    _id: string,
    name: string,
    familyName: string,
    role?: string,
    phoneNumber: string,
    phoneRegistered: boolean,
    userName: string,
    email: string,
    isEmailRegistered?: boolean,
    department: string,
    maxSize ?: number,
    towFactorTocken ?: string
}