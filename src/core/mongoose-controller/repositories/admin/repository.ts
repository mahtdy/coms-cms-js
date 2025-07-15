import { Document, Model, ObjectId, Types } from "mongoose"
import BaseRepositoryService from "../../repository"
// import Admin, { AdminModel } from "../../database/models/admin"
import bcrypt from "bcrypt";
import SystemConfigRepository from "../../repositories/system/repository"
import CacheService from "../../../cache";
import { BaseAdmin } from "./model";
import RoleRepository from "../role/repository";
import AdminPermissionRepository from "../adminPermission/repository";
import ActionRepository from "../action/repository";
import DBSchemaRepository from "../dbSchema/repository";
import isEqual from "lodash/isEqual";
import { FieldProperty } from "../../controller";
import LanguageRepository from "../language/repository";

var SALT_LENGTH = 15
// import { adminSalt } from "../../config"

import fs from "fs"
import { promisify } from "util";

const readFile = promisify(fs.readFile)


interface AdminOptions<T> {
    salt?: string,
    cache?: CacheService,
    model: Model<T>
}


export default class AdminRepository<T extends BaseAdmin> extends BaseRepositoryService<T> {
    salt?: string

    roleRepo: RoleRepository
    permissionRepo: AdminPermissionRepository
    actionRepo: ActionRepository
    schemaRepo: DBSchemaRepository
    langRepo: LanguageRepository

    constructor(options: AdminOptions<T>) {
        super(options.model, {
            cacheService: options.cache
        })
        this.salt = options.salt

        this.permissionRepo = new AdminPermissionRepository()
        this.actionRepo = new ActionRepository()
        this.schemaRepo = new DBSchemaRepository()
        this.roleRepo = new RoleRepository({
            actions: {

            }
        })
        this.langRepo = new LanguageRepository()
    }


    async translateLanguage(fields: {
        [key: string]: FieldProperty
    }, tableLabel: string, language?: string) {
        if (language) {
            var langMap: any = {}
            try {
                let lang = await this.langRepo.findById(language)
                if (lang?.filePath) {
                    var langJSON = JSON.parse((await readFile(lang.filePath)).toString("utf-8"))
                    langMap = langJSON.paginations
                }

                for (const key in langMap) {
                    if (key == tableLabel) {
                        for (const k in fields) {
                            fields[k].fa_title = langMap[key][k] || fields[k].fa_title
                        }
                    }
                }

                return fields
            } catch (error) {
                console.log(error)
            }
        }
        return fields
    }

    async hashPassword(password: string): Promise<string> {
        try {
            var conf = await new SystemConfigRepository().getConf("password-minimum-length")
            if (conf != null && password.length < conf.value) {
                throw new Error(`minimum password length is ${conf?.value}`)
            }
        } catch (error) {
            throw error
        }
        try {
            return await bcrypt.hash(
                password,
                this.salt || await bcrypt.genSalt(SALT_LENGTH)
            )
        } catch (error) {
            throw error
        }
    }

    async insert(admin: T): Promise<T> {
        try {
            admin.password = await this.hashPassword(admin.password)
        } catch (error) {
            throw error
        }
        return await super.insert(admin)
    }

    async editAdmin(_id: string, data: any) {
        // if(data.phoneNumber){
        let exists = await this.isExists({
            _id: {
                $ne: _id
            },
            $or: [
                {
                    phoneNumber: data.phoneNumber
                },
                {
                    email: data.email
                },
                {
                    userName: data.userName
                }
            ]
        })
        if (exists) {
            throw new Error("دیتای تکراری وارد شده است")
        }
        return this.updateOne({
            _id
        }, {
            $set: data
        })
        // }
    }

    async comparePassword(admin: any, password: string): Promise<Boolean> {
        try {
            return await bcrypt.compare(password, admin.password)
        } catch (error) {
            throw error
        }
    }

    async checkLogin(userName: string, ip: string): Promise<T | null> {
        return this.findOne({
            $and: [
                {
                    $or: [{ userName: userName }, { email: userName }, { phoneNumber: userName }]
                },
                {
                    $or: [{ validIPList: { $in: [ip] } }, { validIPList: { $size: 0 } }, { validIPList: { $exists: false } }]
                }
            ]
        })
    }

