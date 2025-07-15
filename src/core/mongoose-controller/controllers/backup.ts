
import BaseController, { ControllerOptions } from "../controller";
import Backup from "../repositories/backup/model";
import BackupRepository from "../repositories/backup/repository"
import CacheService from "../../cache";
import { z } from "zod"
import { Response } from "../../controller";
import FileManagerConfigRepository from "../repositories/fileManagerConfig/repository";
import fs from "fs"
import { promisify } from "util"
import { Get, Post, Put } from "../../decorators/method";
import { Admin, Body, Query, Session } from "../../decorators/parameters";
import { FilterQuery, Types } from "mongoose";
import { QueryInfo } from "../repository";
import { cwd } from "process";
import { AdminInfo } from "../auth/admin/admin-logIn";
import RandomGenarator from "../../random";
import SmsMessager from "../../messaging/smsMessager";
import { totp } from "speakeasy";
import { DiskFileManager } from "../../services/fileManager";
import { basename } from "path";


export class BackupController extends BaseController<Backup> {
    fileManagerRepo: FileManagerConfigRepository
    constructor(baseRoute: string, repo: BackupRepository, options: ControllerOptions) {
        super(baseRoute, repo, options)
        this.fileManagerRepo = new FileManagerConfigRepository()
        this.population = [{
            path: "cdn",
            select: ["title"]
        }]
    }

    async create(doc: Backup): Promise<Response> {
        try {
            let cdn = await this.fileManagerRepo.findOne({
                isBackup: true,
                status: true,
                _id: {
                    $eq: doc.cdn
                },
                mirrorCDN: {
                    $exists: false
                }
            })

            if (cdn == null) {
                return {
                    status: 400,
                    message: "سرور فایل وارد شده نامعتبر است"
                }
            }

        }
        catch (error) {
            throw error
        }

        return await super.create(doc)
    }

    @Get("/cdn/valids")
    async getValidCdns(): Promise<Response> {
        try {


            let cdns = await this.fileManagerRepo.findAll({
                status: true,
                isBackup: true,
                mirrorCDN: {
                    $exists: false
                }
            }, {
                projection: {
                    title: 1,
                    type: 1
                }
            })
            return {
                data: cdns,
                status: 200
            }

        } catch (error) {
            throw error
        }


    }

    @Get("")
    async find(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string | Types.ObjectId, queryInfo?: QueryInfo): Promise<Response> {
        return super.findOne({
            _id: id
        }, {
            population: [{
                path: "cdn",
                select: ["title"]
            }]
        })
    }

    paginate(page: number, limit: number, query?: FilterQuery<Backup>, options?: QueryInfo, ...params: [...any]): Promise<Response> {
        if (options == undefined) {
            options = {}
        }

        options.population = [{
            path: "cdn",
            select: ["title"]
        }]

        return super.paginate(page, limit, query, options)
    }

    @Put("")
    async update(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Body({
            schema: z.object({
                cdn: BaseController.id.optional(),
                path: z.string(),
                backupType: z.enum(["source", "database", "full"]),
                dbConfig: z.object({
                    type: z.enum(["mongodb", "postgresql"]),
                    host: z.string(),
                    port: z.coerce.number().positive().int(),
                    username: z.string(),
                    password: z.string(),
                    database: z.string(),
                    auth_db: z.string().optional()
                }).optional(),
                isInternalDB: z.boolean().default(true),
                periodType: z.enum(["hourly", "daily", "weekly", "monthly" , "custom"]),
                periodConfig: BaseController.search,
                deletionSchedule: z.coerce.number().int().positive().default(10),
            })
        }) data: Backup
    ): Promise<Response> {
        try {
            let validate = this.validateBackup(data)
            if (validate == false) {
                return {
                    status: 400,
                    message: "اطلاعات وارد شده کامل نیست"
                }
            }

            let cdn = await this.fileManagerRepo.findOne({
                isBackup: true,
                status: true,
                _id: {
                    $eq: data.cdn
                },
                mirrorCDN: {
                    $exists: false
                }
            })

            if (cdn == null) {
                return {
                    status: 400,
                    message: "سرور فایل وارد شده نامعتبر است"
                }
            }

            return this.editById(id, {
                $set: data
            })
        } catch (error) {
            throw error
        }
    }

