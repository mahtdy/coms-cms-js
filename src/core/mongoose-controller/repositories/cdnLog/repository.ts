
import { Model } from "mongoose";
import CdnLog, { CdnLogModel } from "./model";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";


export default class CdnLogRepository extends BaseRepositoryService<CdnLog> {
    constructor(options ?: RepositoryConfigOptions) {
        super(CdnLogModel,options)
    }  
}      
