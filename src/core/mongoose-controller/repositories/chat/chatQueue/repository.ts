import ChatQueue, { ChatQueueModel } from "./model";
import BaseRepositoryService from "../../../repository";
// import CacheService from "../"


export default class ChatQueueRepository extends BaseRepositoryService<ChatQueue> {
    constructor() {
        super(ChatQueueModel, {
            // cacheService: new CacheService("chatQueue")
        })
    }
}      
