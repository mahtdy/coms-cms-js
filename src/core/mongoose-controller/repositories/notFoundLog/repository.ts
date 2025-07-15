import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import NotFoundLog, { NotFoundLogModel } from "./model";



export default class NotFoundLogRepository extends BaseRepositoryService<NotFoundLog> {
    constructor(options? : RepositoryConfigOptions){
        super(NotFoundLogModel,options)
    }
} 