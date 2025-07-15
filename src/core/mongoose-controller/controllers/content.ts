


import { Response } from "../../controller";
import { seoSchema } from "../basePage/controller";
import BaseController, { ControllerOptions } from "../controller";
import Content from "../repositories/content/model";
import ContentRepository from "../repositories/content/repository";

import { z } from "zod"
import SeoDraftRepository from "../repositories/seoDraft/repository";
import { Get } from "../../decorators/method";



export class ContentController extends BaseController<Content> {
    seoDraftRepo: SeoDraftRepository
    constructor(baseRoute: string, repo: ContentRepository, options?: ControllerOptions) {
        super(baseRoute, repo, options)
        this.seoDraftRepo = new SeoDraftRepository()
    }


    public async searchHelper(queryParam: any) {
        // console.log(queryParam)
        // queryParam[key + "$" + this.searchFilters[key][i]]
        var query: any = {}
        if (queryParam['url_title$reg'] != undefined) {
            query["$or"] = [
                {
                    url: {
                        "$regex": new RegExp(queryParam['url_title$reg'] as string)
                    }
                },
                {
                    "seo.seoTitle": {
                        "$regex": new RegExp(queryParam['url_title$reg'] as string)
                    }
                }
            ]
        }
        try {
            delete queryParam['url_title$reg']
        } catch (error) {

        }

        query = Object.assign(await super.searchHelper(queryParam), query)
        if (queryParam['keyWords$reg']) {
            query['$or'] = [
                { keyWords: { "$regex": query['keyWords']["$regex"] } },
                { mainKeyWord: { "$regex": query['keyWords']["$regex"] } }
            ]
            delete query['keyWords']
        }
        if (query['seo.seoTitle']) {
            query['seoTitle'] = query['seo.seoTitle']
            delete query['seo.seoTitle']
        }

        if (queryParam["_id$ne"]) {
            query["id"] = {
                $ne: queryParam["_id$ne"]
            }
        }
        return query
    }


    async search(page: number, limit: number, reqQuery: any, admin?: any, ...params: any[]): Promise<Response> {
        // console.log(reqQuery)
        let response = await super.search(page, limit, reqQuery, admin)
        if (response.data.count == 0) {
            const query = await this.searchHelper(reqQuery)
            return {
                status: 200,
                data: Object.assign(await this.seoDraftRepo.paginate(query, limit, page), {
                    draft: true
                })
            }
        }
        // console.log(response)
        // console.log(response.data.count)
        // if()
        // if(response.data.count < 2){

        // }

        return response

    }

    

    @Get("/url/black-list")
    async getUrlBlacklist(): Promise<Response> {
        let data = ["/google" , "/api" , "/uploads" , "/apis" , "/socket.io" , "/admin"]
        return {
            status: 200,
            data
        }
    }


    initApis(): void {
        super.initApis()
        this.addRouteWithMeta("/article/seo/search", "get", this.search.bind(this), Object.assign(BaseController.searcheMeta, { absolute: true }))
        this.addRouteWithMeta("/article/seo/search/list", "get", this.getSearchList.bind(this), {})
        this.addRouteWithMeta("/article/seos", "get", this.paginate.bind(this), Object.assign(BaseController.paginateMeta, { absolute: true }))
    }
}

var seoContentController = new ContentController("/content", new ContentRepository(), {
    searchFilters: {
        mainKeyWord: ["eq", "list", "reg"],
        keyWords: ["eq", "list", "reg"],
        "seo.seoTitle": ["eq", "reg"],
        url: ["eq", "list", "reg"],
        url_title: ["reg"],
        // type: ["eq" , "list"]
    },
    insertSchema: seoSchema
})
// seoContentController.tag = "/admin/article"

export default seoContentController