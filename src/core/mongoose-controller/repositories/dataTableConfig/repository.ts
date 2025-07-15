

import DataTableConfig, { DataTableConfigModel } from "./model";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";


export default class DataTableConfigRepository extends BaseRepositoryService<DataTableConfig> {
    constructor(options ?: RepositoryConfigOptions) {
        super(DataTableConfigModel,options)
    }  
}      
