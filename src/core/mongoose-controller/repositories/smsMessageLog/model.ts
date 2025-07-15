import { Document, Schema, Types, model } from "mongoose";
import SmsConfig from "../smsConfig/model";
import SmsTemplate from "../smsTemplate/model";



export default interface SmsMessageLog extends Document{
    reciver : string,
    sendDate : Date,
    delivered ?: boolean,
    fialed ?: boolean,
    falureMSG ?: any,
    senderId? : string,
    data : any,
    sender : SmsConfig | string,
    template : SmsTemplate | string,

}

var smsMessageLogSchema =  new Schema({
    reciver : {
        type : String,
        required: true
    },
    sendDate : {
        type : Date,
        required: true
    },
    delivered : {
        type : Boolean,
        required: false
    },
    fialed : {
        type : Boolean,
        required: false
    },
    falureMSG:{
        type : Object,
        required: false
    },
    senderId : {
        type : String,
        required : false
    },
    data : {
        type : Object,
        required : false
    },
    sender : {
        type : Types.ObjectId,
        ref : "smsConfig",
        required: true,
    },
    template : {
        type : Types.ObjectId,
        ref : "smsTemplate",
        required: true,
    }
})

export var SmsMessageLogModel = model<SmsMessageLog>("smsMessageLog",smsMessageLogSchema)