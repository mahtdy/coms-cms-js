
import FileManagerConfigRepository from "../repositories/fileManagerConfig/repository";
import FileManagerConfig from "../repositories/fileManagerConfig/model"
import BaseController, { ControllerOptions } from "../controller";
import { UpdateQuery, Types, FilterQuery } from "mongoose"
import ServerMonitor from "../../services/serverMonitor";
import { Response } from "../../controller";
import { z } from "zod"
import { Body, Query } from "../../decorators/parameters";
import { Get, Post } from "../../decorators/method";
import CDN_Manager from "../../services/fileManager";
import { FTP } from "../../services/cdn/ftp";
import { S3 } from "../../services/cdn/objectStorage";
import { CDN_TransferRepository } from "../repositories/cdnTransfer/repository";
import FileUsesRepository from "../repositories/fileUses/repository";
import DomainVideoConfigRepository from "../repositories/domainVideoConfig/repository";
import DomainImageConfigRepository from "../repositories/domainImageConfig/repository";
import { QueryInfo } from "../repository";


export class FileManagerConfigController extends BaseController<FileManagerConfig> {
    cdnTransferRepo: CDN_TransferRepository
    fileUsesRepo: FileUsesRepository
    cdn: CDN_Manager 
    domainVideoRepo : DomainVideoConfigRepository
    domainImageRepo : DomainImageConfigRepository
    constructor(baseRoute: string, repo: FileManagerConfigRepository, options?: ControllerOptions) {
        if (!options) {
            options = {}
        }
        if (!options.insertSchema) {
            options.insertSchema = z.object({
                title: z.string(),
                type: z.enum(["ftp", "objectStorage"]),
                hostUrl: z.string().url(),
                config: z.any(),
                isDefault: z.boolean().default(false),
                isDefaultContent: z.boolean().default(false),
                totalSize: z.coerce.number().positive(),
                usedSize: z.coerce.number(),
                maxSize: z.coerce.number().int().min(0).default(100),
                filesInfo: z.any(),
                isBackup: z.boolean().default(false),
                status: z.boolean().default(false)
            })
        }
        super(baseRoute, repo, options)
        this.cdnTransferRepo = new CDN_TransferRepository()
        this.fileUsesRepo = new FileUsesRepository()
        this.cdn = new CDN_Manager()
        this.domainImageRepo = new DomainImageConfigRepository()
        this.domainVideoRepo = new DomainVideoConfigRepository()
    };

    async create(data: FileManagerConfig): Promise<Response> {
        data.totalSize *= 1000
        data.usedSize *= 1000


        // if (data.isBackup) {
        //     if (data.isDefault)
        //         return {
        //             status: 400,
        //             message: "سرور بکاپ امکان تنظیم به عنوان سرور فایل پیش‌فرض را ندارد "
        //         }
        //     var conf = data.config
        //     delete data.config
        // }

        var resp = await super.create(data)
        if (resp?.status == 200) {

            if (resp.data?.isDefault)
                await this.repository.updateOne({
                    isDefault: true,
                    _id: {
                        $ne: resp.data?._id
                    }
                }, {
                    $set: {
                        isDefault: false
                    }
                })
      
        }
        return resp
    }

    paginate(page: number, limit: number, query?: FilterQuery<FileManagerConfig>, options?: QueryInfo, ...params: [...any]): Promise<Response> {
        return super.paginate(1, 100 , query ,options)
    }

    async getDefault(): Promise<Response> {
        try {
            var document = await this.repository.findOne({
                isDefault: true
            })
        } catch (error) {
            throw error
        }
        if (document == null) {
            return {
                status: 404,
                message: "یافت نشد"
            }
        }
        var doc = JSON.parse(JSON.stringify(document))
        delete doc["config"]
        return {
            status: 200,
            data: doc,
            message: "موفق"
        }
    }

    async editById(id: string, data: FileManagerConfig): Promise<Response> {
        try {
            var cdnConf = await this.repository.findOne({
                _id: id,
                isBackup: true
            })
            if (cdnConf != null) {
                if (data.isDefault == true)
                    return {
                        status: 400,
                        message: "سرور بکاپ امکان تنظیم به عنوان سرور فایل پیش‌فرض را ندارد "
                    }
                // var config = data.config
                // delete data.config
            }
        } catch (error) {
            throw error
        }

        var resp = await super.editById(new Types.ObjectId(id), {
            $set: data
        } as UpdateQuery<FileManagerConfig>)
        if (resp?.status == 200) {
            if (data.isDefault)
                await this.repository.updateOne({
                    isDefault: true,
                    _id: {
                        $ne: id
                    }
                }, {
                    $set: {
                        isDefault: false
                    }
                })

        }
        return resp
    }


