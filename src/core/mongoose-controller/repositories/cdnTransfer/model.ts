import { Schema, Types, model } from "mongoose";
import { Document } from "mongoose";



export default interface CDN_Transfer extends Document {
    from: string,
    to: string,
    startAt: Date,
    finishedAt?: Date,
    isBackup: boolean,
    status: "running" | "success" | "faild",
    err?: any
}

const cdnTransferSchema = new Schema({
    from: {
        type: Types.ObjectId,
        required: true
    },
    to: {
        type: Types.ObjectId,
        required: true
    },
    startAt: {
        type: Date,
        required: true,
        default: () => new Date()
    },
    finishedAt : {
        type : Date,
        required : false
    },
    isBackup: {
        type: Boolean,
        required : true,
        default : false
    },
    status: {
        type : String,
        required : true,
        enum : ["running" , "success" , "faild"],
        default : "running"
    },
    err : {
        type : Object,
        required : false
    }
})

export const CDN_Transfer_Model =  model<CDN_Transfer>("cdn_transfer",cdnTransferSchema)