    validateBackup(data: Backup) {
        if (data.periodType == "hourly") {
            let periodConfig = data.periodConfig
            if (periodConfig?.hourly == undefined || periodConfig.hourly.length == 0) {
                return false
            }
        }

        else if (data.periodType == "daily") {
            let periodConfig = data.periodConfig
            if (periodConfig?.hour == undefined || periodConfig.minute == undefined) {
                return false
            }
        }

        else if (data.periodType == "weekly") {
            let periodConfig = data.periodConfig
            if (periodConfig?.weekDays == undefined || periodConfig.weekDays.length == 0) {
                return false
            }

        }

        else {
            let periodConfig = data.periodConfig
            if (periodConfig?.monthly == undefined || periodConfig.monthly.length == 0) {
                return false
            }
        }

        return true
    }

    async getBackUpServers(): Promise<Response> {
        try {
            var readFile = promisify(fs.readFile)
            return {
                data: JSON.parse(await readFile("./back_up.json", "utf8")),
                status: 200
            }
        } catch (error) {
            throw error
        }
    }

    @Get("/logs")
    async getLogs(
        @Query({
            destination: "backup",
            schema: BaseController.id
        }) backupId: string
    ): Promise<Response> {
        try {
            let backups = await this.repository.backupLogRepo.findAll({
                backupId,
                isDelete: false
            }, {
                sort: {
                    _id: -1
                }
            })
            return {
                status: 200,
                data: backups
            }
        } catch (error) {
            throw error
        }
    }

