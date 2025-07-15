
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId
// import BaseUser from '../../user/model'


export default interface ChatMessage extends Document {
    chat :Types.ObjectId,
    type: "file" | "text" | "assign"
    from ?: Types.ObjectId,
    clientId ?:string,
    // fromUserID ?: Types.ObjectId,
    fromUser ?:string
    date: string,
    file ?: string
    text?: string,
    size?: number,
    replyId ?: Types.ObjectId,
    isDelivered: boolean
}

const chatMessageSchema = new Schema({
    clientId: {
        type: String,
        required : false
    },
    chat: {
        type: Types.ObjectId,
        required: true
    },
    type : {
        type : String,
        required :true,
        enum : [
            "file",
            "text",
            "assign"
        ]
    },
    from: {
        type: Types.ObjectId,
        required: false,
        ref : "admin"
    },
    fromUser :{
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true,
        default: () => {
            return new Date(Date.now())
        }
    },
    file :{
        type : String,
        required : false
    },
    text: {
        type: String,
        required: false,
    },
    size : {
        type : Number,
        required : false
    },
    replyId: {
        type : Types.ObjectId,
        required : false,
        ref : "chatMessage"
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    }
})


export const ChatMessageModel = model<ChatMessage>('chatMessage', chatMessageSchema)

