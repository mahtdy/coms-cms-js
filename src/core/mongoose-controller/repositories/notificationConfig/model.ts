import { Document, Schema, model } from "mongoose";



export default interface NotificationConfig extends Document{
    config : any,
    title : string,
    isDefault: boolean
}

var notificationConfigSchema = new Schema({
    config : {
        type : Object,
        required : true
    },
    title : {
        type: String,
        required : true
    },
    isDefault: {
        type : Boolean,
        required : true,
        default : false
    }
})

export var NotificationConfigModel = model<NotificationConfig>("notificationConfig", notificationConfigSchema)