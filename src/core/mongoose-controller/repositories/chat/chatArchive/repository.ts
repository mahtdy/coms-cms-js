
import { Model } from "mongoose";
import ChatArchive, { ChatArchiveModel } from "./model";
import BaseRepositoryService from "../../../repository";
// import CacheService from "../cache"


export default class ChatArchiveRepository extends BaseRepositoryService<ChatArchive> {
    constructor() {
        super(ChatArchiveModel, {
            // cacheService: new CacheService("chatArchive")
        })
    }
}      
