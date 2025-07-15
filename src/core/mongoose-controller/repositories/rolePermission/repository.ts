import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import RolePermission, { RolePermissionModel } from "./model";



export default class RolePermissionRepository extends BaseRepositoryService<RolePermission>{
    constructor(options ?: RepositoryConfigOptions){
        super(RolePermissionModel, options)
    }
}