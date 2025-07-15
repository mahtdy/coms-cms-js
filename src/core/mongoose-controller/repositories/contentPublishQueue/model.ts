import { Document, Schema, Types, model } from "mongoose";

export default interface ContentPublishQueue extends Document {
    pageType: string,
    page: Types.ObjectId,
    type: string,
    subId : Types.ObjectId,

    content: string,
    contentLength: number,
    
    date : Date,
    cycle ?: Types.ObjectId
    error ? :any,
}


const contentPublishQueueSchema = new Schema({
    pageType: {
        type : String,
        require : true
    },
    page: {
        type: Types.ObjectId,
        refPath : "pageType"
    },
    
    type: {
        type: String, // commonQuestions , content , comment , "commentReply"
        required : false,
    },
    subId : Types.ObjectId,

    content : {
        type : String,
        require : true
    },
    contentLength : {
        type : Number,
        required : false
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

export const ContentPublishQueueModel = model<ContentPublishQueue>("content-publish-queue", contentPublishQueueSchema)