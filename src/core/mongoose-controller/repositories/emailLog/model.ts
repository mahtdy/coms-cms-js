
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId
import EmailConfig from '../emailConfig/model'


export default interface EmailLog extends Document {
    config: EmailConfig | string,
    result: boolean,
    importance: number,
    failureReason?: string,
    date: Date,

}

const emailLogSchema = new Schema({
    config: {
        type: ObjectId,
        required: true,
        ref: "emailConfig"
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


export const EmailLogModel = model<EmailLog>('emailLog', emailLogSchema)

