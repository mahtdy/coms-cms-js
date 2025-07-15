
import FileManagerConfigAdmin, { AdminCdnPermissionModel } from "./model";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import AdminRepository from "../admin/repository";
import { BaseAdmin } from "../admin/model";
import mongoose from "mongoose";


export default class AdminCdnPermissionRepository extends BaseRepositoryService<FileManagerConfigAdmin> {
    adminRepo : AdminRepository<BaseAdmin>
    constructor(options? : RepositoryConfigOptions) {
        super(AdminCdnPermissionModel , options)
        this.adminRepo = new AdminRepository<BaseAdmin>({
            model:mongoose.models['admin']
        })
        // {
        //     FileManagerConfigAdminModel,  new CacheService("fileManagerConfigAdmin")
        // })
    }

    async insert(document: FileManagerConfigAdmin): Promise<FileManagerConfigAdmin> {
        try {
            
            var isAdminExists = await this.adminRepo.isExists({
                _id : document.admin
            }) 
            if(!isAdminExists){
                throw new Error("ادمین نامعتبر")
            }
            var isdublicate = await this.isExists({
                admin : document.admin
            })
            if(!isAdminExists){
                throw new Error("ادمین تکراری")
            }
        } catch (error) {
            throw error
        }
        return super.insert(document)
    }
}      
