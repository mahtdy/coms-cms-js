
import { Model } from "mongoose";
import Chat, { ChatModel } from "./model";
import BaseRepositoryService from "../../repository";


export default class ChatRepository extends BaseRepositoryService<Chat> {
    constructor() {
        super(ChatModel)
    }
}      
