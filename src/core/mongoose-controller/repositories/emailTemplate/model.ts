
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId
import EmailConfig from '../emailConfig/model'
import { BaseAdmin } from "../admin/model";
import APIKey from "../apiKey/model";


export default interface EmailTemplate extends Document {
    title: string,
    inputs: string[],
    text: string,
    isHTML :boolean,
    defaultEmailConfig?: EmailConfig | undefined | string,
    module: string,
    status:"waiting" | "active" | "inactive",
    isCore: boolean,
    adminCreator ?: BaseAdmin | string,
    apiCreator ?: APIKey | string,
}

const emailTemplateSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    inputs: {
        type: [String],
        required: true
    },
    text: {
        type: String,
        required: true
    },
    isHTML:{
        type : Boolean,
        required : true,
        default : false
    },
    defaultEmailConfig: {
        type: ObjectId,
        required: false,
        ref: "emailConfig"
    },
    module:
    {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ["waiting", "active", "inactive"],
        default: "waiting",
        required: true
    },
    isCore: {
        type: Boolean,
        required: true,
        default: false
    },
    adminCreator : {
        type: Types.ObjectId,
        ref : "admin",
        required: false
    } ,
    apiCreator : {
        type: Types.ObjectId,
        ref : "apikey",
        required: false
    }
})


export const EmailTemplateModel = model<EmailTemplate>('emailTemplate', emailTemplateSchema)

