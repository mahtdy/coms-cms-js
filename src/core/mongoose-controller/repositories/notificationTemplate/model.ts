
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId
import { BaseAdmin } from "../admin/model";
import APIKey from "../apiKey/model";
import NotificationConfig from "../notificationConfig/model";


export default interface NotificationTemplate extends Document {
    title: string,
    inputs: string[],
    text: string,
    defaultNotificationConfig?: NotificationConfig | string,
    module?: string,
    status: "waiting" | "active" | "inactive",
    isCore: boolean,
    adminCreator ?: BaseAdmin | string,
    apiCreator ?: APIKey | string,
    messageTitle : string
}

const notificationTemplateSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        messageTitle :{
            type : String,
            required : true
        },
        inputs: {
            type: [String],
            required: true
        },
        text: {
            type: String,
            required: true
        },
        defaultNotificationConfig: {
            type: ObjectId,
            required: false,
            ref: "notificationConfig"
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


export const NotificationTemplateModel = model<NotificationTemplate>('notificationTemplate', notificationTemplateSchema)

