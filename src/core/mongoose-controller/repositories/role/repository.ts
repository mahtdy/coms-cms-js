import { Types } from "mongoose";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import ActionRepository from "../action/repository";
import DBSchemaRepository from "../dbSchema/repository";
import RolePermissionRepository from "../rolePermission/repository";
import Role, { RoleModel } from "./model";
import { ModuleAction } from "../../controllers/role";



export default class RoleRepository extends BaseRepositoryService<Role>{
    permissionRepo: RolePermissionRepository
    actionRepo: ActionRepository
    schemaRepo: DBSchemaRepository
    actions: {
        [x: string]: ModuleAction[]
    }
    constructor(options: RepositoryConfigOptions & {
        actions: {
            [x: string]: ModuleAction[]
        }
    }) {
        super(RoleModel, options)
        this.actions = options.actions
        this.permissionRepo = new RolePermissionRepository()
        this.actionRepo = new ActionRepository()
        this.schemaRepo = new DBSchemaRepository()
        this.setPopulation([{
            path : "parent"
        }])
    }

    async insert(document: Role): Promise<Role> {
        var role = await super.insert(document)
        try {
            this.permissionRepo.insert({
                role,

            } as any)
        } catch (error) {

        }
        return role
    }

    async merge(roles: string[], role: Role) {
        try {
            var r = await this.insert(role)

            var actions: string[] = []
            var schemas: {
                dbSchema: string,
                allowed: string[]
            }[] = []
            var rolePermisions = await this.permissionRepo.findAll({
                role: {
                    $in: roles
                }
            })

            for (let i = 0; i < rolePermisions.length; i++) {
                var thisactions = rolePermisions[i].allowedActions
                var thisschemas = rolePermisions[i].schemaFilter
                for (let j = 0; j < thisactions.length; j++) {
                    if (!actions.includes((thisactions[j] as Types.ObjectId).toHexString())) {
                        actions.push((thisactions[j] as Types.ObjectId).toHexString())
                    }
                }
                for (let j = 0; j < thisschemas.length; j++) {
                    let index = schemas.findIndex((value, ind) => {
                        if (value.dbSchema == (thisschemas[j].dbSchema as Types.ObjectId).toHexString())
                            return true
                    })
                    if (index == -1) {
                        schemas.push({
                            dbSchema: (thisschemas[j].dbSchema as Types.ObjectId).toHexString(),
                            allowed: thisschemas[j].allowed
                        })
                    }
                    else {
                        var thisalowed = schemas[index].allowed
                        for (let z = 0; z < thisschemas[j].allowed.length; z++) {
                            if (!thisalowed.includes(thisschemas[j].allowed[z])) {
                                thisalowed.push(thisschemas[j].allowed[z])
                            }
                        }
                        schemas[index].allowed = thisalowed
                    }



                }
            }
            await this.permissionRepo.updateOne(
                {
                    role: r._id
                }, {
                $set: {
                    allowedActions: actions,
                    schemaFilter: schemas
                }

            })
        } catch (error) {
            throw error
        }
    }

    async getSubPartActions(subPart: string) {
        try {
            return JSON.parse(JSON.stringify(await this.actionRepo.findAll({
                subPartName: subPart
            })))

        } catch (error) {
            throw error
        }
    }

    async getSubPartSchemas(subPart: string) {
        try {
            return JSON.parse(JSON.stringify(await this.schemaRepo.findAll({
                subPart
            })))

        } catch (error) {
            throw error
        }
    }


    async getActions(subPart: string, role: string) {
        try {
            var actions = await this.getSubPartActions(subPart)

            var p = JSON.parse(JSON.stringify(await this.permissionRepo.findOneWithoutLead({
                role
            }) || {}))

            var result: any[] = []
            for (let i = 0; i < actions.length; i++) {
                if (p?.allowedActions?.includes(actions[i]._id)) {
                    result.push({
                        actionEnabled: true,
                        action: actions[i]
                    })

                }
                else {
                    result.push({
                        actionEnabled: false,
                        action: actions[i]
                    })
                }
            }

            return result

        } catch (error) {
            throw error
        }
    }


    async updateActions(subPart: string, role: string, actions: string[]) {
        try {
            var actionIds: string[] = (await this.getSubPartActions(subPart)).map((action: any, i: number) => {
                return action._id
            })
            var toDeleteActions = actionIds.filter((value: string, index: number) => {
                return !actions.includes(value)
            })
            if (! await this.permissionRepo.isExists({ role })) {
                await this.permissionRepo.insert({
                    role,
                    allowedActions: actions
                } as any)
            }
            else {
                await this.permissionRepo.updateOne({
                    role
                }, {
                    $addToSet: {
                        allowedActions: actions
                    },

                })

                await this.permissionRepo.updateOne({
                    role
                }, {
                    $pull: {
                        allowedActions: {
                            $in: toDeleteActions
                        }
                    }

                })

            }
        } catch (error) {
            throw error
        }
    }