    @Post("/restore")
    async restore(
        @Body({
            destination: "logId",
            schema: BaseController.id
        }) logId: string,
        @Body(
            {
                destination: "code",
                schema: z.string().default("12345")
            }
        )  code: string,
        @Session() session :any,
        @Admin() admin : AdminInfo
    ): Promise<Response> {
        try {

            if(session["totp_backup"] == undefined){
                return {
                    status : 403,
                }
            }

            if(session["totp_backup"] == "sms"){
                if(code !=  session["totp_backup_random"] 
                || new Date >  session["totp_backup_expire"] ){
                    return {
                        status : 403
                    }
                }
            }

            else if(session["totp_backup"] == "totp"){
                let isVerified = totp.verify({
                    secret: admin.towFactorTocken || "",
                    encoding: "ascii",
                    token: code
                })
        
                if (!isVerified) {
                    return {
                        status : 403,
                    }
                }
            }

            const log = await this.repository.getLog(
                logId
            )
            // console.log(log, logId)
            if (log == null) {
                return {
                    status: 404,
                    message: "not found"
                }
            }

            let cdnConfig = await this.fileManagerRepo.findById(log.cdn)

            if (cdnConfig == null) {
                return {
                    status: 404,
                    message: "cdn found"
                }
            }

            let finalFile = await this.repository.download(log.files, cdnConfig)

            if (finalFile) {
                let current = await this.repository.backupAndReplaceData(finalFile, "temp/")
                await DiskFileManager.move(current.path, "src/uploads/tmp/")
                const rand = RandomGenarator.generateHashStr(25)
                await DiskFileManager.rename("src/uploads/tmp/" +basename(current.path) , `src/uploads/tmp/${rand}.zip`)
                return {
                    status: 200,
                    data: `/uploads/tmp/${rand}.zip`,
                   
                }
            }


            return {
                status: 200
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    @Get("/download", {
        apiDoc: {
            "responses": {
                "200": {
                    "description": "A zip file containing data",
                    "content": {
                        "application/zip": {
                            "schema": {
                                "type": "string",
                                "format": "binary"
                            }
                        }
                    }
                }
            }
        }
    })
    async downloadBackup(
        @Query({
            destination: "logId",
            schema: BaseController.id
        }) logId: string,
        @Query(
            {
                destination: "code",
                schema: z.string().default("12345")
            }
        )  code: string,
        @Session() session :any,
        @Admin() admin :AdminInfo
    ): Promise<Response> {
        try {
            if(session["totp_backup"] == undefined){
                return {
                    status : 403,
                }
            }

            if(session["totp_backup"] == "sms"){
                if(code !=  session["totp_backup_random"] 
                || new Date >  session["totp_backup_expire"] ){
                    return {
                        status : 403
                    }
                }
            }

            else if(session["totp_backup"] == "totp"){
                let isVerified = totp.verify({
                    secret: admin.towFactorTocken || "",
                    encoding: "ascii",
                    token: code
                })
        
                if (!isVerified) {
                    return {
                        status : 403,
                    }
                }
            }

            const log = await this.repository.getLog(
                logId
            )
            if (log == null) {
                return {
                    status: 404,
                    message: "not found"
                }
            }

            let cdnConfig = await this.fileManagerRepo.findById(log.cdn)

            if (cdnConfig == null) {
                return {
                    status: 404,
                    message: "cdn found"
                }
            }


            let finalFile = await this.repository.download(log.files, cdnConfig)

            return {
                status: 200,
                isFilePath: true,
                data: cwd() + "/" + finalFile,
                responseHeader: {
                    "Content-Type": "application/zip"
                },

            }

        } catch (error) {
            throw error
        }

    }

    @Post("/verify")
    async verifyRestore(
        @Admin()admin : AdminInfo,
        @Session() session :any
    ) : Promise<Response>{
        try {
            // console.log( admin)
            if(admin.towFactorTocken){
                session["totp_backup"] = "totp"
                return {
                    status : 200 ,
                    data : {
                        type : "totp",
                    },
                    session
                }
            }

            else {
                let random = RandomGenarator.randomNumber()
                let result = await SmsMessager.send({
                    template : "verifyBackup",
                    parameters : {
                        random
                    },
                    receptor : admin.phoneNumber
                })
                if(result ){
                    session["totp_backup"] = "sms"
                    session["totp_backup_expire"] = new Date(Date.now() + (1000*120))
                    session["totp_backup_random"] = random

                    return {
                        status : 200 ,
                        data : {
                            type : "sms"
                        },
                        session
                    }
                }

                else { 
                    return {
                        status : 500 
                        // session
                    }
                }

            }
        } catch (error) {
            
        }
        return {
            status : 200
        }
    }

    initApis(): void {
        super.initApis()
        this.addRoute("/cdns", "get", this.getBackUpServers.bind(this))
    }
}

var backup = new BackupController("/backup",
    new BackupRepository({
        cacheService: new CacheService("backup")
    }), {
    insertSchema: z.object({
        cdn: BaseController.id.optional(),
        path: z.string(),
        backupType: z.enum(["source", "database", "full"]),
        dbConfig: z.object({
            type: z.enum(["mongodb", "postgresql"]),
            host: z.string(),
            port: z.coerce.number().positive().int(),
            username: z.string(),
            password: z.string(),
            database: z.string(),
            auth_db: z.string().optional()
        }).optional(),

        isInternalDB: z.boolean().default(true),
        periodType: z.enum(["hourly", "daily", "weekly", "monthly" ,"custom"]),
        periodConfig: z.object({
            hour: z.coerce.number().int().min(0).max(23).optional(),
            minute: z.coerce.number().int().min(0).max(59).optional(),
            hourly: z.array(z.object({
                hour: z.coerce.number().int().min(0).max(23).optional(),
                minute: z.coerce.number().int().min(0).max(59).optional(),
            })).optional(),
            weekDays: z.array(z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])).optional(),
            monthly: z.array(z.object({
                month: z.coerce.number().int().min(1).max(11),
                day: z.coerce.number().int().min(1).max(31)
            })).optional()
        }),
        deletionSchedule: z.coerce.number().int().positive().default(10),
    })
}
)

export default backup


