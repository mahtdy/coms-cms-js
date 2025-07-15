
import { Model } from "mongoose";
import ChatMessage, { ChatMessageModel } from "./model";
import BaseRepositoryService from "../../../repository";


export default class ChatMessageRepository extends BaseRepositoryService<ChatMessage> {
    constructor() {
        super(ChatMessageModel,{
            population : [
                {
                    path: "replyId",
                }
            ]
        })
    }
}      
