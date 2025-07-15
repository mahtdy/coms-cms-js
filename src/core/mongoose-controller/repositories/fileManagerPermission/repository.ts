
// import AdminFileManagerPermission, { AdminFileManagerPermissionModel } from "../../database";
import FileManagerPermission, { FileManagerPermissionModel } from "./model";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import AdminRepository from "../admin/repository";
import FileManagerConfigRepository from "../fileManagerConfig/repository";
import { BaseAdmin , adminSchema} from "../admin/model";
import mongoose, { model } from "mongoose";


export default class FileManagerPermissionRepository extends BaseRepositoryService<FileManagerPermission> {
    adminRepo : AdminRepository<BaseAdmin>
    fileManagerConfRepo : FileManagerConfigRepository
    constructor(options?: RepositoryConfigOptions) {
        super(FileManagerPermissionModel , options)
        this.adminRepo = new AdminRepository<BaseAdmin>({
            model:mongoose.models['admin']
        })
        this.fileManagerConfRepo = new FileManagerConfigRepository()
    }
    async insert(document: FileManagerPermission): Promise<FileManagerPermission> {
        try {
            var isAdminExists = await this.adminRepo.isExists({
                _id : document.admin
            }) 
            if(!isAdminExists){
                throw new Error("ادمین نامعتبر")
            }
            var isCdnExists = await this.fileManagerConfRepo.isExists({
                _id : document.cdn
            })
            if(!isCdnExists){
                throw new Error("cdn نامعتبر")
            }
        } catch (error) {
            throw error
        }
        return super.insert(document)
    }
}      
