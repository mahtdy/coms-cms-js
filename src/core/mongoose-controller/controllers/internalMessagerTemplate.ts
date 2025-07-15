



import BaseController, { ControllerOptions } from "../controller";
import InternalMessageTemplate from "../repositories/internalMessageTemplate/model";
import InternalMessageTemplateRepository from "../repositories/internalMessageTemplate/repository";
import { z } from "zod"
import { Body, Query } from "../../decorators/parameters";
import { Post } from "../../decorators/method";
import { Response } from "../../controller";

interface EditOptions {
    text: string
}

export class InternalMessageTemplateController extends BaseController<InternalMessageTemplate>{
    constructor(baseRoute: string, repo: InternalMessageTemplateRepository, options?: ControllerOptions) {
        if (!options) {
            options = {}
        }
        if (!options.insertSchema) {
            options.insertSchema = z.object({
                title: z.string(),
                inputs: z.array(z.string()),
                text: z.string(),
                module: z.string(),
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