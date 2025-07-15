
import SmsLog, { SmsLogModel } from "./model";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";


export default class SmsLogRepository extends BaseRepositoryService<SmsLog> {
    constructor(options?: RepositoryConfigOptions) {
        super(SmsLogModel, options)
    }
}      
