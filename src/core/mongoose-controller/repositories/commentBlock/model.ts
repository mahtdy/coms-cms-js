import { model } from "mongoose";
import { Schema } from "mongoose";
import { Document } from "mongoose";


export default interface CommentBlock extends Document{
    phone: string,
    blockType:  "temporary" | "permanent",
    enabled: boolean,
    duration ?: number
    durationType? : "hour" | "day" ,
    expire ?: Date
}

const commentBlockSchema = new Schema({
    phone :{
        type: String,
        required : true,
        unique : true
    },
    blockType: {
        type: String,
        required : true,
        enum : ["temporary", "permanent"]
    },
    enabled: {
        type: Boolean,
        required: true,
        default : true
    },
    duration : {
        type : Number,
        required : false,
        min : 0
    },
    durationType : {
        type: String,
        required: true,
        enum : ["hour", "day"]
    },
    expire : {
        type : Date,
        required : false
    }
})

export const CommentBlockModel = model<CommentBlock>("comment-block" ,commentBlockSchema)
