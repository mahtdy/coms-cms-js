import CDN_Manager, { DiskFileManager } from "./fileManager"
import BackupRepository from "../mongoose-controller/repositories/backup/repository"
import BackupLogRepository from "../mongoose-controller/repositories/backupLog/repository"
import fs from "fs"
import BackupLog from "../mongoose-controller/repositories/backupLog/model"
import FileManagerConfigRepository from "../mongoose-controller/repositories/fileManagerConfig/repository"

const { PostgreSql, MongoDb } = require('@shagital/db-dumper');
import { exec } from 'child_process';
import RandomGenarator from "../random";
import { zip } from 'zip-a-folder';

// import SmsMessager from "../messaging/smsMessager"
import ConfigService from "./config"
import Backup from "../mongoose-controller/repositories/backup/model"
import path from "path"

export function incrementalBackUp(name: string) {

}

export default class BackUpService {
    constructor() {
        ;
    }
    async makeFullBackUp() {

    }

    getDBConfig() {
        let baseurl = ConfigService.getConfig("DB_URL")
        let url = new URL(baseurl)
        // console.log(url)
        return {
            type: "mongodb",
            database: url.pathname.replace("/", ""),
            username: ConfigService.getConfig("DB_USER"),
            password: ConfigService.getConfig("DB_PASSWORD"),
            host: url.hostname,
            port: url.port,
            auth_db: "admin"
        }
    }

    removeDBDump(DB_Name: string) {
        try {
            DiskFileManager.removeFolder(`dump/${DB_Name}`)
        } catch (error) {
            console.log(error)
            throw error
        }

    }
    async makeBackup(backup: Backup) {
        try {
            let dir_name = Date.now().toString()
            let temp_dir = `temp/${dir_name}/`
            await DiskFileManager.mkdir("temp/", dir_name)
            if (backup.backupType == "database" || backup.backupType == "full") {
                let config = backup.isInternalDB ? this.getDBConfig() : backup.dbConfig
                let db_path = await this.makeDataBaseBackup(config)

                await DiskFileManager.mkdir(temp_dir, "db")

                await DiskFileManager.move(db_path , `${temp_dir}db/` )

            }

            if(backup.backupType == "full" || backup.backupType == "source"){
                await DiskFileManager.mkdir(temp_dir, "source")
                await this.copySource(`${temp_dir}source/`)
            }

            let result = await this.zipFolder(temp_dir,`temp/${dir_name}.zip`)
            await DiskFileManager.removeFolder(temp_dir)
            return result
        } catch (error) {
            throw error
        }
    }


    async copySource(destination : string){
        try {
            
            await DiskFileManager.copyFolder("src/" , destination )
            await DiskFileManager.copyFolder("sitemap/" , destination )
            await DiskFileManager.copyFolder("build/" , destination )
            await DiskFileManager.copyFolder("cms-show/" , destination )
            await DiskFileManager.copyFolder("angular/" , destination )
            await DiskFileManager.copy(".env" , destination )
        } catch (error) {
            throw error
        }
    }




    async makeDataBaseBackup(dbConfig: any) {
        try {
            if (dbConfig.type == 'mongodb') {


                var cmd = [
                    "'mongodump'",
                    '--db ' + dbConfig.database,
                    "--username '" + dbConfig.username + "'",
                    "--password '" + dbConfig.password + "'",
                    '--host ' + dbConfig.host,
                    '--port ' + dbConfig.port,
                    '--authenticationDatabase ' + dbConfig.auth_db
                ].join(" ")
                await this.executeCommand(cmd)


                return `dump/${dbConfig.database}/`


            }

            else if (dbConfig.type == 'postgresql') {
                var cmd = [
                    `export PGPASSWORD='${dbConfig.password}';`,
                    "pg_dump",
                    '-E UTF8',
                    '-d ' + dbConfig.database,
                    '-h ' + dbConfig.host,
                    '-p ' + dbConfig.port,
                    "-U '" + dbConfig.username + "'",
                    "-f dump/" + dbConfig.database + ".sql"
                ].join(" ")
                await this.executeCommand(cmd)


                return `dump/${dbConfig.database}.sql`

            }
            throw new Error("invalid db")
        }
        catch (error) {
            console.log("error backup")
            throw error
            // console.log(error)
        }

    }

    async restoreDatabase(dbConfig: any, backupPath: string) {
        try {
            if (dbConfig.type == 'mongodb') {
    
                const cmd = [
                    "'mongorestore'",
                    '--db ' + dbConfig.database,
                    "--username '" + dbConfig.username + "'",
                    "--password '" + dbConfig.password + "'",
                    '--host ' + dbConfig.host,
                    '--port ' + dbConfig.port,
                    '--authenticationDatabase ' + dbConfig.auth_db,
                    // '--drop',
                    backupPath // Path to the backup
                ].join(" ");
    
                await this.executeCommand(cmd);
                console.log(`MongoDB database ${dbConfig.database} restored successfully from ${backupPath}`);
                return true;
    
            } else if (dbConfig.type == 'postgresql') {
                const cmd = [
                    `export PGPASSWORD='${dbConfig.password}';`,
                    "psql",
                    '-d ' + dbConfig.database,
                    '-h ' + dbConfig.host,
                    '-p ' + dbConfig.port,
                    '-U ' + dbConfig.username,
                    '-f ' + backupPath
                ].join(" ");
    
                await this.executeCommand(cmd);
                console.log(`PostgreSQL database ${dbConfig.database} restored successfully from ${backupPath}`);
                return true;
            }
            throw new Error("invalid db type for restore");
        } catch (error) {
            console.log("error during restore");
            throw error;
        }
    }
    
    
    

    async zipFolder(folder: string, name: string) {
        // var password = RandomGenarator.generateHashStr(25)

        // let cmd = [
        //     "'zip'",
        //     // '--password ' + password,
        //     "-r " + name,
        //     folder
        // ].join(" ")
        // await this.executeCommand(cmd)
        await zip(folder, name);

        return {
            path: name,
            // password,
            file: path.basename(name)
        }
    }


    async executeCommand(command: string) {
        return new Promise((resolve, reject) => {
            console.log(command)
            exec(command, (err, stdout, stderr) => {
                if (err) {
                    console.log(err)
                    console.log("reject")
                    reject()
                }
                else
                    resolve(true)
            })
        })

    }

}