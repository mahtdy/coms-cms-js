import { Body, Query, Session, User } from "../../decorators/parameters";
import { Response } from "../../controller";
import BaseController, { ControllerOptions } from "../controller";
import BaseUser from "../repositories/user/model";
import UserRepository from "../repositories/user/repository";
import { UserInfo } from "../auth/user/userAuthenticator";
import { Get, Post,Put } from "../../decorators/method";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { z } from "zod"
import RandomGenarator from "../../random";
import SmsMessager from "../../messaging/smsMessager";
import EmailMessager from "../../messaging/emailMessager";
import ConfigService from "../../services/config";
import CacheService from "../../cache";


export default class AccountController extends BaseController<BaseUser>{
    cacheService: CacheService
    constructor(baseRoute: string, repo: UserRepository<BaseUser>, options?: ControllerOptions) {
        super(baseRoute, repo, options)
        this.cacheService = new CacheService("socket_data")
    }


    @Get("/info", {
        apiDoc: {
            security: [{
                BasicAuth: []
            }]
        }
    })
    async getInfo(
        @User() user: UserInfo
    ): Promise<Response> {
        return this.findById(user.id || "", {
            projection: {
                name: 1,
                family: 1,
                email: 1,
                phoneNumber: 1,
                towFactorLogIn: 1,
                address: 1,
                image: 1,
                isEmailRegistered: 1,
            }
        })
    }


    @Post("/towFactor/refresh")
    async refreshTowFactor(
        @User() userInfo: UserInfo
    ): Promise<Response> {
        try {
            var user = await this.repository.findById(userInfo.id)
        } catch (error) {
            throw error
        }
        if (user == null) {
            return {
                status: 404,
                message: "موردی یافت نشد"
            }
        }
        var secret = speakeasy.generateSecret({ length: 20 });

        try {

            var result = await this.repository.findByIdAndUpdate(userInfo.id, {
                $set: {
                    towFactorTocken: secret.ascii
                }
            })
        } catch (error) {
            throw error
        }

        return new Promise((resolve, reject) => {
            qrcode.toDataURL(secret.otpauth_url as string, function (err, image_data) {
                if (err) {
                    return reject(err)
                }
                return {
                    status: 200,
                    data: image_data
                }
            })
        })


    }

    // verify tow factor change
    @Post("/towFactor/verify")
    async verifyTowFactor(
        @Body({
            destination: "code",
            schema: BaseController.totp
        }) code: string,
        @User() userInfo: UserInfo,
        @Session() session: any
    ): Promise<Response> {
        var ascii = session['account']
        try {
            var user = await this.repository.findById(userInfo.id || "")
        } catch (error) {
            throw error
        }
        //user exists
        if (user == null) {
            return {
                status: 404
                // data
            }
        }
        // check ascii of 2fA is in session 
        if (ascii == undefined) {
            return {
                status: 400,
                message: "ابتدا کد دوعاملی را بسازید"
            }
        }

        // is tow factor login enabled
        if (!user.towFactorLogIn) {
            return {
                status: 400,
                message: "ورود دو مرحله ای برای شما غیرفعال است"
            }
        }

        //check code is right
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
        return this.editById(user._id, {
            $set: {
                towFactorTocken: ascii
            }
        }, {
            ok: true
        })
    }


    @Post("/towFactor/enable")
    async enableTowFactor(
        @User() userInfo: UserInfo
    ): Promise<Response> {
        try {
            var user = await this.repository.findById(userInfo.id)
        } catch (error) {
            // next(error)
            throw error
        }

        //user exists
        if (user == null) {
            return {
                status: 404
            }
        }

        // is tow factor login already enabled
        if (user.towFactorLogIn == true) {
            return {
                status: 400,
                message: "ورود دو مرحله ای برای شما فعال است"
            }
        }

        return this.editById(user._id, {
            $set: {
                towFactorLogIn: true
            }
        }, {
            ok: true
        })
    }


