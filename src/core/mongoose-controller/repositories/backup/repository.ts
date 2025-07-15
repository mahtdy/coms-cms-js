
import { Model, Types, UpdateQuery } from "mongoose";
import Backup, { BackupModel } from "./model";
import BaseRepositoryService, { QueryInfo, RepositoryConfigOptions } from "../../repository";
// import schaduler from "../../services."
import schaduler from "../../../services/queue"
import CDN_Manager, { DiskFileManager } from "../../../services/fileManager";
import RandomGenarator from "../../../random";
import { Job } from "agenda";
import BackUpService from "../../../services/backup"
import BackupLogRepository from "../backupLog/repository";
import FileManagerConfig from "../fileManagerConfig/model";
import path from "path";
import extract from "extract-zip";
import fs from "fs";
import mongoose from "mongoose";
import { cwd } from "process";
import ConfigService from "../../../services/config";

// console.log("tts")

function convertIranTimeToUTC(hours: number, minutes: number): {
    hour: string,
    minute: string
} {

    // Create a date object in the Iran timezone (UTC+3:30)
    const iranDate = new Date();
    iranDate.setHours(hours - 3, minutes - 30); // Adjust to UTC

    // Format the output in UTC
    const hour = String(iranDate.getUTCHours()).padStart(2, '0');
    const minute = String(iranDate.getUTCMinutes()).padStart(2, '0');

    return {
        hour,
        minute
    };
}


export default class BackupRepository extends BaseRepositoryService<Backup> {
    cdn: CDN_Manager
    backupLogRepo: BackupLogRepository
    backService: BackUpService
    constructor(options?: RepositoryConfigOptions) {
        super(BackupModel, options)
        this.cdn = new CDN_Manager()
        this.backupLogRepo = new BackupLogRepository()
        this.updateAllBackups()
        this.backService = new BackUpService()
    }


    async doBackup(job: Job) {
        var log
        try {
            let backupId = job.attrs.data["backupId"]
            let backup = await this.findById(backupId)
            if (backup == null)
                return

            log = await this.backupLogRepo.insert({
                backupId: backup._id,
                cdn: backup.cdn as string
            } as any)

            let result = await this.backService.makeBackup(backup)
            this.cdn.CDN_id = backup.cdn as string
            await this.cdn.init(true)

            let stats = await DiskFileManager.stats(result.path)

            let file = await this.cdn.upload(result.path, backup.path + result.file.replace("/", ""))

            try {
                await DiskFileManager.removeFile(result.path)
            } catch (error) {
                
            }

            const logs = await this.backupLogRepo.collection.find({
                backupId: backup._id,
                isDelete: false
            })
                .sort({
                    _id: -1
                })
                .skip(backup.deletionSchedule)


            for (let i = 0; i < logs.length; i++) {
                try {
                    if (logs[i].files.length > 0) {
                        this.cdn.CDN_id = logs[i].cdn as string
                        await this.cdn.init(true)
                    }
                    await this.backupLogRepo.findByIdAndUpdate(logs[i]._id, {
                        $set: {
                            isDelete: true
                        }
                    })
                } catch (error) {

                }
            }

            await this.backupLogRepo.updateOne({
                _id: log._id
            }, {
                $set: {
                    files: [file],
                    status: "proccessed",
                    end: new Date(),
                    fileSize: stats.size
                }
            })

        } catch (error: any) {
            console.log(error)
            if (log != undefined)
                this.backupLogRepo.updateOne({
                    _id: log._id
                }, {
                    $set: {
                        status: "failed",
                        end: new Date(),
                        err: error.message || ""

                    }
                })
        }
    }

    async updateAllBackups() {
        try {
            let backups = await this.findAll({})

            for (let i = 0; i < backups.length; i++) {
                await this.updateBackupJobs(backups[i])
            }
        } catch (error) {

            // throw error
        }
    }

    async deleteBackupJobs(backupId: Types.ObjectId) {
        await schaduler._collection.deleteMany({
            "data.backupId": backupId
        })

    }

    async updateBackupJobs(backup: Backup) {
        try {
            let schedules = this.getJobDefinition(backup)
            await this.deleteBackupJobs(backup._id)
            for (let j = 0; j < schedules.length; j++) {
                schaduler.define(schedules[j].name, this.doBackup.bind(this))
                let r = await schaduler.every(schedules[j].time, schedules[j].name, {
                    backupId: backup._id
                })
            }
        } catch (error) {

        }
    }

    async insert(document: Backup, options?: any): Promise<Backup | any> {
        try {
            let doc = await super.insert(document)
            this.updateBackupJobs(doc)

            return doc
        } catch (error) {
            throw error
        }
    }

    async findByIdAndUpdate(id: Types.ObjectId | string, query: UpdateQuery<Backup>): Promise<Backup | null> {
        try {

            const r = await super.findByIdAndUpdate(id, query)

            const backup = await this.findById(id)
            if (backup != null) {
                this.updateBackupJobs(backup)
            }
            return r
        } catch (error) {
            throw error
        }
    }