    async delete(id: string | Types.ObjectId): Promise<Response> {
        try {
            if (await this.repository.isExists({
                _id: id,
                isDefault: true
            })) {
                return {
                    status: 400,
                    message: "کانفیگ پیشفرض قابل حذف نیست"
                }
            }

            if (await this.repository.isExists({
                _id: id,
                isInternal: true
            })) {
                return {
                    status: 400,
                    message: "کانفیگ داخلی قابل حذف نیست"
                }
            }

        } catch (error) {
            throw error
        }
        var resp = await super.delete(new Types.ObjectId(id))

        return resp

    }



    @Post("/test")
    async testServer(
        @Body({
            schema: z.object({
                type: z.enum(["ftp", "objectStorage"]),
                config: z.any(),
            })
        })
        config: any
    ): Promise<Response> {
        try {
            // var config = await this.repository.findById(new Types.ObjectId(id))
            if (config == null) {
                return {
                    status: 404,
                    message: "موردی یافت نشد"
                }
            }
            this.cdn.initFromConfig(config)
            let r = await this.cdn.test()
            return {
                status: 200,
                data:true,
                // da
                message: "موفق"
            }
        } catch (error :any) {
            return {
                status: 200,
                data:false,
                // da
                message: error.toString()
            }
            // throw error
        }

    }

    @Get("/validate")
    async validateCDN(
        @Query({
            destination : "id",
            schema : BaseController.id
        }) id : string
    ): Promise<Response>{
        try {
            let imageConfigs = await this.domainImageRepo.findAll({
                "upload-path.fileManager" : id
            })

            let videoConfigs = await this.domainVideoRepo.findAll({
                $or : [
                    {
                        "upload-path.fileManager" : id
                    },
                    {
                        "save-path.fileManager" : id
                    },
                    {
                        "save-paths.fileManager" : id
                    }
                ]
            })

            return {
                data : {
                    ok : imageConfigs.length == 0 && videoConfigs.length == 0,
                    imageConfigs,
                    videoConfigs

                }
            }
        } catch (error) {
            throw error
        }
    }

    @Post("/backup/start")
    async startBackup(
        @Body({
            schema: BaseController.id,
            destination: "backup"
        }) backupID: string,
        @Body({
            schema: BaseController.id,
            destination: "cdn"
        }) cdnID: string,
        @Body({
            schema: z.boolean(),
            destination: "removeAll"
        }) removeAll: boolean
    ): Promise<Response> {
        try {
            let backup = await this.repository.findById(backupID)
            let cdn = await this.repository.findById(cdnID)
            if (backup == null || cdn == null) {
                return {
                    status: 400,
                    message: "سرور بکاپ نامعتبر"
                }
            }

            if (backup.mirrorCDN) {
                return {
                    status: 400,
                    message: "این سرور قبلا برای سرور دیگر رزرو شده است"
                }
            }
            if(backup.backups && backup.backups.length > 0){
                return {
                    status:400,
                    message : "این سرور ب عنوان سرور بکاپ حذف استفاده میشود"
                }
            }

            let CDNSize = cdn.totalSize
            let backupSize = backup.totalSize

            if (removeAll == false || backup.used) {
                backupSize -= backup.usedSize
            }

            console.log(CDNSize , backupSize)

            if (CDNSize > backupSize) {
                return {
                    status: 400,
                    message: "سایز سرور بک آپ کمتر از سرور اصلی می‌باشد"
                }
            }
            try {
                await this.repository.updateOne({
                    _id: backupID
                }, {
                    $set: {
                        mirrorCDN: cdn,
                        used: true,
                        transfered: 0
                    }
                })
            } catch (error) {

            }


            this.moveFiles(cdnID, backup, true, removeAll)
            return {
                status: 200
            }


        } catch (error) {
            console.log("error", error)
            throw error

        }
    }

