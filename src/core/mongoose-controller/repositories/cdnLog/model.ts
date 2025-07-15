
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId


export default interface CdnLog extends Document {
    cdn: string,
    type: string,
    date: Date,
    files: string[],
    operation: string,
    info: any,

}

const cdnLogSchema = new Schema({
    cdn: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: () => {
            return new Date()
        }
    },
    files: {
        type: [String],
        required: true
    },
    operation: {
        type: String,
        required: true
    },
    info: {
        type: Object,
        required: true
    },
})


export const CdnLogModel = model<CdnLog>('cdnLog', cdnLogSchema)

