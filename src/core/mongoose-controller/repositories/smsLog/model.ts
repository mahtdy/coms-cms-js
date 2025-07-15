
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId
import SmsConfig from '../smsConfig/model'


export default interface SmsLog extends Document {
    config: SmsConfig | string,
    result: boolean,
    importance: number,
    failureReason?: string,
    date: Date,
}

const smsLogSchema = new Schema({
    config: {
        type: ObjectId,
        required: true,
        ref: "smsConfig"
    },
    result: {
        type: Boolean,
        required: true
    },
    importance: {
        type: Number,
        required: true
    },
    failureReason: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: () => {
            return new Date()
        },
        required: true
    },
})


export const SmsLogModel = model<SmsLog>('smsLog', smsLogSchema)