    async logIn(id: Types.ObjectId | undefined): Promise<any> {
        return await this.updateOne({
            _id: id
        }, {
            $set: {
                lastLogIn: new Date(Date.now())
            }
        })
    }

    async getAdminAndLogIn(id: Types.ObjectId): Promise<T | null> {
        return await this.findByIdAndUpdate(id, {
            $set: {
                lastLogIn: new Date(Date.now())
            }
        })
    }

    async changePassword(id: Types.ObjectId, password: string): Promise<T | null> {

        try {
            password = await this.hashPassword(password)
        } catch (error) {
            throw error
        }


        try {
            if (await new SystemConfigRepository().isExists({
                key: "allow-repetitious-password",
                value: false
            })) {
                if (await this.isExists({
                    _id: id,
                    $or: [
                        {
                            passwords: password
                        }, {
                            password: password
                        }]
                })) {
                    throw new Error("این رمز قبلا استفاده شده است. لطفا رمز جدید وارد کنید")
                }
            }

            var admin = await this.findById(id, {
                fromDb: true,
                projection: {
                    password: 1
                }
            })
            if (admin == null) {
                throw new Error("این ادمین یافت نشد")
            }
            var currentPassword = admin?.password
        } catch (error) {
            throw error
        }

        try {
            return await this.findByIdAndUpdate(id,
                {
                    $set: {
                        password: password,
                        passwordLastChange: new Date(Date.now()),
                        changePassword: false
                    },
                    $push: {
                        passwords: currentPassword
                    },
                })
        }
        catch (error) {
            throw error
        }

    }

