
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId
import SmsConfig from '../smsConfig/model'
import { BaseAdmin } from "../admin/model";
import APIKey from "../apiKey/model";


export default interface SmsTemplate extends Document {
    title: string,
    inputs: string[],
    text: string,
    defaultSmsConfig?: SmsConfig | string,
    sendOTP? : boolean,
    id?: number,
    module?: string,
    status: "waiting" | "active" | "inactive",
    isCore: boolean,
    adminCreator ?: BaseAdmin | string,
    apiCreator ?: APIKey | string
}

const smsTemplateSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        inputs: {
            type: [String],
            required: true
        },
        text: {
            type: String,
            required: true
        },
        defaultSmsConfig: {
            type: ObjectId,
            required: false,
            ref: "smsConfig"
        },
        sendOTP :{
            type : Boolean,
            required : true,
            default : false
        },
        id: {
            type: Number,
            required: false
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
    }
)


export const SmsTemplateModel = model<SmsTemplate>('smsTemplate', smsTemplateSchema)

