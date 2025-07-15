
import { Body, Param, Query } from "../../decorators/parameters";
import { Response } from "../../controller";
import { Get, Post } from "../../decorators/method";
import BaseController, { ControllerOptions } from "../controller";
import QueryMaker from "../repositories/queryMaker/model";
import QueryMakerRepository from "../repositories/queryMaker/repository";
import { z } from "zod"
import ContentMaduleRegistry, { ContentMadule } from "../contentRegistry";

const queryTranslate: any = {
    "list": (data: any) => {
        return {
            "$in": data
        }
    },
    "eq": (data: any) => {
        return {
            "$eq": data
        }
    },
    "reg": (data: any) => {
        return {
            "$reg": new RegExp(data)
        }
    },
    "gte": (data: any) => {
        return {
            "$gte": data
        }
    },
    "lte": (data: any) => {
        return {
            "$lte": data
        }
    },
}

export class QueryMakerController extends BaseController<QueryMaker>{
    contentRegistry: ContentMaduleRegistry
    constructor(baseRoute: string, repo: QueryMakerRepository, options?: ControllerOptions) {
        super(baseRoute, repo, options)
        this.contentRegistry = ContentMaduleRegistry.getInstance()
    }

    initApis(): void {

    }

    
    @Post("/query/:repoName")
    async addQuery(
        @Param({
            destination: "repoName",
            schema: z.string()
        }) repoName: string,
        @Body({
            schema: z.object({
                title: z.string(),
                sort: z.object({
                    key: z.string(),
                    type: z.enum(["-1", "1"])
                }),
                limit: BaseController.limit,
                query: z.array(z.object({
                    field: z.string(),
                    filter: z.enum(["eq", "list", "reg", "gte", "lte"]),
                    data: z.any()
                })).optional(),
                exact: z.object({
                    filter: z.enum(["eq", "list"]),
                    data: z.any()
                }).optional(),
                fromOwn: z.array(z.object({
                    field: z.string(),
                    filter: z.enum(["eq", "list", "reg", "gte", "lte"]),
                    data: z.array(z.string()).optional(),
                    dataFrom: z.enum(["own", "static"]),
                    foreign: z.string().optional()
                })).optional()
            }),
        })
        data: any

    ): Promise<Response> {
        data['repoName'] = repoName
        return this.create(data)
    }


    @Get("/test")
    async testQuery(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) _id: string,
        @Query({
            schema: BaseController.search
        }) reqQuery: any
    ): Promise<Response> {
        try {
            const q = await this.repository.findById(_id)
            if (q == null) {
                return {
                    status: 404
                }
            }

            const repo = this.contentRegistry.getRegistry(q.repoName)

            if (repo == undefined) {
                return {
                    status: 404
                }
            }

            var sort: any = {}
            if (q.sort)
                sort[q.sort?.key] = q.sort?.type

            return {
                data: await repo.repo?.getBlockData(this.getExecutable(q, repo, reqQuery), q.limit, 1, {
                    sort,
                    projection: repo.selectData
                }),
                status: 200
            }
        } catch (error) {
            throw error
        }
    }


    getExecutable(q: QueryMaker, repo: ContentMadule, reqQuery: any) {
        let query: any = {}
        if (q.exact != undefined) {
            let key = repo.defaultExact || ""
            query[key] = {}
            query[key]["$in"] = q.exact.data
            return query
        }

        var ands: any[] = []
        if (q.query) {
            for (let i = 0; i < q.query.length; i++) {
                let newQuery: any = {}
                newQuery[q.query[i].field] = queryTranslate[q.query[i].filter](q.query[i].data)
                ands.push(newQuery)
            }
        }

        if (q.fromOwn) {
            for (let i = 0; i < q.fromOwn.length; i++) {
                let newQuery: any = {}
                if (q.fromOwn[i]['dataFrom'] == "own") {
                    newQuery[q.fromOwn[i].field] = queryTranslate[q.fromOwn[i].filter as string](reqQuery[q.fromOwn[i]['foreign']])
                }
                else {
                    newQuery[q.fromOwn[i].field] = queryTranslate[q.fromOwn[i].filter as string](q.fromOwn[i].data)
                }

                ands.push(newQuery)
            }
        }
        if (ands.length == 0)
            return query
        if (ands.length == 1)
            return ands[0]
        query["$and"] = ands
        return query
    }


    @Get("/queries/:repoName")
    async getQueries(
        @Param({
            destination: "repoName",
            schema: z.string()
        }) repoName: string,
        @Query({
            destination: "preset",
            schema: BaseController.booleanFromquery.default("false")
        }) preset: boolean,
        @Query({
            destination: "page",
            schema: BaseController.page
        }) page: number,
        @Query({
            destination: "limit",
            schema: BaseController.limit
        }) limit: number,
        @Query({
            destination: "title$reg",
            schema: z.string().optional()
        }) title?: string

    ): Promise<Response> {
        try {
            var query: any = {
                repoName,
                preset
            }
            if (title) {
                query['title'] = {
                    $reg: new RegExp(title)
                }
            }
            return this.paginate(page, limit, query)
        } catch (error) {
            throw error
        }
    }


    @Get("/config")
    async getQuery(
        @Query({
            destination: "repoName",
            schema: z.string()
        }) repoName: string
    ): Promise<Response> {
        let data: any = this.contentRegistry.getRegistry(repoName)
        delete data['repo']
        return {
            status: 200,
            data
        }
    }
}

const queryMaker = new QueryMakerController("/query-maker", new QueryMakerRepository())


export default queryMaker