    @Post("/move/start")
    async startMove(
        @Body({
            schema: BaseController.id,
            destination: "to"
        }) to: string,
        @Body({
            schema: BaseController.id,
            destination: "cdn"
        }) cdnID: string,
        @Body({
            schema: z.boolean(),
            destination: "removeAll"
        }) removeAll: boolean
    ): Promise<Response> {
        try {
            let backup = await this.repository.findById(to)
            let cdn = await this.repository.findById(cdnID)

            console.log(cdn)
            if (backup == null || cdn == null) {
                return {
                    status: 400,
                    message: "سرور بکاپ نامعتبر"
                }
            }

            let CDNSize = cdn.usedSize
            let backupSize = backup.totalSize

            if (removeAll == false || backup.used) {
                backupSize -= backup.usedSize
            }

            if (CDNSize > backupSize) {
                return {
                    status: 400,
                    message: "سایز سرور بک آپ کمتر از سرور اصلی می‌باشد"
                }
            }


            this.moveFiles(cdnID, backup, true, removeAll)
            return {
                status: 200
            }


        } catch (error) {
            console.log("error", error)
            throw error

        }
    }

    @Post("/backup/reset")
    async resetBackup(
        @Body({
            destination: "name",
            schema: z.string()
        })
        name: string
    ): Promise<Response> {
        return this.editOne({
            title: name
        }, {
            $set: {
                filesInfo: {},
                usedSize: 0,
                used: false
            },
            $unset: {
                mirrorCDN: 1
            }
        })
    }

    @Get("/transfer/runnings")
    async getRunningTransfers(): Promise<Response> {
        try {
            let running: any[] = await this.cdnTransferRepo.findAll({
                status: "running"
            })
            let result: any[] = []
            for (let i = 0; i < running.length; i++) {
                let from = await this.repository.findById(running[i].from)
                let to = await this.repository.findById(running[i].to)
                let total = 0
                for (const key in from?.filesInfo) {
                    total += from['filesInfo'][key]['count']
                }
                let uploaded = to?.transfered || 0

                let p = Math.round((uploaded / total) * 10000) / 100
                if (p > 100) {
                    p = 100
                    uploaded = total
                }
                result.push({
                    id: running[i]._id,
                    from: from?.title,
                    to: to?.title,
                    status: running[i].status,
                    "total": total,
                    "uploaded": uploaded,
                    "percentage": p
                })

            }
            return {
                status: 200,
                data: result
            }
        } catch (error) {
            throw error
        }
    }

    @Get("/transfer/status")
    async getTransferStatus(
        @Query({
            destination: "transferId",
            schema: BaseController.id
        }) transferId: string
    ): Promise<Response> {
        try {
            let transferInfo = await this.cdnTransferRepo.findById(transferId)
            if (transferInfo == null) {
                return {
                    status: 404,
                    message: "عملیات یافت نشد"
                }
            }

            let from = await this.repository.findById(transferInfo.from)
            let to = await this.repository.findById(transferInfo.to)
            let total = 0
            for (const key in from?.filesInfo) {
                total += from['filesInfo'][key]['count']
            }
            let uploaded = to?.transfered || 0
            let p = Math.round((uploaded / total) * 10000) / 100
            if (p > 100) {
                p = 100
                uploaded = total
            }
            console.log(uploaded, total)
            const data = {
                status: transferInfo.status,
                from: from?.title,
                to: to?.title,
                "total": total,
                "uploaded": uploaded,
                "percentage": p
            }

            return {
                status: 200,
                data
            }
        } catch (error) {
            throw error
        }
    }

