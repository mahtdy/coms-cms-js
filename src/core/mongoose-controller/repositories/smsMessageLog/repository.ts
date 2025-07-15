import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import SmsMessageLog, { SmsMessageLogModel } from "./model";


export default class SmsMessageLogRepository extends BaseRepositoryService<SmsMessageLog>{
    constructor(options? : RepositoryConfigOptions){
        super(SmsMessageLogModel, options)
    }
}