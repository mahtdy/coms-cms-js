
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId
import {BaseAdmin} from "../../repositories/admin/model"

enum emailType {
    "smtp" = "smtp",
    "other" = "other"
}

export default interface EmailConfig extends Document {
    title: string,
    host: string,
    config: any,
    port : number,
    status: boolean,
    maker: BaseAdmin,
    isDefault: boolean,
    type: emailType,
    protocolType : "TLS" | "SSL" | "NonSecure"

}

const emailConfigSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true
    },
    port : {
        type: Number,
        required : false
    },
    config: {
        type: Object,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    maker: {
        type: ObjectId,
        required: true,
        ref: "admin"
    },
    isDefault: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: emailType
    },
    protocolType : {
        type : String,
        required : true,
        enum : [
            "TLS" , "SSL" , "NonSecure"
        ]
    }
})


export const EmailConfigModel = model<EmailConfig>('emailConfig', emailConfigSchema)

