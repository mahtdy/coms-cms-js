import { Document, Schema, Types, model } from "mongoose";


export default interface ContentPublishLog extends Document{
    pageType: string,
    page: Types.ObjectId,
    type: string,
    subId : Types.ObjectId,

    content: string,
    contentLength: string,
    
    date : Date,
    cycle ?: Types.ObjectId
    error ? :any,
}

const contentPublishLogSchema = new Schema({
    pageType: {
        type : String,
        require : true
    },
    page: Types.ObjectId,
    subId : Types.ObjectId,
    
    content : {
        type : String,
        require : true
    },
    date : Date,
    cycle : {
        type: Types.ObjectId,
        required : false
    },
    error : {
        type : Object,
        required : false
    }
})

export const ContentPublishLogModel = model<ContentPublishLog>("content-publish-log" , contentPublishLogSchema)

