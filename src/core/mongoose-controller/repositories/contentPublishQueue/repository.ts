import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import ContentPublishQueue, { ContentPublishQueueModel } from "./model";


export default class ContentPublishQueueRepository extends BaseRepositoryService<ContentPublishQueue>{
    constructor(options ?: RepositoryConfigOptions){
        super(ContentPublishQueueModel , options)
    }
}