
import { Model } from "mongoose";
import ChatCheckList, { ChatCheckListModel } from "./model";
import BaseRepositoryService from "../../../repository"
// import CacheService from "../cache"


export default class ChatCheckListRepository extends BaseRepositoryService<ChatCheckList> {
    constructor() {
        super(ChatCheckListModel, {
            // cacheService: new CacheService("chatCheckList")
        })
    }
}      
