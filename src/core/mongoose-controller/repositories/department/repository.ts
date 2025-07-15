import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import Department, { DepartmentModel } from "./model";




export default class DepartmentRepository extends BaseRepositoryService<Department>{
    constructor(options? :RepositoryConfigOptions) {
        super(DepartmentModel,options)
    }
}