    async moveFiles(cdnID: string, backupConf: any, isBackup: boolean, removeAll: boolean) {
        try {

            var cdn_transfer = await this.cdnTransferRepo.insert({
                from: cdnID,
                to: backupConf._id,
                isBackup
            } as any)
        } catch (error) {

            await this.repository.updateOne({
                _id: cdnID
            }, {
                $set: {
                    readonly: false
                }
            })

            await this.repository.updateOne({
                _id: backupConf._id
            }, {
                $unset: {
                    used: 1,
                    mirrorCDN: 1
                }
            })
            return
        }

        try {
            let cdn = new CDN_Manager(cdnID)
            await cdn.init()

            await this.repository.updateOne({
                _id: cdnID
            }, {
                $set: {
                    readonly: true
                }
            })

            console.log("backupConf" , backupConf)
            var backUpCDN: FTP | S3
            if (backupConf.type == "ftp") {
                backUpCDN = new FTP(
                    backupConf.config.url,
                    backupConf.config.user,
                    backupConf.config.pass,
                    backupConf.hostUrl,
                    backupConf._id
                )
            }
            else {
                backUpCDN = new S3(
                    backupConf.config.accessKey,
                    backupConf.config.secretKey,
                    backupConf.config.serviceUrl,
                    backupConf.config.bucket,
                    backupConf.hostUrl,
                    backupConf._id
                )
            }
            if (removeAll) {
                let hostUrl = backupConf['hostUrl']
                let isExists = await this.fileUsesRepo.isExists({
                    file: {
                        $regex: new RegExp(hostUrl)
                    }
                })
                if (!isExists) {
                    let mirrorCDN = new CDN_Manager(backupConf._id)
                    await mirrorCDN.init()
                    await mirrorCDN.removeAll()
                }


            }
            await cdn.backup("", backUpCDN)
            await this.repository.updateOne({
                _id: cdnID
            }, {
                $set: {
                    readonly: false
                }
            })
            await this.cdnTransferRepo.updateOne({
                _id: cdn_transfer._id
            }, {
                $set: {
                    finishedAt: new Date(),
                    status: "success"
                }
            })
        } catch (error: any) {
            console.log(error)
            await this.repository.updateOne({
                _id: cdnID
            }, {
                $set: {
                    readonly: false
                }
            })

            await this.repository.updateOne({
                _id: backupConf._id
            }, {
                $unset: {
                    used: 1,
                    mirrorCDN: 1
                }
            })

            let err = typeof error.toJSON == "function" ? error.toJSON() : error
            await this.cdnTransferRepo.updateOne({
                _id: cdn_transfer._id
            }, {
                $set: {
                    finishedAt: new Date(),
                    status: "faild",
                    err
                }
            })
        }
    }

    makeUniform(files: any, cdn: CDN_Manager, directory: string) {
        var results: any[] = []
        if (cdn.type == "ftp") {
            for (let i = 0; i < files.length; i++) {
                if (files[i].name.endsWith(".") || files[i].name.includes("---thumbnail")) {
                    continue
                }
                var id = files[i].type == "d" ? directory + files[i].name + "/" : directory + files[i].name
                if (files[i].path) {
                    id = files[i].path
                    id += files[i].type == "d" && !files[i].path.endsWith("/") ? "/" : ""
                }
                if (files[i].type == "d") {
                    var subFolders = files[i].sub?.filter((f: any) => {
                        return f.type == "d" && !f.name.endsWith(".")
                    }).length
                    var subFiles = files[i].sub?.filter((f: any) => {
                        return f.type != "d" && !f.name.endsWith(".") && !f.name.includes("---thumbnail")
                    }).length

                }
                results.push({
                    id,
                    type: files[i].type == "d" ? "dir" : "file",
                    name: files[i].name,
                    size: files[i].size,
                    date: files[i].date,
                    path: files[i].path,
                    subFolders,
                    subFiles

                })
            }

        }
        else {

            for (let i = 0; i < files.length; i++) {

                if (files[i].name && (files[i].name.includes("---thumbnail"))) {
                    continue
                }

                var names = (files[i].prefix || files[i].name).split("/")
                // var name = files[i].prefix || files[i].name
                var name = files[i].prefix ? names[names.length - 2] : names[names.length - 1]
                var id = files[i].prefix ? directory + name + "/" : directory + name

                if (files[i].path) {
                    id = files[i].path
                    id += files[i].prefix && !files[i].path.endsWith("/") ? "/" : ""
                }

                if (files[i].prefix != undefined) {
                    var subFolders = files[i].sub.filter((f: any) => {
                        return f.prefix != undefined
                    }).length
                    var subFiles = files[i].sub.filter((f: any) => {
                        return f.prefix == undefined && !f.name.includes("---thumbnail")

                    }).length

                }
                results.push({
                    id,
                    type: files[i].prefix ? "dir" : "file",
                    name,
                    size: files[i].size,
                    date: files[i].lastModified,
                    path: files[i].path,
                    subFolders,
                    subFiles
                })
            }
        }
        return results
    }

    initApis(): void {
        super.initApis()
        this.addRouteWithMeta("", "put", this.editById.bind(this), {
            "1": {
                index: 0,
                source: "query",
                destination: "id",
                schema: BaseController.id
            },
            "2": {
                index: 1,
                source: "body",
                schema: this.insertSchema
            }
        })

        this.addRouteWithMeta("", "get", this.findById.bind(this), {
            "1": {
                index: 0,
                source: "query",
                destination: "id",
                schema: BaseController.id
            }
        })
        this.addRouteWithMeta("/default", "get", this.getDefault.bind(this), {
        })


    }

}

var fileManager = new FileManagerConfigController("/fileManagerConfig", new FileManagerConfigRepository(), {

})

export default fileManager

