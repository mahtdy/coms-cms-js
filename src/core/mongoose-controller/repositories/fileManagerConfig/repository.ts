
import FileManagerConfig, { FileManagerConfigModel } from "./model";
import BaseRepositoryService, { QueryInfo } from "../../repository";
import fs from "fs"
import { promisify } from "util"
import { Types } from "mongoose";

var writeFile = promisify(fs.writeFile)

export default class FileManagerConfigRepository extends BaseRepositoryService<FileManagerConfig> {
    constructor() {
        super(FileManagerConfigModel)
    }

    async getDefault(): Promise<FileManagerConfig | null> {
        return this.collection.findOne({
            isDefault: true
        })
    }

    async getInertnal() : Promise<FileManagerConfig | null> {
        return this.collection.findOne({
            isInternal : true
        })
    }


   

    async findById(id: string | Types.ObjectId, queryInfo?: QueryInfo | undefined, population?: Object[]): Promise<FileManagerConfig | null> {
        try {
            let data = await super.findById(id, queryInfo, population)
        
            return data

        } catch (error) {
            throw error
        }
    }
}
