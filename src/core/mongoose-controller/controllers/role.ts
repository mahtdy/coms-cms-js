


// export Role

import { Get, Post, Put } from "../../decorators/method";
import BaseController, { ControllerOptions } from "../controller";
import Role from "../repositories/role/model";
import RoleRepository from "../repositories/role/repository";
import { promise, z } from "zod"
import { Admin, Body, Query, Session } from "../../decorators/parameters";
import { Response } from "../../controller";
import { AdminInfo } from "../auth/admin/admin-logIn";
import AdminRepository from "../repositories/admin/repository";
import { BaseAdmin } from "../repositories/admin/model";
import { QueryInfo } from "../repository";
import { FilterQuery } from "mongoose";
import LanguageRepository from "../repositories/language/repository";
import fs from "fs"
import { promisify } from "util";

const readFile = promisify(fs.readFile)

export interface ModuleAction {
    name: string,
    showTitle: string,
    type: "boolean" | "list" | "autoComplate" | "autoComplateEQ",
    value: any,
    options?: string[],
    related?: string | string[],
    relatedNot?: string | string[]
    optionRelated?: {
        option: string,
        related: string
    },
    autoComplate?: string

}



export class RoleController extends BaseController<Role>{
    adminRepo: AdminRepository<BaseAdmin>
    actions: {
        [x: string]: ModuleAction[]
    }
    langRepo: LanguageRepository
    constructor(baseRoute: string, repo: RoleRepository, options: ControllerOptions & {
        adminRepo: AdminRepository<BaseAdmin>,
        actions: {
            [x: string]: ModuleAction[]
        }
    }) {
        super(baseRoute, repo, options)
        this.adminRepo = options.adminRepo
        this.adminRepo.roleRepo = repo
        this.actions = options.actions
        this.langRepo = new LanguageRepository()
    }


    @Get("/actions")
    async getActions(
        @Query({
            destination: "role",
            schema: BaseController.id
        }) role: string,
        @Query({
            destination: "subPart",
            schema: z.string()
        }) subPart: string,
        @Session() session : any

    ): Promise<Response> {

        try {
            let data =  await this.repository.getActions(subPart, role)

            let langMap: any = {}
            if (session.language) {
                try {
                    let lang = await this.langRepo.findById(session.language)
                    if (lang?.filePath) {
                        var langJSON = JSON.parse((await readFile(lang.filePath)).toString("utf-8"))
                        langMap = langJSON.actions
                    }
                    for (let i = 0; i < data.length; i++) {
                        data[i].action.title = langMap[`${data[i].action.url}&${data[i].action.method}`] || data[i].action.title
                         
                     }
                } catch (error) {
                    console.log(error)
                }
            }
            return {
                status: 200,
                data
            }
        } catch (error) {
            throw error
        }
    }

    schemaTrnaslate(schema: any, path: string, value: string) {
        if (!path.includes(".")) {
            schema[path].persianName = value
        }
        else {

            let paths = path.split(".")
            let first = paths.shift()
            schema[first as string]['sub'] = this.schemaTrnaslate(schema[first as string]['sub'], paths.join("."), value)
        }
        return schema
    }

