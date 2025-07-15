import { Route } from "../application";
import { Response } from "../controller";
import { Body } from "../decorators/parameters";
import { Plugin } from "../plugin";
import ConfigService from "../services/config";
import { seoSchema } from "./basePage/controller";
import BaseController from "./controller";
import Content from "./repositories/content/model";
import ContentRepository from "./repositories/content/repository";
import { z } from "zod"


export default class SeoInterface extends Plugin {
    contentRepo: ContentRepository
    constructor() {
        super()
        this.contentRepo = new ContentRepository()
    }

    async init(): Promise<any> {

        return true;
    }
    serve(): Route[] {
        return [
            {
                execs: this.addUrl.bind(this),
                method: "post",
                route: "/seo/url",
                meta: Reflect.getMetadata("addUrl", this)
            },
            {
                execs: this.deleteUrl.bind(this),
                method: "delete",
                route: "/seo/url",
                meta: Reflect.getMetadata("deleteUrl", this)
            },
            {
                execs: this.updateUrl.bind(this),
                method: "put",
                route: "/seo/url",
                meta: Reflect.getMetadata("updateUrl", this)
            }
        ]
    }

    async addUrl(
        @Body({
            destination: "seo",
            schema: seoSchema
        }) seo: Content,
        @Body({
            destination: "config",
            schema: z.object({
                category: BaseController.id,
                language: BaseController.id,
                type: z.string()
            })
        }) config: any,

    ): Promise<Response> {
        seo.type = config.type
        seo.language = config.language
        seo.category = config.category
        try {
            var seoConfig = ConfigService.getConfig("seoConfig")
            var configData = seoConfig[config.type]
            return {
                data: await this.contentRepo.insert(seo, {
                    category: config.category,
                    language: config.language,
                    type: config.type,
                    customFunc: configData['functions']['1']
                }),
                status: 200
            }
        } catch (error) {
            throw error
        }

    }

    async deleteUrl(
        @Body({
            destination: "id",
            schema: z.string()
        }) id: string,
        @Body({
            destination: "config",
            schema: z.object({
                category: BaseController.id,
                language: BaseController.id,
                type: z.string()
            })
        }) config: any,
    ): Promise<Response> {
        try {
            return {
                data: await this.contentRepo.findOneAndDelete({
                    id: id,
                    type: config.type
                }),
                status: 200
            }
        } catch (error) {
            throw error
        }


    }

    async updateUrl(
        @Body({
            destination: "id",
            schema: z.string()
        }) id: string,
        @Body({
            destination: "seo",
            schema: z.any()
        }) seo: Content,
        @Body({
            destination: "config",
            schema: z.object({
                category: BaseController.id,
                language: BaseController.id,
                type: z.string()
            })
        }) config: any,
    ): Promise<Response> {
        console.log(id, config)
        try {
            var seoConfig = ConfigService.getConfig("seoConfig")
            var configData = seoConfig[config.type]
            return {
                status: 200,
                data: await this.contentRepo.editContent({
                    _id: id,
                    type: config.type,
                }, {
                    $set: seo
                },
                    {
                        category: config.category,
                        language: config.language,
                        type: config.type,
                        customFunc: configData['functions']['1']
                    })
            }
        } catch (error) {
            throw error
        }
    }

    async getSeo() {

    }
}