    async getProfile(id: Types.ObjectId | string) {
        try {
            return await this.findById(id, {
                projection: {
                    _id: 1,
                    name: 1,
                    familyName: 1,
                    url: 1
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

    async getAdminLists(id: string, data: string[] = []): Promise<string[]> {
        try {
            var admin = await this.findById(id)
            if (admin?.admins) {
                for (let i = 0; i < admin.admins.length; i++) {
                    var newAdmin = (admin.admins[i] as Types.ObjectId).toHexString()
                    if (!data.includes(newAdmin)) {
                        data.push(newAdmin)
                        data = await this.getAdminLists(newAdmin, data)
                    }

                }
            }
        } catch (error) {
            throw error
        }
        return data
    }



    async getActions(subPart: string, admin: string) {
        try {
            var adminInfo = await this.findById(admin)
            var role = adminInfo?.role


            var actions = await this.getSubPartActions(subPart)

            var p = JSON.parse(JSON.stringify(await this.permissionRepo.findOneWithoutLead({
                admin
            }) || {}))

            var result = await this.roleRepo.getActions(subPart, role as string)
            for (let i = 0; i < actions.length; i++) {
                if (p?.allowedActions?.includes(actions[i]._id)) {
                    let index = result.findIndex((value: any) => {
                        if (value.action._id == actions[i]._id)
                            return true
                    })
                    result[index]['actionEnabled'] = true
                }

            }

            return result

        } catch (error) {
            throw error
        }
    }

    async checkbeforeUpdateActions(admin: string, subPart: string, actions: string[]) {
        try {
            var adminInfo = await this.findById(admin)
            var role = adminInfo?.role as string
            var rolePermisions = JSON.parse(JSON.stringify(await this.roleRepo.permissionRepo.findOne({ role })))
            var allowedActions: string = rolePermisions?.allowedActions || []
            var finalActions: string[] = []
            for (let i = 0; i < actions.length; i++) {
                if (!allowedActions.includes(actions[i])) {
                    finalActions.push(actions[i])
                }
            }
        }
        catch (error) {
            throw error
        }
        return finalActions

    }

    async updateActions(subPart: string, admin: string, actions: string[]) {
        try {
            actions = await this.checkbeforeUpdateActions(admin, subPart, actions)
            var actionIds: string[] = (await this.getSubPartActions(subPart)).map((action: any, i: number) => {
                return action._id
            })
            var toDeleteActions = actionIds.filter((value: string, index: number) => {
                return !actions.includes(value)
            })
            if (! await this.permissionRepo.isExists({ admin })) {
                await this.permissionRepo.insert({
                    admin,
                    allowedActions: actions
                } as any)
            }
            else {
                await this.permissionRepo.updateOne({
                    admin
                }, {
                    $addToSet: {
                        allowedActions: actions
                    },

                })

                await this.permissionRepo.updateOne({
                    admin
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

    async getAdminSchema(admin: string, schema: string, role: string) {
        try {
            let result: string[] = []
            var roleSchema = await this.roleRepo.permissionRepo.findOne({
                role,
                "schemaFilter.dbSchema": schema
            }, {
                projection: {
                    "schemaFilter.$": 1
                }
            })

            result = roleSchema?.schemaFilter[0].allowed || []

            var adminPermission = await this.permissionRepo.findOne({
                admin,
                "schemaFilter.dbSchema": schema
            }, {
                projection: {
                    "schemaFilter.$": 1
                }
            })
            result.push(... (adminPermission?.schemaFilter[0].allowed || []))
            return result
        } catch (error) {
            throw error
        }
    }


    async getSchemas(subPart: string, admin: string) {
        var schemas = await this.getSubPartSchemas(subPart)
        var results: any[] = []

        var adminInfo = await this.findById(admin)
        var role = adminInfo?.role as string || ""


        for (let i = 0; i < schemas.length; i++) {
            // if(role != undefined ){
            //     var rolePermission = await this.roleRepo.
            // }
            var schema = await this.roleRepo.permissionRepo.findOne({
                role,
                "schemaFilter.dbSchema": schemas[i]._id
            }, {
                projection: {
                    "schemaFilter.$": 1
                }
            })


            var fields = await this.getAdminSchema(admin, schemas[i]._id, role)

            if (schema != null) {
                schemas[i]['collectionSchema'] = this.getSchemaPermission(schemas[i]['collectionSchema'], fields)
            }
            else {
                results.push(schemas[i])
            }

        }
        return schemas

    }

    async isSchemaExists(collectionName: string) {
        var schema = await this.schemaRepo.findOne({
            collectionName
        })
        return schema != null
    }

    async getSchemasByCollection(collectionName: string, admin: string, role: string) {
        var schema = await this.schemaRepo.findOne({
            collectionName
        })
        // console.log("schema" , schema)

        return this.getAdminSchema(admin, schema?._id.toHexString(), role)
    }


    preSetSchema(schema: any) {
        for (let key in schema) {
            if (schema[key]?.canEdit == true) {
                schema[key]["visible"] = "0"
                if (schema[key].sub) {
                    schema[key].sub = this.preSetSchema(schema[key].sub)
                }
            }
        }
        return schema
    }

    makeAllVisible(schema: any) {
        for (let key in schema) {
            if (schema[key]?.canEdit == true) {
                schema[key]["visible"] = "1"
                if (schema[key].sub) {
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
                if (schema[key].sub) {
                    schema[key].sub = this.preSetSchema(schema[key].sub)
                }
            }
        }
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].includes(".")) {
                var key = fields[i].split(".")[0]
                var toCheckfields = fields.filter((field) => field.startsWith(key + ".")).map((val) => val.replace(key + ".", ""))
                schema[key].sub = this.getSchemaPermission(schema[key].sub, toCheckfields)
                schema[key].visible = "2"
                fields = fields.filter((field) => !field.startsWith(key + "."))
            }
        }
        for (let i = 0; i < fields.length; i++) {
            if (schema[fields[i]]?.canEdit == true) {
                schema[fields[i]]["visible"] = "1"
                if (schema[fields[i]].sub) {
                    schema[fields[i]].sub = this.makeAllVisible(schema[fields[i]].sub)
                }
            }
        }
        return schema
    }

    async getDiffrenceSchema(admin: string, role: string, schema: string, fields: string[]) {

        var roleSchema = await this.roleRepo.permissionRepo.findOne({
            role,
            "schemaFilter.dbSchema": schema
        }, {
            projection: {
                "schemaFilter.$": 1
            }
        })

        var roleResult = roleSchema?.schemaFilter[0].allowed || []





        fields = fields.filter((value) => !roleResult.includes(value))

        return fields
    }


    async updateSchema(subPart: string, admin: string, schema: string, fields: string[]) {

        try {
            var adminInfo = await this.findById(admin)
            var role = adminInfo?.role as string || ""

            var fields = await this.getDiffrenceSchema(admin, role, schema, fields)

            if (! await this.permissionRepo.isExists({ admin })) {
                await this.permissionRepo.insert({
                    admin
                } as any)
            }

            var isExists = await this.permissionRepo.isExists({
                admin,
                "schemaFilter.dbSchema": schema
            })
            if (isExists)
                return this.permissionRepo.updateOne({
                    admin,
                    "schemaFilter.dbSchema": schema
                }, {
                    $set: {
                        "schemaFilter.$.allowed": fields
                    }
                })

            return this.permissionRepo.updateOne({
                admin
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



    async getPermissionModuleAction(subPart: string, admin: string) {

        try {
            var isAdminPermissionExists = await this.permissionRepo.isExists({
                admin
            })
            if (!isAdminPermissionExists) {
                await this.permissionRepo.insert({
                    admin
                } as any)
            }
            var adminInfo = await this.findById(admin)
            var role = adminInfo?.role as string || ""

            var moduleAction = await this.permissionRepo.findOne({
                admin,
                "moduleAction.subPart": subPart
            }, {
                projection: {
                    "moduleAction.$": 1
                }
            })
            let adminConfig = moduleAction?.moduleAction[0] || {
                config: {},
                subPart
            }
            let roleConfig = await this.roleRepo.getPermissionModuleAction(subPart, role)
            var result: any = {}
            for (const key in roleConfig.config) {
                result[key] = {}
                result[key].value = roleConfig.config[key]
                switch (typeof roleConfig.config[key]) {
                    case "boolean":
                        if (adminConfig.config[key])
                            result[key].value = true

                        if (roleConfig.config[key]) {
                            result[key].fixedData = roleConfig.config[key]
                        }
                        break;

                    case "string":
                        if (adminConfig.config[key])
                            result[key].value = adminConfig.config[key]
                        result[key].fixedData = roleConfig.config[key]
                        break;

                    case "object":
                        if (adminConfig.config[key]?.length) {
                            let adminlst: any[] = adminConfig.config[key]
                            let rolelst: any[] = roleConfig.config[key]
                            let newList = adminlst.filter((value) => {
                                return !rolelst.includes(value)
                            })
                            result[key].value.push(...newList)
                        }
                        result[key].fixedData = roleConfig.config[key]
                        break;

                    default:
                        break;
                }
            }

            return {
                subPart,
                config: result
            }

        } catch (error) {
            throw error
        }

    }




    async setPermissionModuleAction(subPart: string, admin: string, config: any) {
        try {
            var isExists = await this.permissionRepo.isExists({
                admin,
                "moduleAction.subPart": subPart
            })
            var adminInfo = await this.findById(admin)
            var role = adminInfo?.role as string || ""

            let roleConfig = await this.roleRepo.getPermissionModuleAction(subPart, role)

            if (isEqual(roleConfig.config, {})) {
                let defaultConfig = this.roleRepo.actions[subPart]
                for (let i = 0; i < defaultConfig?.length; i++) {
                    roleConfig.config[defaultConfig[i].name] = defaultConfig[i].value
                }
                await this.roleRepo.setPermissionModuleAction(subPart, role, roleConfig.config)
            }
            var result: any = {}
            for (const key in roleConfig.config) {
                switch (typeof roleConfig.config[key]) {
                    case "boolean":
                        if (config[key])
                            result[key] = true
                        break;

                    case "string":
                        if (config[key] && config[key] != roleConfig.config[key])
                            result[key] = config[key]
                        break;

                    case "object":
                        if (config[key]?.length) {
                            let adminlst: any[] = config[key]
                            let rolelst: any[] = roleConfig.config[key]
                            let newList = adminlst.filter((value) => {
                                return !rolelst.includes(value)
                            })
                            result[key] = newList
                        }
                        break;

                    default:
                        console.log("default", key)
                        break;
                }
            }

            if (!isExists) {
                return this.permissionRepo.updateOne({
                    admin
                }, {
                    $push: {
                        moduleAction: {
                            subPart,
                            config: result
                        }
                    }
                })
            }

            console.log("result", result)


            return this.permissionRepo.updateOne({
                admin,
                "moduleAction.subPart": subPart
            }, {
                $set: {
                    "moduleAction.$.config": result
                }
            })


        } catch (error) {
            throw error
        }
    }


}