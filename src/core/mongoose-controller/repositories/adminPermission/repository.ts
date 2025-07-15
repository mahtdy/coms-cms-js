import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import AdminPermission, { AdminPermissionModel } from "./model";



export default class AdminPermissionRepository extends BaseRepositoryService<AdminPermission>{
    constructor(options ? : RepositoryConfigOptions){
        super( AdminPermissionModel,options)
    }
}