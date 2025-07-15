import { FilterQuery, Types, UpdateQuery } from "mongoose";
import { Route } from "../application";
import { Response } from "../controller";
import BaseController from "../mongoose-controller/controller";
import SmsTemplate from "../mongoose-controller/repositories/smsTemplate/model";
import SmsTemplateRepository from "../mongoose-controller/repositories/smsTemplate/repository";
import { QueryInfo } from "../mongoose-controller/repository";
import { Plugin } from "../plugin";
import { Delete, Get, Middleware, Post, Put } from "../decorators/method";
import { Body, Files, FromReq, Header, IP, Query } from "../decorators/parameters";
import { z } from "zod"
import SmsMessager from "../messaging/smsMessager";
import APIKeyRepository from "../mongoose-controller/repositories/apiKey/repository";
import schaduler from "../services/queue"
import SmsMessageLogRepository from "../mongoose-controller/repositories/smsMessageLog/repository";
import HasPermission from "../permission/apikey";
import Permission from "../permission";
import EmailTemplate from "../mongoose-controller/repositories/emailTemplate/model";
import EmailTemplateRepository from "../mongoose-controller/repositories/emailTemplate/repository";
import EmailMessager from "../messaging/emailMessager";
import NotificationTemplate from "../mongoose-controller/repositories/notificationTemplate/model";
import NotificationTemplateRepository from "../mongoose-controller/repositories/notificationTemplate/repository";
import NotificationMessager from "../messaging/notification";
import InternalMessageTemplate from "../mongoose-controller/repositories/internalMessageTemplate/model";
import InternalMessageRepository from "../mongoose-controller/repositories/internalMessage/repository";
import InternalMessageTemplateRepository from "../mongoose-controller/repositories/internalMessageTemplate/repository";
import InternalMessager from "../messaging/internalMessager";


interface SMSEditOptions {
    text?: string
    defaultSmsConfig?: string,
    disableDefaultConfig?: boolean,
    sendOTP?: boolean
}

interface EmailEditOptions {
    text?: string,
    defaultEmailConfig: string,
    disableDefaultConfig?: boolean,
    isHTML?: boolean
}

interface NotifEditOptions {
    text?: string,
    defaultNotificationConfig: string,
    disableDefaultConfig?: boolean
}



export class SMSMessagingExternal extends BaseController<SmsTemplate>  {
    apiKeyRepo: APIKeyRepository
    smsMessageLogRepo: SmsMessageLogRepository
    serve(...args: any[]): Route[] {
        // console.log(super.serve())
        return super.serve()
    }
    constructor() {
        var repo = new SmsTemplateRepository()
        super("/external/sms", repo)
        this.apiKeyRepo = new APIKeyRepository()
        this.smsMessageLogRepo = new SmsMessageLogRepository()
    }