    @Post("/towFactor/disable")
    async disableTowFactor(
        @User() userInfo: UserInfo,
        @Session() session: any,
        @Body({
            destination: "code",
            schema: BaseController.totp.optional()
        }) code?: string,
        @Body({
            destination: "code",
            schema: z.enum([""])
        }) way?: "phone" | "email",
    ): Promise<Response> {
        try {
            var user = await this.repository.findById(userInfo.id || "")
        } catch (error) {
            throw error
        }
        //user exists
        if (user == null) {
            return {
                status: 404
            }
        }

        // is tow factor login already disabled
        if (user.towFactorLogIn != true) {
            return {
                status: 400,
                message: "ورود دو مرحله ای برای شما غیرفعال است"
            }
        }

        // have tow factor tocken
        if (user.towFactorTocken) {
            //verify disable with 2f code
            if (code) {
                let verifed = speakeasy.totp.verify({
                    secret: user.towFactorTocken,
                    encoding: "ascii",
                    token: code
                })
                if (verifed) {
                    return await this.editById(user._id, {
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
                else {
                    return {
                        status: 400,
                        message: "عملیات غیر مجاز"
                    }
                }
            }

            //verify disable with sending sms or email
            else if (way) {
                let random = RandomGenarator.randomNumber()

                try {
                    var result: boolean = false
                    if (way == "phone") {
                        result = await SmsMessager.send({
                            template: "disableTowFactorCodeUser",
                            receptor: user.phoneNumber,
                            parameters: {
                                name: user.name,
                                random: random
                            }
                        })

                    }
                    if (way == "email") {
                        result = await EmailMessager.send({
                            template: "disableTowFactorCodeUser",
                            receptor: user.email,
                            parameters: {
                                random: random
                            }
                        })



                    }
                    if (result) {
                        session["disableTowFactorRandom"] = random
                        session["disableTowFactorExpire"] = new Date(Date.now() + 120000)
                        return {
                            status: 200,
                            message: "کد ارسال شد",
                            session
                        }
                    }
                    return {
                        status: 500,
                        message: "مشکلی رخ داده است لطفا بعدا دوباره امتحان کنید"
                    }
                } catch (error) {
                    throw error
                }


            }

            else {
                return {
                    status: 400,
                    message: "عملیات غیر مجاز"
                }
            }
        }
        else {
            return this.editById(user._id, {
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
    }

    @Post("/towFactor/disable/verify")
    async verifyDisableTowFactor(
        @Body({ destination: "code", schema: BaseController.random }) code: number,
        @Session() session: any,
        @User() userInfo: UserInfo
    ): Promise<Response> {
        try {
            var user = await this.repository.findById(userInfo.id || "")
        } catch (error) {
            throw error
        }
        //user exists
        if (user == null) {
            return {
                status: 404
            }
        }

        // check random sent from sms or email
        var random = session["disableTowFactorRandom"]
        if (random == code) {
            return await this.editById(user._id, {
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
        else {
            return {
                status: 400,
                message: "عملیات غیر مجاز"
            }
        }
    }

    @Put("/password")
    async changePassword(
        @Body({
            destination: "password",
            schema: z.string().min(8)
        }) password: string,
        @User() userInfo: UserInfo
    ): Promise<Response> {
        try {
            var user = await this.repository.findById(userInfo.id || "")
            //user exists
            if (user == null) {
                return {
                    status: 404
                }
            }
            //change password (and hash)
            await this.repository.changePassword(user._id, password)
        } catch (error) {
            throw error
        }
        return {
            status: 200,
            message: "رمز شما با موفقیت تغییر یافت"
        }
    }

    @Put("/email")
    async editEmail(
        @Body({
            destination: "email",
            schema: BaseController.email
        }) email: string,
        @User() userInfo: UserInfo
    ): Promise<Response> {
        try {
            var user = await this.repository.findById(userInfo.id || "")
            //user exists
            if (user == null) {
                return {
                    status: 404
                }
            }

            //check is email exists in another accounts
            if (await this.repository.isExists({
                _id: {
                    $ne: user._id
                },
                email
            })) {
                return {
                    status: 400,
                    message: "ایمیل وارد شده تکراری است"
                }
            }
            var query: any = {}

            var hash = RandomGenarator.generateHashStr(20)
            var template = ""
            var parameters: any = {}
            var receptor = ""

            // if user not have registered email 
            if (!user.email || !user.isEmailRegistered) {
                receptor = email

                parameters["name"] = user.name
                parameters["url"] = `${ConfigService.getConfig("siteAddress")}/#/UserEmailConfirm?hash=${hash}&id=${user._id}`

                template = "submitEmailUser"

                query["email"] = email
                query["isEmailRegistered"] = false
            }

            else {
                receptor = user.email

                parameters["name"] = user.name
                parameters["email"] = email
                parameters["url"] = `${ConfigService.getConfig("siteAddress")}/#/UserEmailConfirm?hash=${hash}&id=${user._id}`

                template = "confirmEmailChangeUser"

                query["newEmail"] = email
            }

            query["emailHash"] = hash


            try {
                var result = await EmailMessager.send({
                    template,
                    parameters,
                    receptor
                })
                if (result == false) {
                    return {
                        status: 500,
                        message: "مشکلی در سرور رخ داده"
                    }
                }
                return this.editById(user._id, query, {
                    ok: true
                })

            } catch (error) {
                throw error
            }
        } catch (error) {
            throw error
        }
    }

    @Post("/email/confirm")
    async submitEmail(
        @Body({
            destination : "id",
            schema : BaseController.id
        }) id : string,
        @Body({
            destination : "hash",
            schema :z.string()
        }) hash : string
    ): Promise<Response> {
        try {
            var user = await this.repository.findById(id)
        } catch (error) {
            throw error
        }
        //user exists
        if (user == null) {
            return {
                status : 404
            }
        }

        //check hash is correct
        if (!user.email || user.emailHash != hash) {
            return {
                status : 404
            }
        }
        var query: any = {}

        // check email is registered
        if (user.isEmailRegistered) {
            var hash = RandomGenarator.generateHashStr(20)
            var template = ""
            var parameters: any = {}
            var receptor = ""

            if (!user.newEmail) {
                return {
                    status : 400 ,
                    message : "اطلاعات نامعتبر است",
                }
            }

            receptor = user.newEmail
            var hash = RandomGenarator.generateHashStr(20)

            parameters["name"] = user.name
            parameters["url"] = `${ConfigService.getConfig("siteAddress")}/#/UserEmailConfirm?hash=${hash}&id=${user._id}`

            template = "submitEmailUser"

            query["email"] = user.newEmail
            query["isEmailRegistered"] = false
            query["emailHash"] = hash




            var result = await EmailMessager.send({
                template,
                parameters,
                receptor
            })

            if (result == false) {
                return {
                    status : 500,
                    message : "مشکلی در سرور رخ داده است"
                }
            }

            return this.editById(user._id || "", {
                $set: query,
                $unset: {
                    newEmail: 1
                }
            }, {
                ok: true
            })

        }

        else {
            return this.editById(user._id || "", {
                $set: {
                    isEmailRegistered: true
                }
            }, {
                ok: true
            })
        }

    }


    @Put("/phoneNumber")
    async editPhoneNumber(
        @Body({
            destination : "phoneNumber",
            schema : BaseController.phone
        }) phoneNumber : string,
        @Session() session : any,
        @User() userInfo : UserInfo
    ): Promise<Response> {

        try {
            var user = await this.repository.findById(userInfo.id || "")
            // user exists
            if (user == null) {
                return{
                    status : 404 ,
                    message : "موردی یافت نشد"
                }
            }

            //check is phoneNumber exists in another accounts
            if (await this.repository.isExists({
                _id: {
                    $ne: user._id
                },
                phoneNumber
            })) {
                return {
                    status : 400, 
                    message : "شماره تلفن تکراری است"
                }
            }

            var random = RandomGenarator.randomNumber()


            var result = await SmsMessager.send({
                parameters: {
                    name: user.name,
                    random,
                    phoneNumber
                },
                receptor: user.phoneNumber,
                template: "changePhoneChekUser"
            })

            if (result) {
                session['userNewPhoneNumber'] = phoneNumber,
                session['userNewRandom'] = random,
                session['userExpiresRandom'] = new Date(Date.now() + 120000)

                return {
                    status : 200,
                    session,
                    message : "عملیات موفق"
                }
            }
            return {
                status : 500,
                message : "مشکلی در سرور رخ داده"
            }

        } catch (error) {
            throw error
        }
    }

    @Post("/phoneNumber/confirm")
    async confirmPhoneNumber(
        @Body({
            destination : "random",
            schema : BaseController.random
        }) random : number,
        @Session() session : any,
        @User() userInfo : UserInfo
    ): Promise<Response> {
        var userRandom = session["userNewRandom"]

        var user = await this.repository.findById(userInfo.id || "")
        //user exists
        if (user == null) {
            return {
                status : 404,
                message : "موردی یافت نشد"
            }
        }
        //check user expiration
        if (!userRandom || new Date() > session["userExpiresRandom"]) {
            return {
                status : 400,
                message : "سشن شما از بین رفته لطفا دوباره امتحان کنید"
            }
        }

        // check random 
        if (random != userRandom) {
            return {
                status : 400 ,
                message : "کد وارد شده اشتباه است"
            }
        }

        return this.editById(user._id, {
            $set: {
                phoneNumber: session["userNewPhoneNumber"]
            }
        }, {
            ok: true
        })
    }

    @Get("/email")
    async checkEmail(
        @Query({
            destination : "email",
            schema : BaseController.email
        }) email : string,
        @User() userInfo : UserInfo
    ): Promise<Response> {
        return this.checkExists({
            "_id": {
                $ne: userInfo.id
            },
            email
        })
    }


    @Post("/chat/token")
    async getChatToken(
        @User() userInfo : UserInfo
    ): Promise<Response> {
        try {
            var user = await this.repository.findById(userInfo.id)
            if (user != null) {
                var token = await RandomGenarator.generateToken()
                await this.cacheService.setWithTtl(token, {
                    name: user.name,
                    family: user.family,
                    phoneNumber: user.phoneNumber
                }, 2 * 60)
                return {
                    status : 200,
                    data : token
                }
            }
            else {
                return {
                    status : 400,
                    message: "دیتای نامعتبر"
                }
            }
        } catch (error) {
            throw error
        }


    }
    initApis(): void {
        
    }
}

// Swageer.getInstance().addComponent()