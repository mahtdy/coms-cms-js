import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import ContentQueue, { ContentQueueModel } from "./model";




export default class ContentQueueRepository extends BaseRepositoryService<ContentQueue>{
    constructor(options?: RepositoryConfigOptions) {
        super(ContentQueueModel, options)
    }
}