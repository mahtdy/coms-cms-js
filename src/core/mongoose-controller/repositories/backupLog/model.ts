
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId
import FileManagerConfig from '../fileManagerConfig/model'


export default interface BackupLog extends Document {
    files: string[],
    backupId: Types.ObjectId | string,
    cdn: FileManagerConfig | string | Types.ObjectId,
    status: "inProccess" | "proccessed" | "failed",
    end: Date,
    start: Date,
    err: string,
    fileSize?: number,
    isDelete: boolean,

}

const backupLogSchema = new Schema({
    files: {
        type: [String],
        required: true,
        default: []
    },
    backupId: {
        type: Types.ObjectId,
        required: true,
        ref: "backup"
    },
    status: {
        enum: ["inProccess", "proccessed", "failed"],
        type: String,
        default: 'inProccess',
        required: true
    },
    start: {
        type: Date,
        required: true,
        default: () => new Date()
    },
    end: {
        type: Date,
        required: false
    },
    cdn: {
        type: ObjectId,
        required: true,
        ref: "fileManagerConfig"
    },
    err: {
        type: String,
        required: false
    },
    fileSize: {
        type: Number,
        required: false
    },
    isDelete: {
        type: Boolean,
        required: true,
        default: false
    }
})


export const BackupLogModel = model<BackupLog>('backupLog', backupLogSchema)

