
import SmsConfigRepository from "../repositories/smsConfig/repository";
import SmsConfig from "../repositories/smsConfig/model"
import BaseController, { ControllerOptions } from "../controller";
import { Types, UpdateQuery } from "mongoose"
import { Response } from "../../controller";
import SmsLogRepository from "../repositories/smsLog/repository";
import SmsLog from "../repositories/smsLog/model";
import SmsMessager from "../../messaging/smsMessager"
import SmsTemplateRepository from "../repositories/smsTemplate/repository";
import { z } from "zod";

export class SmsConfigController extends BaseController<SmsConfig>{
    constructor(baseRoute: string,repo :SmsConfigRepository, options?: ControllerOptions) {
        if(!options){
            options = {}
        }
        if(!options.insertSchema){
            options.insertSchema  = z.object({
                status: z.boolean(),
                title: z.string(),
                lineNumber: z.string(),
                config: z.any(),
                id: z.enum(["kasbarg", "sms", "sabapayamak", "farapayamak", "payam-resan", "mediapayamak", "kavenegar", "parsgreen", "hiro-sms", "niksms", "smspanel", "mellipayamak"]),
                isDefault: z.boolean().default(false)
            })
        }
        
        super(baseRoute, repo  ,options)
    };

    async create(data: SmsConfig): Promise<Response> {
        data["isOTP"] = false
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

    async editById(id: string, data: any): Promise<Response> {
        try {
            var resp = await super.editById(new Types.ObjectId(id), {
                $set: data
            } as UpdateQuery<SmsConfig>)
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
            var dataList = await new SmsLogRepository().paginate({
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


            var result = await SmsMessager.sendWithConfig({
                template: "testTemplate",
                receptor: admin?.phoneNumber,
                parameters: {
                    test: ""
                }
            }, await this.repository.findById(new Types.ObjectId(id), {
                fromDb: true
            }))
            if (result == false) {
                await new SmsLogRepository().insert({
                    config: id,
                    result: false,
                    importance: 2
                } as unknown as SmsLog)
                return {
                    status: 200,
                    message: "ارسال ناموفق",
                    data: {
                        ok: false
                    }
                }
            }
            else {
                await new SmsLogRepository().insert({
                    config: id,
                    result: true,
                    importance: 2
                } as unknown as SmsLog)
                return {
                    status: 200,
                    message: "ارسال موفق",
                    data: {
                        ok: true
                    }
                }
            }
        } catch (error) {
            await new SmsLogRepository().insert({
                config: id,
                result: false,
                importance: 2
            } as unknown as SmsLog)
            throw error
        }

    }

    async deleteById(
        id: string
    ): Promise<Response> {
        try {
            if (await this.repository.isExists({
                _id: id,
                isOTP: true
            })) {
                return {
                    status: 400,
                    message: "کانفیگ او تی پی قابل حذف نیست"
                }
            }
        } catch (error) {
            throw error
        }
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
            await new SmsTemplateRepository().disableDefaultConfig(id as string)
        }
        return resp

    }

    initApis(): void {
        super.initApis()
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



var smsConfig = new SmsConfigController("/smsConfig",new SmsConfigRepository() , {})


export default smsConfig