    @Get("/schemas")
    async getSchemas(
        @Query({
            destination: "role",
            schema: BaseController.id
        }) role: string,
        @Query({
            destination: "subPart",
            schema: z.string()
        }) subPart: string,
        @Session() session :any
    ): Promise<Response> {
        try {
            let data = await this.repository.getSchemas(subPart, role)
            let langMap: any = {}
            
            if (session.language) {
                try {
                    let lang = await this.langRepo.findById(session.language)
                    if (lang?.filePath) {
                        var langJSON = JSON.parse((await readFile(lang.filePath)).toString("utf-8"))
                        langMap = langJSON.schemas
                    }
                    for (let i = 0; i < data.length; i++) {
                        var schemaLang = langMap[data[i].collectionName]
                        for (const key in schemaLang) {
                            data[i].collectionSchema = this.schemaTrnaslate(data[i].collectionSchema, key, schemaLang[key])
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            return {
                status: 200, 
                data
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }


    @Post("/actions")
    async updateActions(
        @Body({
            destination: "role",
            schema: BaseController.id
        }) role: string,
        @Body({
            destination: "subPart",
            schema: z.string()
        }) subPart: string,
        @Body({
            destination: "actions",
            schema: z.array(BaseController.id)
        }) actions: string[],

    ): Promise<Response> {
        try {
            return {
                status: 200,
                data: await this.repository.updateActions(subPart, role, actions)
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    @Post("/schemas")
    async updateSchemas(
        @Body({
            destination: "role",
            schema: BaseController.id
        }) role: string,
        @Body({
            destination: "schema",
            schema: BaseController.id
        }) schema: string,

        @Body({
            destination: "subPart",
            schema: z.string()
        }) subPart: string,
        @Body({
            destination: "fields",
            schema: z.array(z.string())
        }) fields: string[],
    ): Promise<Response> {
        try {
            return {
                status: 200,
                data: await this.repository.updateSchema(subPart, role, schema, fields)
            }
        } catch (error) {

            throw error
        }
    }


    @Post("/merge")
    async merge(
        @Body({
            destination: "roles",
            schema: z.array(BaseController.id)
        }) roles: string[],
        @Body({
            destination: "role",
            schema: z.object({
                name: z.string(),
                parent: BaseController.id.optional()
            })
        }) role: Role
    ): Promise<Response> {
        try {
            return {
                status: 200,
                data: await this.repository.merge(roles, role)
            }

        } catch (error) {
            console.log(error)
            throw error
        }
    }


    @Get("/special/permissions")
    async getSpecialPermission(
        @Query({
            destination: "subPart",
            schema: z.string()
        }) subPart: string,
        @Query({
            destination: "role",
            schema: BaseController.id
        }) role: string,
        @Session() session: any
    ): Promise<Response> {
        let data = this.actions[subPart]
        if (!data)
            return {
                status: 200,
                data: {}
            }
        let config = (await this.repository.getPermissionModuleAction(subPart, role)).config

        let langMap: any = {}
        if (session.language) {
            try {
                let lang = await this.langRepo.findById(session.language)
                if (lang?.filePath) {
                    var langJSON = JSON.parse((await readFile(lang.filePath)).toString("utf-8"))
                    langMap = langJSON.moduleActions[subPart]
                }
                

            } catch (error) {
                console.log(error)
            }
        }

        for (let i = 0; i < data.length; i++) {
            if (config[data[i].name] != undefined)
                data[i].value = config[data[i].name]
            data[i].showTitle = langMap[data[i].name] || data[i].showTitle
        }
        return {
            status: 200,
            data
        }

    }


    @Post("/special/permissions")
    async setSpecialPermission(
        @Body({
            destination: "role",
            schema: BaseController.id
        }) role: string,
        @Body({
            destination: "subPart",
            schema: z.string()
        }) subPart: string,
        @Body({
            destination: "actions",
            schema: BaseController.search
        })
        actions: any,
    ): Promise<Response> {
        try {
            await this.repository.setPermissionModuleAction(subPart, role, actions)
            return {
                status: 200,
                data: {}
            }
        } catch (error) {
            throw error
        }
    }


    async paginate(page: number, limit: number, @Admin() admin?: AdminInfo, @Query({
        // destination : "",
        schema: BaseController.search.optional()
    }) queryParam?: { [x: string]: any; }, query?: FilterQuery<Role>, options?: QueryInfo | undefined): Promise<Response> {
        query = await this.searchHelper(queryParam)
        if (query == undefined) {
            query = {}
        }

        if (!admin?.isSuperAdmin) {
            var roles = await this.repository.getRoles(admin?.role || "")
            if (!query['_id']) {
                query['_id'] = {}
            }
            query['_id']['$in'] = roles
        }
        return super.paginate(page, limit, query)
    }


}




