import { Document, Schema, Types, model } from "mongoose";
import Category from "../category/model";
import Language from "../language/model";
import Author from "../author/model";

export default interface PublishQueue extends Document{
    categories : Category[] | string[],
    draft: string ,
    type: string,
    language : Language | string,
    author : string | Author,
    isRequest : boolean,

}

const publishQueue =  new Schema({
    categories : {
        type : [Types.ObjectId],
        required: true,
        ref: "category"
    },
    draft : {
        type: Types.ObjectId,
        required: true,
    },
    type: {
        type : String,
        required : true
    },
    language: {
        type: Types.ObjectId,
        required: true,
        ref : "language"
    },
    author: {
        type: Types.ObjectId,
        required: true,
        ref: "author"
    },
    isRequest: {
        type: Boolean,
        required: true,
        default: false
    }
})


export const PublishQueueModel = model<PublishQueue>("publishQueue", publishQueue)