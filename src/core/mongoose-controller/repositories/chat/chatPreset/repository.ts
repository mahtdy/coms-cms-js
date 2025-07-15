import ChatPreset, { ChatPresetModel } from "./model";
import BaseRepositoryService from "../../../repository";
// import CacheService from "../"


export default class ChatPresetRepository extends BaseRepositoryService<ChatPreset> {
    constructor() {
        super(ChatPresetModel, {
            // cacheService: new CacheService("ChatPreset")
        })
    }
}      
