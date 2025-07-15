import BaseController, { ControllerOptions } from "../controller";
import SmsTemplate from "../repositories/smsTemplate/model";
import SmsTemplateRepository from "../repositories/smsTemplate/repository";
import { Body, Query } from "../../decorators/parameters";
import { z } from "zod"
import { Response } from "../../controller";
import SmsMessager, { EditTemplateResult } from "../../messaging/smsMessager";
import { Post } from "../../../core/decorators/method";


interface EditOptions {
    text?: string
    defaultSmsConfig?: string,
    disableDefaultConfig?: boolean,
    sendOTP?: boolean
}
export class SmsTemplateController extends BaseController<SmsTemplate>{

    constructor(baseRoute: string, repo: SmsTemplateRepository, options?: ControllerOptions) {
        if (!options) {
            options = {}
        }
        if (!options.insertSchema) {
            options.insertSchema = z.object({
                title: z.string(),
                inputs: z.array(z.string()),
                text: z.string(),
                id: z.coerce.number().int().positive().optional(),
                sendOTP: z.boolean().optional(),
                defaultSmsConfig: BaseController.id.optional(),
                module: z.string().optional(),
                status: z.enum(["waiting", "active", "inactive"]).default("waiting"),
                apiCreator: BaseController.id.optional()
                // isCore: z.boolean()
            })
        }
        super(baseRoute, repo, options)
    };

    async editTemplate(
        @Body({
            schema: z.object({
                text: z.string().optional(),
                defaultSmsConfig: BaseController.id.optional(),
                disableDefaultConfig: z.boolean().optional(),
                sendOTP: z.boolean().optional()
            })
        }) data: EditOptions,
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string
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


        if (data.sendOTP == true) {
            updateData["$set"]["sendOTP"] = true
            updateData["$unset"] = {
                defaultSmsConfig: 1
            }
        }


        if (data.sendOTP == false) {
            updateData["$set"]["sendOTP"] = false
        }

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

    async checkTemplateStatus(
        @Query({
            destination: "id",
            schema: z.coerce.number().int().positive()
        }) id: number): Promise<Response> {

        try {
            var status = await SmsMessager.getTemplateStatus(id)
        } catch (error) {
            throw error
        }
        if (status == 500) {
            return {
                status: 500,
                message: "خطای داخلی"
            }
        }
        return {
            status: 200,
            data: { status }
        }

    }

    @Post("/confirm")
    async confirmTemplate(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string
    ): Promise<Response> {
        var template = await this.repository.findById(id)
        if (template == null)
            return {
                status: 404,
                message: "قالب یافت نشد"
            }
        try {
            return {
                status: 200,
                data: await this.repository.confirmTemplate(id)
            }
        } catch (error) {
            return {
                status: 400,
                message: error as string
            }
        }
    }

    @Post("/reject")
    async rejectTemplate(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string
    ) {
        return this.editById(id, {
            $set: {
                status: "rejected"
            }
        })
    }


    // async check


    initApis(): void {
        this.addRouteWithMeta("", "post", this.create.bind(this), {
            "1": {
                index: 0,
                source: "body",
                schema: this.insertSchema
            }
        })
        this.addRouteWithMeta("s", "get", this.search.bind(this), {
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
            '3' :{
                index :  2,
                source : "query",
                schema : BaseController.search
            }
        }),
            this.addRoute("s/search/list", "get", this.getSearchList.bind(this)),
            this.addRouteWithMeta("", "get", this.findById.bind(this), {
                "1": {
                    index: 0,
                    source: "query",
                    destination: "id",
                    schema: BaseController.id
                },
            })
        this.addRouteWithMeta("", "delete", this.delete.bind(this), {
            "1": {
                index: 0,
                source: "query",
                destination: "id",
                schema: BaseController.id
            },
        })
        this.addRoute("", "put", this.editTemplate.bind(this))
        this.addRoute("/status", "get", this.checkTemplateStatus.bind(this))
    }
}

var smsTemplate = new SmsTemplateController("/smsTemplate", new SmsTemplateRepository(), {
    searchFilters: {
        status: ["list", "eq"],
        isCore: ["eq"],
        module: ["eq"]
    }
})



export default smsTemplate