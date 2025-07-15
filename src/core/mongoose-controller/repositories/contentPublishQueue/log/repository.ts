import BaseRepositoryService, { RepositoryConfigOptions } from "../../../repository";
import ContentPublishLog, { ContentPublishLogModel } from "./model";


export default class ContentPublishLogRepository extends BaseRepositoryService<ContentPublishLog>{
    constructor(options? : RepositoryConfigOptions){
        super(ContentPublishLogModel, options)
    }
}