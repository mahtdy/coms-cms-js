import { Document, model, Schema, Types } from "mongoose";

export default interface BackupFile extends Document {
    backCDN: string | Types.ObjectId,
    cdn: string | Types.ObjectId,
    backFile: string,
    cdnFile: string,
    createAt : Date
}


const backupFileSchema = new Schema({
    backCDN: {
        type: Types.ObjectId,
        required: true
    },
    cdn: {
        type: Types.ObjectId,
        required: true
    },
    backFile: {
        type: String,
        required: true
    },
    cdnFile: {
        type: String,
        required: true
    },
    createAt: {
        type : Date,
        required : true,
        default : () => new Date()
    }
})

export const BackupFileModel = model<BackupFile>("backup-file", backupFileSchema)