    // template
    @Post("")
    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "sms", "create-template", 2)
    ])
    async create(
        @Body({
            schema: z.object({
                title: z.string(),
                inputs: z.array(z.string()),
                text: z.string(),
                sendOTP: z.boolean().optional(),
                module: z.string()
            })
        })
        data: SmsTemplate, @Header("apikey") apikey: string, @IP() ip: string): Promise<Response> {
        try {
            data.apiCreator = (await this.apiKeyRepo.findOne({
                token: apikey
            }))?.token
        } catch (error) {
            throw error
        }
        return super.create(data)
    }


    @Delete("")
    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "sms", "delete-template", 2)
    ])
    async delete(id: string, @Header("apikey") apikey: string, @IP() ip: string): Promise<Response> {
        return super.delete(id)
    }

    @Put("")
    @Permission.CheckPermit([
        Permission.APIKeyResover(2, "sms", "update-template", 3)
    ])
    async editTemplate(
        @Body({
            schema: z.object({
                text: z.string().optional(),
                defaultSmsConfig: BaseController.id.optional(),
                disableDefaultConfig: z.boolean().optional(),
                sendOTP: z.boolean().optional()
            })
        }) data: SMSEditOptions,
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ): Promise<Response> {
        try {
            var template = await this.repository.findById(id, {
                fromDb: true
            })
        } catch (error) {
            throw error
        }


        if (template == null) {
            return {
                status: 404,
                message: "موردی یافت نشد"
            }
        }
        // var updateData: UpdateQuery<SmsTemplate> = {}
        var updateData: any = {
            $set: {}
        }
        if (data.text) {
            updateData["$set"]["text"] = data.text as string
        }



        updateData["$set"]["sendOTP"] = data.sendOTP

        if (data.disableDefaultConfig == true) {
            updateData["$unset"] = {
                defaultSmsConfig: 1
            }
        }
        else if (data.defaultSmsConfig) {
            updateData["$set"]["defaultSmsConfig"] = data.defaultSmsConfig
        }
        return this.editById(id, updateData)

    }

    @Get("es")
    @Permission.CheckPermit([
        Permission.APIKeyResover(2, "sms", "get-templates", 3),
    ])
    async doPaginate(
        @Query({
            destination: "page",
            schema: BaseController.page
        })
        page: number,
        @Query({
            destination: "limit",
            schema: BaseController.limit
        }) limit: number,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ): Promise<Response> {
        try {
            var api = await this.apiKeyRepo.findOne({
                token: {
                    $eq: apikey
                }
            })
            if (api == null)
                return {
                    status: 404,
                    message: "موردی یافت نشد"
                }
            return this.paginate(page, limit, {
                apiCreator: api._id
            })
        } catch (error) {
            throw error
        }
    }

    // @Permission.CheckPermit([
    //     Permission.APIKeyResover(0, "sms", "get-templates")
    // ])
    // @Get("/status")
    // async checkTemplateStatus(
    //     @Header("apikey") apikey: string,
    //     @Query({
    //         destination: "id",
    //         schema: BaseController.id
    //     }) id: string): Promise<Response> {
    //     try {
    //         var status = await SmsMessager.getTemplateStatus(id)
    //     } catch (error) {
    //         throw error
    //     }
    //     if (status == 500) {
    //         return {
    //             status: 500,
    //             message: "خطای داخلی"
    //         }
    //     }
    //     return {
    //         status: 200,
    //         data: { status }
    //     }
    // }

    @Get("/validate")
    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "sms", "get-templates", 2),
    ])
    async validateTitle(
        @Query({
            destination: "title",
            schema: z.string()
        }) title: string,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ) {
        return super.checkExists({
            title
        })
    }

    async checkOwnership
        (@Query({
            destination: "id",
            schema: BaseController.id
        }) id: string,
            @Header("apikey") apikey: string
        ): Promise<Response> {
        try {
            var api = await this.apiKeyRepo.findOne({
                token: apikey
            })
            if (api == null) {
                return {
                    status: 404,
                    message: "موردی یافت نشد"
                }
            }
            if (! await this.repository.isExists({
                apiCreator: {
                    $eq: api?._id
                },
                _id: id

            })) {
                return {
                    status: 404,
                    message: "موردی یافت نشد"
                }
            }
        }
        catch (error) {
            throw error
        }

        return {
            next: true
        }
    }



    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "sms", "send", 2),
    ])
    @Post("/send")
    async sendSMS(
        @Body({
            destination: "id",
            schema: BaseController.id,

        }) template: string,
        @Body({
            schema: z.object({
                template: z.string(),
                parameters: BaseController.search,
                receptor: BaseController.phone,
                schadule: z.coerce.date().optional()
            })
        }) sendingData: any,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ): Promise<Response> {
        var id = new Types.ObjectId()
        sendingData['id'] = id.toHexString()
        sendingData['apikey'] = apikey
        if (sendingData.schadule) {
            var job = await schaduler.schedule(sendingData.schadule, "sendSMS", sendingData)
            return {
                status: 200,
                data: {
                    schaduled: true,
                    id
                }
            }
        }
        try {
            var ok = await SmsMessager.send(sendingData)
            return {
                status: 200,
                data: {
                    ok,
                    id
                }
            }
        } catch (error) {
            throw error
        }


    }

    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "sms", "send-multi", 2),
    ])
    @Post("/send/multi")
    async sendSMSMulti(
        @Body({
            destination: "id",
            schema: BaseController.id,

        }) template: string,
        @Body({
            schema: z.object({
                template: z.string(),
                data: z.array(z.object({
                    parameters: BaseController.search,
                    receptor: BaseController.phone,
                })),
                schadule: z.coerce.date().optional()
            })
        }) sendingData: any,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ) {
        sendingData['apikey'] = apikey
        var ids: string[] = []
        for (let i = 0; i < sendingData.data.length; i++) {
            let id = new Types.ObjectId()
            sendingData.data[i]['id'] = id.toHexString()
        }



        if (sendingData.schadule) {
            var job = await schaduler.schedule(sendingData.schadule, "sendSMSMulti", sendingData)
            return {
                status: 200,
                data: {
                    schaduled: true,
                    ids
                }
            }
        }
        try {
            SmsMessager.sendMulti(sendingData)
            return {
                status: 200,
                data: {
                    ok: true,
                    ids
                }
            }
        } catch (error) {
            throw error
        }
    }

    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "sms", "cancle", 2),
    ])
    @Post("/cancle")
    async cancle(
        @Body({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ): Promise<Response> {
        try {

            await schaduler.cancel({
                name: {
                    $in: ["sendSMS", "sendSMSMulti"]
                },
                "data.id": id,
                'data.apikey': apikey
            })
            return {
                status: 200
            }
        } catch (error) {
            return {
                status: 500,
                message: error as string
            }
        }
    }

    @Get("/sending/status")
    async checkSendingStatus(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string
    ): Promise<Response> {
        try {
            var log = await this.smsMessageLogRepo.findById(id)
            if (log == null)
                return {
                    status: 404,
                    message: "موردی یافت نشد"
                }
            if (log.delivered) {
                return {
                    status: 200,
                    data: {
                        code: 1
                    }
                }
            }
            if (log.fialed) {
                return {
                    status: 200,
                    data: {
                        code: -1
                    },
                    message: log.falureMSG
                }
            }

            var status = await SmsMessager.getOTPSMSStatus(log?.senderId || "")
            if (status == 1) {
                await this.smsMessageLogRepo.updateOne({ _id: id }, { $set: { delivered: true } })

            }
            if (status == -1) {
                await this.smsMessageLogRepo.updateOne({ _id: id }, { $set: { delivered: false, fialed: true } })
            }

            return {
                status: 200,
                data: await SmsMessager.getOTPSMSStatus(log?.senderId || "")
            }
        } catch (error) {
            throw error
        }
    }


    initApis(): void {
        this.addPreExecs("", "delete", this.checkOwnership.bind(this))
        this.addPreExecs("", "put", this.checkOwnership.bind(this))
    }
    // @Post()

    async init(): Promise<any> {
        // this.addPreExecs("", "post",  HasPermission([
        //     {
        //         func : this.apiKeyRepo.isExists.bind(this.apiKeyRepo),
        //         args:[{
        //             index : 1,
        //             getter : function(value: any){
        //                 token: value
        //             }
        //         }]
        //     }
        // ]))
    }

}


export class EmailMessagingExternal extends BaseController<EmailTemplate>{
    apiKeyRepo: APIKeyRepository
    constructor() {
        var repo = new EmailTemplateRepository()
        super("/external/email", repo)
        this.apiKeyRepo = new APIKeyRepository()
    }


    @Post("")
    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "email", "create-template", 2)
    ])
    async create(
        @Body({
            schema: z.object({
                title: z.string(),
                inputs: z.array(z.string()),
                text: z.string(),
                isHTML: z.boolean().optional(),
                module: z.string()
            })
        })
        data: EmailTemplate,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ): Promise<Response> {
        var apikey = ""
        try {
            data.apiCreator = (await this.apiKeyRepo.findOne({
                token: apikey
            }))?.token
        } catch (error) {
            throw error
        }
        return super.create(data)
    }

    @Delete("")
    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "email", "delete-template", 2)
    ])
    async delete(id: string, @Header("apikey") apikey: string, @IP() ip: string): Promise<Response> {
        return super.delete(id)
    }

    @Put("")
    @Permission.CheckPermit([
        Permission.APIKeyResover(2, "email", "update-template", 3)
    ])
    async editTemplate(
        @Body({
            schema: z.object({
                text: z.string().optional(),
                defaultEmailConfig: BaseController.id.optional(),
                disableDefaultConfig: z.boolean().optional(),
                isHTML: z.boolean().optional()
            })
        }) data: EmailEditOptions,
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ): Promise<Response> {
        try {
            var template = await this.repository.findById(id, {
                fromDb: true
            })
        } catch (error) {
            throw error
        }


        if (template == null) {
            return {
                status: 404,
                message: "موردی یافت نشد"
            }
        }
        // var updateData: UpdateQuery<SmsTemplate> = {}
        var updateData: any = {
            $set: {}
        }
        if (data.text) {
            updateData["$set"]["text"] = data.text as string
        }

        updateData['$set']['isHTML'] = data.isHTML


        if (data.disableDefaultConfig == true) {
            updateData["$unset"] = {
                defaultSmsConfig: 1
            }
        }
        else if (data.defaultEmailConfig) {
            updateData["$set"]["defaultEmailConfig"] = data.defaultEmailConfig
        }
        return this.editById(id, updateData)

    }

    @Get("es")
    @Permission.CheckPermit([
        Permission.APIKeyResover(2, "email", "get-templates", 3),
    ])
    async doPaginate(
        @Query({
            destination: "page",
            schema: BaseController.page
        })
        page: number,
        @Query({
            destination: "limit",
            schema: BaseController.limit
        }) limit: number,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ): Promise<Response> {
        try {
            var api = await this.apiKeyRepo.findOne({
                token: {
                    $eq: apikey
                }
            })
            if (api == null)
                return {
                    status: 404,
                    message: "موردی یافت نشد"
                }
            return this.paginate(page, limit, {
                apiCreator: api._id
            })
        } catch (error) {
            throw error
        }
    }

    @Get("/validate")
    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "email", "get-templates", 2),
    ])
    async validateTitle(
        @Query({
            destination: "title",
            schema: z.string()
        }) title: string,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ) {
        return super.checkExists({
            title
        })
    }



    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "email", "email", 2),
    ])
    @Post("/send", {
        contentType: "multipart/form-data"
    })
    async send(
        @Body({
            schema: z.object({
                template: z.string(),
                parameters: z.string(),
                receptor: BaseController.email,
                schadule: z.coerce.date().optional(),
            })
        }) sendingData: any,
        @Header("apikey") apikey: string,
        @IP() ip: string,
        @Body({
            destination: "files"
        }) files: string[],
        @Files({
            destination: "files",
            isOptional: true,
            config: {
                name: "files",
                maxCount: 10
            },
            schema: z.any().optional(),

            mapToBody: true,
        }) file: any,


    ): Promise<Response> {
        var id = new Types.ObjectId()
        sendingData['id'] = id.toHexString()
        sendingData['apikey'] = apikey
        try {
            sendingData['parameters'] = JSON.parse(sendingData.parameters)
        } catch (error) {
            
        }

        if (files) {
            sendingData["files"] = files
        }
        if (sendingData.schadule) {
            var job = await schaduler.schedule(sendingData.schadule, "sendEmail", sendingData)
            return {
                status: 200,
                data: {
                    schaduled: true,
                    id
                }
            }
        }
        try {
            var ok = await EmailMessager.send(sendingData)
            return {
                status: 200,
                data: {
                    ok,
                    id
                }
            }
        } catch (error) {
            throw error
        }


    }

    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "email", "send-multi", 2),
    ])
    @Post("/send/multi")
    async sendMulti(
        @Body({
            schema: z.object({

                template: z.string(),
                data: z.array(z.object({
                    parameters: BaseController.search,
                    receptor: BaseController.email,
                })),
                schadule: z.coerce.date().optional()
            })
        }) sendingData: any,
        @Header("apikey") apikey: string,
        @IP() ip: string,
        @Files({
            destination: "files",
            isArray: true,
            isOptional: true,
            config: {
                name: "file",
                maxCount: 10
            },
            mapToBody: true
        }) file: any,
        @Body({
            destination: "files"
        }) files?: string[],
    ) {
        sendingData['apikey'] = apikey
        var ids: string[] = []
        for (let i = 0; i < sendingData.data.length; i++) {
            let id = new Types.ObjectId()
            sendingData.data[i]['id'] = id.toHexString()
        }



        if (sendingData.schadule) {
            var job = await schaduler.schedule(sendingData.schadule, "sendSMSMulti", sendingData)
            return {
                status: 200,
                data: {
                    schaduled: true,
                    ids
                }
            }
        }
        try {
            SmsMessager.sendMulti(sendingData)
            return {
                status: 200,
                data: {
                    ok: true,
                    ids
                }
            }
        } catch (error) {
            throw error
        }
    }

    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "email", "cancle", 2),
    ])
    @Post("/cancle")
    async cancle(
        @Body({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ): Promise<Response> {
        try {

            await schaduler.cancel({
                name: {
                    $in: ["sendEmail", "sendEmailMulti"]
                },
                "data.id": id,
                'data.apikey': apikey
            })
            return {
                status: 200
            }
        } catch (error) {
            return {
                status: 500,
                message: error as string
            }
        }
    }

    @Get("/sending/status")
    async checkSendingStatus(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string
    ): Promise<Response> {
        return {
            status: 200
        }
    }

    initApis(): void {

    }

    async init(): Promise<any> {
        // this.addPreExecs("", "post",  HasPermission([
        //     {
        //         func : this.apiKeyRepo.isExists.bind(this.apiKeyRepo),
        //         args:[{
        //             index : 1,
        //             getter : function(value: any){
        //                 token: value
        //             }
        //         }]
        //     }
        // ]))
    }

}


export class NotifMessagingExternal extends BaseController<NotificationTemplate>{
    apiKeyRepo: APIKeyRepository
    constructor() {
        var repo = new NotificationTemplateRepository()
        super("/external/notif", repo)
        this.apiKeyRepo = new APIKeyRepository()
    }


    @Post("")
    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "notif", "create-template", 2)
    ])
    async create(
        @Body({
            schema: z.object({
                title: z.string(),
                inputs: z.array(z.string()),
                text: z.string(),
                module: z.string()
            })
        })
        data: NotificationTemplate,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ): Promise<Response> {
        var apikey = ""
        try {
            data.apiCreator = (await this.apiKeyRepo.findOne({
                token: apikey
            }))?.token
        } catch (error) {
            throw error
        }
        return super.create(data)
    }

    @Delete("")
    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "notif", "delete-template", 2)
    ])
    async delete(id: string, @Header("apikey") apikey: string, @IP() ip: string): Promise<Response> {
        return super.delete(id)
    }

    @Put("")
    @Permission.CheckPermit([
        Permission.APIKeyResover(2, "notif", "update-template", 3)
    ])
    async editTemplate(
        @Body({
            schema: z.object({
                text: z.string().optional(),
                defaultNotificationConfig: BaseController.id.optional(),
                disableDefaultConfig: z.boolean().optional()
            })
        }) data: NotifEditOptions,
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ): Promise<Response> {
        try {
            var template = await this.repository.findById(id, {
                fromDb: true
            })
        } catch (error) {
            throw error
        }


        if (template == null) {
            return {
                status: 404,
                message: "موردی یافت نشد"
            }
        }
        // var updateData: UpdateQuery<SmsTemplate> = {}
        var updateData: any = {
            $set: {}
        }
        if (data.text) {
            updateData["$set"]["text"] = data.text as string
        }



        if (data.disableDefaultConfig == true) {
            updateData["$unset"] = {
                defaultSmsConfig: 1
            }
        }
        else if (data.defaultNotificationConfig) {
            updateData["$set"]["defaultNotificationConfig"] = data.defaultNotificationConfig
        }
        return this.editById(id, updateData)

    }

    @Get("es")
    @Permission.CheckPermit([
        Permission.APIKeyResover(2, "notif", "get-templates", 3),
    ])
    async doPaginate(
        @Query({
            destination: "page",
            schema: BaseController.page
        })
        page: number,
        @Query({
            destination: "limit",
            schema: BaseController.limit
        }) limit: number,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ): Promise<Response> {
        try {
            var api = await this.apiKeyRepo.findOne({
                token: {
                    $eq: apikey
                }
            })
            if (api == null)
                return {
                    status: 404,
                    message: "موردی یافت نشد"
                }
            return this.paginate(page, limit, {
                apiCreator: api._id
            })
        } catch (error) {
            throw error
        }
    }

    @Get("/validate")
    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "notif", "get-templates", 2),
    ])
    async validateTitle(
        @Query({
            destination: "title",
            schema: z.string()
        }) title: string,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ) {
        return super.checkExists({
            title
        })
    }



    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "notif", "send", 2),
    ])
    @Post("/send")
    async send(
        @Body({
            schema: z.object({
                template: z.string(),
                parameters: z.string(),
                receptor: z.string(),
                schadule: z.coerce.date().optional(),
            })
        }) sendingData: any,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ): Promise<Response> {
        var id = new Types.ObjectId()
        sendingData['id'] = id.toHexString()
        sendingData['apikey'] = apikey
        try {
            sendingData['parameters'] = JSON.parse(sendingData.parameters)
        } catch (error) {
            
        }

        if (sendingData.schadule) {
            var job = await schaduler.schedule(sendingData.schadule, "sendNotif", sendingData)
            return {
                status: 200,
                data: {
                    schaduled: true,
                    id
                }
            }
        }
        try {
            var ok = await NotificationMessager.send(sendingData)
            return {
                status: 200,
                data: {
                    ok,
                    id
                }
            }
        } catch (error) {
            throw error
        }


    }

    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "notif", "send-multi", 2),
    ])
    @Post("/send/multi")
    async sendMulti(
        @Body({
            schema: z.object({
                template: z.string(),
                data: z.array(z.object({
                    parameters: BaseController.search,
                    receptor: z.string(),
                })),
                schadule: z.coerce.date().optional()
            })
        }) sendingData: any,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ) {
        sendingData['apikey'] = apikey
        var ids: string[] = []
        for (let i = 0; i < sendingData.data.length; i++) {
            let id = new Types.ObjectId()
            sendingData.data[i]['id'] = id.toHexString()
        }



        if (sendingData.schadule) {
            var job = await schaduler.schedule(sendingData.schadule, "sendNotifMulti", sendingData)
            return {
                status: 200,
                data: {
                    schaduled: true,
                    ids
                }
            }
        }
        try {
            NotificationMessager.sendMulti(sendingData)
            return {
                status: 200,
                data: {
                    ok: true,
                    ids
                }
            }
        } catch (error) {
            throw error
        }
    }

    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "notif", "cancle", 2),
    ])
    @Post("/cancle")
    async cancle(
        @Body({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ): Promise<Response> {
        try {

            await schaduler.cancel({
                name: {
                    $in: ["sendNotifMulti", "sendNotifMulti"]
                },
                "data.id": id,
                'data.apikey': apikey
            })
            return {
                status: 200
            }
        } catch (error) {
            return {
                status: 500,
                message: error as string
            }
        }
    }

    initApis(): void {

    }

    async init(): Promise<any> {
        // this.addPreExecs("", "post",  HasPermission([
        //     {
        //         func : this.apiKeyRepo.isExists.bind(this.apiKeyRepo),
        //         args:[{
        //             index : 1,
        //             getter : function(value: any){
        //                 token: value
        //             }
        //         }]
        //     }
        // ]))
    }

}

export class InternalMessageExternal extends BaseController<InternalMessageTemplate>{
    apiKeyRepo: APIKeyRepository
    constructor() {
        var repo = new InternalMessageTemplateRepository()
        super("/external/inernalmsg", repo)
        this.apiKeyRepo = new APIKeyRepository()
    }

    @Post("")
    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "internal", "create-template", 2)
    ])
    async create(
        @Body({
            schema: z.object({
                title: z.string(),
                inputs: z.array(z.string()),
                text: z.string(),
                module: z.string()
            })
        })
        data: InternalMessageTemplate,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ): Promise<Response> {
        var apikey = ""
        try {
            data.apiCreator = (await this.apiKeyRepo.findOne({
                token: apikey
            }))?.token
        } catch (error) {
            throw error
        }
        return super.create(data)
    }

    @Delete("")
    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "internal", "delete-template", 2)
    ])
    async delete(id: string, @Header("apikey") apikey: string, @IP() ip: string): Promise<Response> {
        return super.delete(id)
    }

    @Put("")
    @Permission.CheckPermit([
        Permission.APIKeyResover(2, "internal", "update-template", 3)
    ])
    async editTemplate(
        @Body({
            schema: z.object({
                text: z.string().optional()
            })
        }) data: NotifEditOptions,
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ): Promise<Response> {
        try {
            var template = await this.repository.findById(id, {
                fromDb: true
            })
        } catch (error) {
            throw error
        }


        if (template == null) {
            return {
                status: 404,
                message: "موردی یافت نشد"
            }
        }
        // var updateData: UpdateQuery<SmsTemplate> = {}
        var updateData: any = {
            $set: {}
        }
        if (data.text) {
            updateData["$set"]["text"] = data.text as string
        }

        return this.editById(id, updateData)

    }

    @Get("es")
    @Permission.CheckPermit([
        Permission.APIKeyResover(2, "internal", "get-templates", 3),
    ])
    async doPaginate(
        @Query({
            destination: "page",
            schema: BaseController.page
        })
        page: number,
        @Query({
            destination: "limit",
            schema: BaseController.limit
        }) limit: number,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ): Promise<Response> {
        try {
            var api = await this.apiKeyRepo.findOne({
                token: {
                    $eq: apikey
                }
            })
            if (api == null)
                return {
                    status: 404,
                    message: "موردی یافت نشد"
                }
            return this.paginate(page, limit, {
                apiCreator: api._id
            })
        } catch (error) {
            throw error
        }
    }

    @Get("/validate")
    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "internal", "get-templates", 2),
    ])
    async validateTitle(
        @Query({
            destination: "title",
            schema: z.string()
        }) title: string,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ) {
        return super.checkExists({
            title
        })
    }


    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "internal", "send", 2),
    ])
    @Post("/send")
    async send(
        @Body({
            schema: z.object({
                template: z.string(),
                parameters: z.string(),
                receptor: z.string(),
                namespace : z.string(),
                schadule: z.coerce.date().optional(),
            })
        }) sendingData: any,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ): Promise<Response> {
        var id = new Types.ObjectId()
        sendingData['id'] = id.toHexString()
        sendingData['apikey'] = apikey
        try {
            sendingData['parameters'] = JSON.parse(sendingData.parameters)
        } catch (error) {
            
        }

        if (sendingData.schadule) {
            var job = await schaduler.schedule(sendingData.schadule, "sendInternal", sendingData)
            return {
                status: 200,
                data: {
                    schaduled: true,
                    id
                }
            }
        }
        try {
            var ok = await InternalMessager.send(sendingData)
            return {
                status: 200,
                data: {
                    ok,
                    id
                }
            }
        } catch (error) {
            throw error
        }


    }

    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "internal", "send-multi", 2),
    ])
    @Post("/send/multi")
    async sendMulti(
        @Body({
            schema: z.object({
                template: z.string(),
                data: z.array(z.object({
                    parameters: BaseController.search,
                    receptor: z.string(),
                })),
                namespace : z.string(),
                schadule: z.coerce.date().optional()
            })
        }) sendingData: any,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ) {
        sendingData['apikey'] = apikey
        var ids: string[] = []
        for (let i = 0; i < sendingData.data.length; i++) {
            let id = new Types.ObjectId()
            sendingData.data[i]['id'] = id.toHexString()
        }



        if (sendingData.schadule) {
            var job = await schaduler.schedule(sendingData.schadule, "sendInternalMulti", sendingData)
            return {
                status: 200,
                data: {
                    schaduled: true,
                    ids
                }
            }
        }
        try {
            InternalMessager.sendMulti(sendingData)
            return {
                status: 200,
                data: {
                    ok: true,
                    ids
                }
            }
        } catch (error) {
            throw error
        }
    }

    @Permission.CheckPermit([
        Permission.APIKeyResover(1, "internal", "cancle", 2),
    ])
    @Post("/cancle")
    async cancle(
        @Body({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Header("apikey") apikey: string,
        @IP() ip: string
    ): Promise<Response> {
        try {

            await schaduler.cancel({
                name: {
                    $in: ["sendInternal", "sendInternalMulti"]
                },
                "data.id": id,
                'data.apikey': apikey
            })
            return {
                status: 200
            }
        } catch (error) {
            return {
                status: 500,
                message: error as string
            }
        }
    }


    initApis(): void {

    }

    async init(): Promise<any> {
        // this.addPreExecs("", "post",  HasPermission([
        //     {
        //         func : this.apiKeyRepo.isExists.bind(this.apiKeyRepo),
        //         args:[{
        //             index : 1,
        //             getter : function(value: any){
        //                 token: value
        //             }
        //         }]
        //     }
        // ]))
    }
}