import BaseController, { ControllerOptions } from "../controller";
import NotificationTemplate from "../repositories/notificationTemplate/model";
import NotificationTemplateRepository from "../repositories/notificationTemplate/repository";
import { z } from "zod"
import { Body, Query } from "../../decorators/parameters";
import { Post } from "../../decorators/method";
import { Response } from "../../controller";

interface EditOptions {
    text?: string,
    defaultNotificationConfig?: string,
    disableDefaultConfig: boolean
}

export class NotificationTemplateController extends BaseController<NotificationTemplate>{
    constructor(baseRoute: string, repo: NotificationTemplateRepository, options?: ControllerOptions) {
        if (!options) {
            options = {}
        }
        if (!options.insertSchema) {
            options.insertSchema = z.object({
                title: z.string(),
                messageTitle : z.string(),
                inputs: z.array(z.string()),
                text: z.string(),
                defaultSmsConfig: BaseController.id.optional(),
                module: z.string().optional(),
                status: z.enum(["waiting", "active", "inactive"]).default("waiting"),
                apiCreator: BaseController.id.optional(),

            })
        }
        super(baseRoute, repo, options)
    };

    async editTemplate(
        @Body({
            schema: z.object({
                text: z.string().optional(),
                defaultNotificationConfig: BaseController.id.optional(),
                disableDefaultConfig: z.boolean().optional()
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
    }
}


const notificationTemplate = new NotificationTemplateController("/notification/template" ,new NotificationTemplateRepository(), {
 
})

export default notificationTemplate