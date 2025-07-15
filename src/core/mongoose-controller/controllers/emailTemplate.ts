import BaseController, { ControllerOptions } from "../controller";
import EmailTemplate from "../repositories/emailTemplate/model";
import { Admin, Body, Query } from "../../decorators/parameters";
import { z } from "zod"
import { Response } from "../../controller";
import SmsMessager, { EditTemplateResult } from "../../messaging/smsMessager";
import EmailTemplateRepository from "../repositories/emailTemplate/repository";
import { Post, Put } from "../../decorators/method";
import { AdminInfo } from "../auth/admin/admin-logIn";
// import z from "zod"

interface EmailEditOptions {
    text?: string,
    defaultEmailConfig: string,
    disableDefaultConfig?: boolean ,
    isHTML?: boolean
}

export class EmailTemplateController extends BaseController<EmailTemplate>{
    constructor(baseRoute: string, repo: EmailTemplateRepository, options?: ControllerOptions) {
        if (!options) {
            options = {}
        }
        if (!options.insertSchema) {
            options.insertSchema = z.object({
                title: z.string(),
                inputs: z.array(z.string()),
                text: z.string(),
                defaultEmailConfig: BaseController.id,
                defaultSmsConfig: BaseController.id.optional(),
                isHTML: BaseController.id.optional(),
                module: z.string(),
                status: z.enum(["waiting", "active", "inactive"]).default("waiting"),
                apiCreator: BaseController.id.optional()
            })
        }
        super(baseRoute, repo, options)
    };

    create(data: EmailTemplate, @Admin() admin: AdminInfo): Promise<Response> {
        data.adminCreator = admin._id
        return super.create(data)
    }

    @Put("")
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

        return this.editById(id, {
            $set: {
                status: "active"
            }
        })

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
                status: "inactive"
            }
        })
    }


    initApis(): void {
        this.addRouteWithMeta("", "post", this.create.bind(this), {
            "1": {
                index: 0,
                source: "body",
                schema: this.insertSchema
            }
        })
        this.addRouteWithMeta("s", "get", this.paginate.bind(this), {
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
        })
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
        this.addRoute("s/search/list", "get", this.getSearchList.bind(this))
    }
}

var emailTemplate = new EmailTemplateController("/emailTemplate", new EmailTemplateRepository(), {

    searchFilters: {
        status: ["list", "eq"],
        isCore: ["eq"],
        module: ["eq"]
    },
    insertSchema : z.object({
        title: z.string(),
        inputs: z.array(z.string()),
        text: z.string(),
        isHTML : z.boolean().default(false),
        defaultEmailConfig : BaseController.id.optional(),
        module: z.string().optional(),
        status : z.enum(["waiting", "active", "inactive"]),
        isCore: z.boolean().default(true),
        // adminCreator : 
    })
})



export default emailTemplate