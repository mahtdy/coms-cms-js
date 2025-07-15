
import EmailConfigRepository from "../repositories/emailConfig/repository";
import EmailConfig from "../repositories/emailConfig/model"
import BaseController, { ControllerOptions } from "../controller";
import { Types, UpdateQuery } from "mongoose"
import { Response } from "../../controller";
import { z } from "zod";
import EmailLogRepository from "../repositories/emailLog/repository";
import EmailMessager from "../../messaging/emailMessager"
import EmailLog from "../repositories/emailLog/model";
import EmailTemplateRepository from "../repositories/emailTemplate/repository";

export class EmailConfigController extends BaseController<EmailConfig>{

    constructor(baseRoute: string, repo : EmailConfigRepository,options?: ControllerOptions) {
        if(!options){
            options = {}
        }
        if(!options.insertSchema){
            options.insertSchema  = z.object({
                host: z.string(),
                status: z.boolean(),
                title: z.string(),
                config: z.any(),
                type: z.enum(["smtp", "other"]),
                protocolType: z.enum(["TLS", "SSL", "NonSecure"]),
                isDefault: z.boolean().default(false)
            })
        }
        super(baseRoute, repo, options)
        
        
    };

    async create(data: EmailConfig): Promise<Response> {
        try {
            var resp = await super.create(data)
            if (resp.status == 200 && data.isDefault) {
                await this.repository.updateOne({
                    isDefault: true,
                    _id: {
                        $ne: resp.data?._id
                    }
                }, {
                    $set: {
                        isDefault: false
                    }
                })
            }
        } catch (error) {
            throw error
        }
        return resp
    }

    async createWithAdmin(data: EmailConfig, session: any) {
        data.maker = session.admin?._id
        return this.create(data)
    }

    async editById(id: string, data: any): Promise<Response> {
        try {
            var resp = await super.editById(new Types.ObjectId(id), {
                $set: data
            } as UpdateQuery<EmailConfig>)
            if (resp?.status == 200 && data.isDefault) {
                await this.repository.updateOne({
                    isDefault: true,
                    _id: {
                        $ne: id
                    }
                }, {
                    $set: {
                        isDefault: false
                    }
                })
            }
        } catch (error) {
            throw error
        }
        return resp
    }

    async getLogs(page: number, limit: number, id: string): Promise<Response> {
        try {
            var dataList = await new EmailLogRepository().paginate({
                config: id
            }, limit, page)
        } catch (error) {
            throw error
        }
        return {
            status: 200,
            data: dataList,
            message: " عملیات موفق"
        }
    }

    // @Log
    async test(
        session: any,
        id: string
    ): Promise<Response> {
        var admin = session['admin']
        try {


            var result = await EmailMessager.sendWithConfig({
                template: "testTemplate",
                receptor: admin?.email,
                parameters: {
                    test: ""
                }
            }, await this.repository.findById(new Types.ObjectId(id), {
                fromDb: true
            }))
            if (result == false) {
                await new EmailLogRepository().insert({
                    config: id,
                    result: false,
                    importance: 2
                } as unknown as EmailLog)
                return {
                    status: 200,
                    message: "ارسال ناموفق",
                    data: {
                        ok: false
                    }
                }
            }
            else {
                await new EmailLogRepository().insert({
                    config: id,
                    result: true,
                    importance: 2
                } as unknown as EmailLog)
                return {
                    status: 200,
                    message: "ارسال موفق",
                    data: {
                        ok: true
                    }
                }
            }
        } catch (error) {
            await new EmailLogRepository().insert({
                config: id,
                result: false,
                importance: 2
            } as unknown as EmailLog)
            throw error
        }

    }

    async deleteById(
        id: string
    ): Promise<Response> {
        try {
            if (await this.repository.isExists({
                _id: id,
                isDefault: true
            })) {
                return {
                    status: 400,
                    message: "کانفیگ  پیشفرض قابل حذف نیست"
                }
            }
        } catch (error) {
            throw error
        }
        var resp = await super.delete(new Types.ObjectId(id))
        if (resp?.status == 200) {
            await new EmailTemplateRepository().disableDefaultConfig(id as string)
        }
        return resp

    }


    initApis(): void {
        super.initApis()
        this.exclude("/emailConfig", "post")
        this.addRouteWithMeta("/emailConfig", "post", this.createWithAdmin.bind(this), {
            "1": {
                index: 0,
                source: "body",
                schema: this.insertSchema
            }
        })
        this.addRouteWithMeta("", "put", this.editById.bind(this), {
            "1": {
                index: 0,
                source: "query",
                destination: "id",
                schema: BaseController.id
            },
            "2": {
                index: 1,
                source: "body",
                schema: this.insertSchema
            }
        })
        
        this.addRouteWithMeta("", "get", this.findById.bind(this), {
            "1": {
                index: 0,
                source: "query",
                destination: "id",
                schema: BaseController.id
            }
        })
        
        this.addRouteWithMeta("/test", "get", this.test.bind(this), {
            "1": {
                index: 0,
                source: "query",
                destination: "id",
                schema: BaseController.id
            }
        })
        
        this.addRouteWithMeta("/logs", "get", this.getLogs.bind(this), {
            "1": {
                index: 0,
                source: "query",
                destination: "page",
                schema: BaseController.page
            },
            "2": {
                index: 1,
                source: "query",
                destination: "limit",
                schema: BaseController.limit
            },
            "3": {
                index: 2,
                source: "query",
                destination: "id",
                schema: BaseController.id
            }
        })
    }
    

}



var emailConfig = new EmailConfigController("/emailConfig",new EmailConfigRepository(), {})



export default emailConfig