    getJobDefinition(doc: Backup) {
        let schedules: any[] = []
        if (doc.periodType == "hourly") {
            let hourly = doc.periodConfig?.hourly
            if (hourly) {
                for (let i = 0; i < hourly.length; i++) {
                    // const element = array[i];
                    let utc = convertIranTimeToUTC(hourly[i].hour, hourly[i].minute)

                    schedules.push({
                        time: `${utc.minute} ${utc.hour} * * *`,
                        name: RandomGenarator.getUniqueId()
                    })

                }
            }
        }

        else if (doc.periodType == "daily") {
            if (doc.periodConfig?.hour != undefined && doc.periodConfig?.minute != undefined) {

                let utc = convertIranTimeToUTC(doc.periodConfig.hour, doc.periodConfig.minute)

                schedules.push({
                    time: `${utc.minute} ${utc.hour} * * *`,
                    name: RandomGenarator.getUniqueId()
                })
            }
        }
        else if (doc.periodType == "weekly") {
            let weekDays = doc.periodConfig?.weekDays
            if (weekDays) {
                let utc = convertIranTimeToUTC(doc.periodConfig?.hour || 0, doc.periodConfig?.minute || 0)

                for (let i = 0; i < weekDays.length; i++) {
                    schedules.push({
                        time: `${weekDays[i]} at ${utc.hour}:${utc.minute}`,
                        name: RandomGenarator.getUniqueId()
                    })
                }
            }
        }
        else {
            let monthly = doc.periodConfig?.monthly
            if (monthly) {
                for (let i = 0; i < monthly.length; i++) {
                    let utc
                    utc = convertIranTimeToUTC(doc.periodConfig?.hour || 0, doc.periodConfig?.minute || 0)
                    // }
                    schedules.push({
                        time: `${utc?.minute} ${utc?.hour} ${monthly[i].day} ${monthly[i].month} *`,
                        name: RandomGenarator.getUniqueId()
                    })
                }
            }
        }

        return schedules
    }

    async getLog(logId: string) {
        return this.backupLogRepo.findById(logId)
    }

    async download(files: string[], cdnConfig: FileManagerConfig) {
        try {
            let dir_name = Date.now().toString()

            let temp_dir = `temp/${dir_name}/`
            await DiskFileManager.mkdir("temp/", dir_name)

            this.cdn.CDN_id = cdnConfig._id
            await this.cdn.init(true)
            let finalFiles = []
            for (let i = 0; i < files.length; i++) {
                let file = files[i].replace(cdnConfig.hostUrl, "")
                await this.cdn.downloadFile(file, `${temp_dir}${path.basename(file)}`)
                finalFiles.push(`${temp_dir}${path.basename(file)}`)
            }
            if (finalFiles.length > 0) {
                return finalFiles[0]
            }
        } catch (error) {
            throw error
        }
    }

    async backupCurrentDatabase() {

        // console.log(`Backup created at ${backupFilePath}`);

        let dbPath = await this.backService.makeDataBaseBackup(this.backService.getDBConfig())
        return dbPath
    }

    async backupAndReplaceData(zipFilePath: string, dir: string) {
        let folderName = path.basename(zipFilePath).split(".")[0]
        let extractPath = `${dir}${folderName}`
        await DiskFileManager.mkdir(dir, folderName);

        console.log(zipFilePath, { dir: cwd() + "/" + extractPath + "/" })
        await extract(zipFilePath, { dir: cwd() + "/" + extractPath + "/" });


        let current_folder = Date.now().toString()
        let current_path = `${dir}${current_folder}/`
        await DiskFileManager.mkdir(dir, current_folder);


        const dbFolderPath = path.join(extractPath, "db");


        let dbConfig = this.backService.getDBConfig()
        if (fs.existsSync(dbFolderPath)) {

            await DiskFileManager.mkdir(current_path, "db");

            let db_path = await this.backupCurrentDatabase();

            await DiskFileManager.move(db_path, `${current_path}db/`)

            await this.makeDateBaseEmpty(`${dbFolderPath}/${dbConfig.database}/`,
                ConfigService.getConfig("excludeDBCollections") || []
                ,);

            await this.backService.restoreDatabase(dbConfig, `${dbFolderPath}/${dbConfig.database}/`)
        } else {
            throw new Error("No 'db' folder found in the zip file.");
        }

        // Cleanup
        await DiskFileManager.removeFile(zipFilePath)
        let paths = zipFilePath.split("/")
        paths.pop()
        await DiskFileManager.removeFolder(paths.join("/") + "/")
        await DiskFileManager.removeFolder(extractPath)

        let result = await this.backService.zipFolder(current_path, `temp/${current_folder}.zip`)
        await DiskFileManager.removeFolder(current_path)
        return result

    }


    async makeDateBaseEmpty(dbFolderPath: string, collectionsToKeep: string[]) {
        const currentDb = mongoose.connection;

        const allCollections = await this.getCollections(currentDb);

        for (const collectionName of allCollections) {

            if (!collectionsToKeep.includes(collectionName)) {
                await currentDb.collection(collectionName).deleteMany({});
                console.log(`Deleted all data from collection: ${collectionName}`);
            }

            else {
                await DiskFileManager.removeFile(`${dbFolderPath}${collectionName}.bson`)
                await DiskFileManager.removeFile(`${dbFolderPath}${collectionName}.metadata.json`)
            }
        }
    }


    async getCollections(db: any): Promise<string[]> {
        const collections = await db.db.listCollections().toArray();
        return collections.map((col: any) => col.name);
    }

    async paginate(query: mongoose.FilterQuery<Backup>, limit: number, page: number, options?: QueryInfo): Promise<{ list: mongoose.Document[] | any[]; count: number; }> {

        try {
            let data = await super.paginate(query, limit, page, options)
            let list: any[] = data.list
            for (let i = 0; i < list.length; i++) {
                // console.log("id", list[i]._id)
                list[i]["lastLog"] = await this.backupLogRepo.findOne({
                    backupId: list[i]._id
                })

                let lst = await this.backupLogRepo.findAll({
                    backupId : list[i]._id
                })
            }
            return data
        } catch (error) {
            throw error
        }

    }

    async deleteById(id: Types.ObjectId | string): Promise<any> {
        try {
            let res = await super.deleteById(id)   
            this.deleteBackupJobs(id as Types.ObjectId)
            return res
        } catch (error) {
            throw error
        }
    }
}


