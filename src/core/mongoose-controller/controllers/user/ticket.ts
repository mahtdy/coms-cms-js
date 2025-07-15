import { Body, Files, User } from "../../../decorators/parameters"
import { Response } from "../../../controller"
import BaseController, { ControllerOptions } from "../../controller"
import Ticket, { TicketState } from "../../repositories/ticket/model"
import TicketRepository from "../../repositories/ticket/repository"
import z from "zod"
import { Get, Post, Put } from "../../../decorators/method"
import { FilterQuery } from "mongoose"
import { QueryInfo } from "../../repository"
import { UserInfo } from "../../auth/user/userAuthenticator"
import FileManagerConfigRepository from "../../repositories/fileManagerConfig/repository"
import ConfigService from "../../../services/config"
// import { UserInfo } from 

export class TicketController extends BaseController<Ticket>{
    constructor(baseRoute: string, repo: TicketRepository, options?: ControllerOptions) {
        super(baseRoute, repo, options)
    }


    create(
        data: Ticket,
        @User() user: UserInfo,
        @Body({
            destination: "file"
        }) file?: string,
        @Files({
            config: {
                name: "file",
                maxCount: 1,
                types: ["jpg", "pdf", "png", "zip"]
            },
            schema: z.any().optional(),
            destination: "file",
            mapToBody: true,
            moveFilesToCDN: {
                name: "file",
                config: {
                    path: "ticketing/",
                    customServer: async function () {
                        try {
                            var cdnRepo = new FileManagerConfigRepository()
                            var conf = await cdnRepo.findOne({
                                isDefaultContent: true
                            })
                            if (conf == null) {
                                return ConfigService.getConfig("TEMP_FILEMANAGER")
                            }
                            return conf

                        } catch (error) {
                            return ConfigService.getConfig("TEMP_FILEMANAGER")
                        }
                    }
                }
            },
            isOptional: true
        }) files?: any,
    ): Promise<Response> {
        if (data.messages) {
            for (let i = 0; i < data.messages.length; i++) {
                data.messages[i].from = 'user'
                data.messages[i].user = user.id
            }
            if (file && file != "") {
                try {
                   data.messages[0]['files'] = [{
                    path: file,
                    size: files[0].size / 1000
                }]
                } catch (error) {
    
                }
            }
        }
        data.owner = "user"
        data.user = user.id
        data.starter = "user"
        return super.create(data)
    }

    @Put("/close")
    async closeTicket(
        @Body({
            destination: "id",
            schema: BaseController.id
        }) id: string): Promise<Response> {
        return this.editById(id, {
            $set: {
                state: TicketState.closed,
                lastModified: new Date(),
                stateNumber: 0,
                closeDate: new Date()
            }
        })
    }


    @Put("/open")
    async openTicket(
        @Body({
            destination: "id",
            schema: BaseController.id
        }) id: string
    ): Promise<Response> {
        return this.editById(id, {
            $set:
            {
                state: TicketState.open,
                stateNumber: 1,
                lastModified: new Date()
            },
            $unset:
            {
                closeDate: 1
            }
        })
    }



    @Post("/message", {
        contentType: "multipart/form-data",

    })
    async addMessage(
        @Body({
            destination: "messages",
            schema: z.array(z.object({
                text: z.string(),
                files: z.array(z.string()).default([])
            }).omit({ "files": true })),
            parseJson: true,
            isArray: true
        }) messages: any[],
        @Body({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @User() user: UserInfo,
        @Body({
            destination: "file"
        }) file?: string,
        @Files({
            config: {
                name: "file",
                maxCount: 1,
                types: ["jpg", "pdf", "png", "zip"]
            },
            schema: z.any().optional(),
            destination: "file",
            mapToBody: true,
            moveFilesToCDN: {
                name: "file",
                config: {
                    path: "ticketing/",
                    customServer: async function () {
                        try {
                            var cdnRepo = new FileManagerConfigRepository()
                            var conf = await cdnRepo.findOne({
                                isDefaultContent: true
                            })
                            if (conf == null) {
                                return ConfigService.getConfig("TEMP_FILEMANAGER")
                            }
                            return conf

                        } catch (error) {
                            return ConfigService.getConfig("TEMP_FILEMANAGER")
                        }
                    }
                }
            },
            isOptional: true
        }) files?: any,

        state?: any
    ): Promise<Response> {
      
        if (messages) {
            for (let i = 0; i < messages.length; i++) {
                messages[i].from = 'user'
                messages[i].user = user.id
            }
            if (file != "") {
                try {
                    messages[0]['files'] = [{
                        path: file,
                        size: files[0].size / 1000
                    }]
                } catch (error) {
    
                }
            }
        }
        var query: any = {
            $push: { messages: messages },
            $set: {
                lastMessage: 'user',
                lastModified: new Date(),
                stateNumber: 1,
                user: user.id
            },
            $unset: {
                closeDate: 1
            }
        }
        if (state) {
            query["$set"]["state"] = state
        }
        return await this.editById(id, query)
    }

    @Get("s/count")
    async getCountByState(@User() user: UserInfo): Promise<Response> {
        try {
            return {
                status: 200,
                data: await this.repository.getCountByState({
                    user: user.id
                })
            }
        } catch (error) {
            throw error
        }
    }


    @Get("/search/list")
    public getSearchList(): Response {
        return {
            status: 200,
            data: Object.assign(this.searchFilters, {
                user: ["eq"]
            })
        }
    }


    public async search(page: number, limit: number, reqQuery: any, @User() user: UserInfo): Promise<Response> {
        var query = await this.searchHelper(reqQuery)
        return await this.paginate(page, limit, query, {
            sort: this.getSort(reqQuery)
        }, user)
    }

    paginate(page: number, limit: number, query?: FilterQuery<Ticket>, options?: QueryInfo | undefined, @User() user?: UserInfo): Promise<Response> {
        if (user) {
            if (!query) {
                query = {}
            }
            query.user = user.id
        }
        return super.paginate(page, limit, query, options)
    }

    async moveFilesToCDN(): Promise<Response> {
        // console.log("here")
        return {
            next: true
        }

    }

    initApis(): void {
        super.initApis()
        this.addRouteWithMeta("/search", "get", this.search.bind(this), BaseController.searcheMeta)
        this.addPreExecs("/message", "post", this.moveFilesToCDN.bind(this))
    }
}



var ticket = new TicketController("/ticket", new TicketRepository(), {
    insertSchema: z.object({
        "notes": z.string(),
        "importance": z.number().default(1),
        "subject": z.string(),
        "owner": z.string().default("user"),
        "user": BaseController.id,
        "department": BaseController.id,
        "messages": z.array(z.object({
            text: z.string(),
            files: z.array(z.string())
        }).omit({
            "files": true
        })),
        "lastMessage": z.string().default("user"),
        "starter": z.string().default("user")
    }),
    searchFilters: {
        department: ["eq"],
        state: ["eq", "list"],
        importance: ["eq", "lte", "gte", "list"],
        subject: ["reg", "eq"],
        ticketNumber: ["eq", "lte", "gte"],
        lastModified: ["gte", "lte"]
    },
    apiDoc: {
        security: [{
            BasicAuth: []
        }]
    }
})
export default ticket