    async getSchemas(subPart: string, role: string) {
        var schemas = await this.getSubPartSchemas(subPart)
        var results: any[] = []
        for (let i = 0; i < schemas.length; i++) {
            var schema = await this.permissionRepo.findOne({
                role,
                "schemaFilter.dbSchema": schemas[i]._id
            }, {
                projection: {
                    "schemaFilter.$": 1
                }
            })
            if (schema != null) {
                schemas[i]['collectionSchema'] = this.getSchemaPermission(schemas[i]['collectionSchema'], schema?.schemaFilter[0].allowed)
            }
            else {
                results.push(schemas[i])
            }
            // return  schema
            schemas[i]

        }
        return schemas

    }

    preSetSchema(schema :any){
        for (let key in schema) {
            if (schema[key]?.canEdit == true) {
                schema[key]["visible"] = "0"
                if(schema[key].sub){
                    schema[key].sub = this.preSetSchema(schema[key].sub)
                }
            }
        }
        return schema
    }


    makeAllVisible(schema :any){
        for (let key in schema) {
            if (schema[key]?.canEdit == true) {
                schema[key]["visible"] = "1"
                if(schema[key].sub){
                    schema[key].sub = this.makeAllVisible(schema[key].sub)
                }
            }
        }
        return schema
    }

    getSchemaPermission(schema: any, fields: string[]) {
        for (let key in schema) {
            if (schema[key]?.canEdit == true) {
                schema[key]["visible"] = "0"
               
            }
            if(schema[key].sub){
                schema[key].sub = this.preSetSchema(schema[key].sub)
            }
        }
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].includes(".")) {
                var key = fields[i].split(".")[0]
                var toCheckfields = fields.filter((field) => field.startsWith(key + ".")).map((val) => val.replace(key+"." , ""))
                schema[key].sub = this.getSchemaPermission(schema[key].sub, toCheckfields)
                schema[key].visible = "2"
                fields = fields.filter((field) => !field.startsWith(key + "."))
            }
        }
        for (let i = 0; i < fields.length; i++) {
            if (schema[fields[i]]?.canEdit == true) {
                schema[fields[i]]["visible"] = "1"
                if(schema[fields[i]].sub){
                    schema[fields[i]].sub = this.makeAllVisible(schema[fields[i]].sub)
                }
            }
        }
        return schema
    }


    async updateSchema(subPart: string, role: string, schema: string, fields: string[]) {

        try {

            var isExists = await this.permissionRepo.isExists({
                role,
                "schemaFilter.dbSchema": schema
            })
            if (isExists)
                return this.permissionRepo.updateOne({
                    role,
                    "schemaFilter.dbSchema": schema
                }, {
                    $set: {
                        "schemaFilter.$.allowed": fields
                    }
                })

            return this.permissionRepo.updateOne({
                role
            }, {
                $push: {
                    schemaFilter: {
                        dbSchema: schema,
                        allowed: fields
                    }
                }
            })
        } catch (error) {
            throw error
        }
    }


    async getPermissionModuleAction(subPart : string, role : string){
        try {
            var moduleAction = await this.permissionRepo.findOne({
                role,
                "moduleAction.subPart": subPart
            }, {
                projection: {
                    "moduleAction.$": 1
                }
            }) 
            return moduleAction?.moduleAction[0] || {
                config : {},
                subPart 
            }
        } catch (error) {
            throw error
        }
      
    }


    async setPermissionModuleAction(subPart : string,role : string,config : any){
        try {
            var isExists = await this.permissionRepo.isExists({
                role,
                "moduleAction.subPart" : subPart
            })

            if(!isExists){
                return this.permissionRepo.updateOne({
                    role
                }, {
                    $push: {
                        moduleAction: {
                            subPart,
                            config
                        }
                    }
                })
            }

            return this.permissionRepo.updateOne({
                role,
                "moduleAction.subPart" : subPart
            }, {
                $set: {
                    "moduleAction.$.config": config
                }
            })


        } catch (error) {
            throw error
        }
    }

    
    async getRoles(id : string) : Promise<string[]>{
        var data :string[] = []
        try {
            var childes = await this.findAll({
                parent : id
            })
            for (let i = 0; i < childes.length; i++) {
                data.push(childes[i]._id.toHexString())
                data.push(... await this.getRoles(childes[i]._id.toHexString()))
            }
        } catch (error) {
            throw error
        }
        return data
    }

}