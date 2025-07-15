
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId
export enum SmsServices {
    "kasbarg" = "kasbarg",
    "sms" = "sms",
    "sabapayamak" = "sabapayamak",
    "farapayamak" = "farapayamak",
    "payam-resan" = "payam-resan",
    "mediapayamak" = "mediapayamak",
    "kavenegar" = "kavenegar",
    "parsgreen" = "parsgreen",
    "hiro-sms" = "hiro-sms",
    "niksms" = "niksms",
    "smspanel" = "smspanel",
    "mellipayamak" = "mellipayamak"

}
// payam-resan farapayamak  kasbarg

export default interface SmsConfig extends Document {
    status: boolean,
    title: string,
    lineNumber: string,
    config: any,
    id: SmsServices,
    isDefault: boolean,
    isOTP: boolean
}

const smsConfigSchema = new Schema({
    status: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    config: {
        type: Object,
        required: true
    },
    lineNumber: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        enum: SmsServices
    },
    isDefault: {
        type: Boolean,
        required: true,
        default: false
    },
    isOTP: {
        type: Boolean,
        required: true,
        default: false
    }
})


export const SmsConfigModel = model<SmsConfig>('smsConfig', smsConfigSchema)

