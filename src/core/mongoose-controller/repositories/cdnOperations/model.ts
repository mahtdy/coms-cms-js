import { Document, Schema, Types, model } from "mongoose";

export interface CDN_Operation extends Document {
    operation: "copy" | "copyToOther" | "moveToOther" | "move" | "unzip" | "download-folder" | "zip" | "delete" | "restore" | "hard-delete" | "rename" | "backup-restore",
    admin: Types.ObjectId | string
    cdn: Types.ObjectId | string,
    toCdn?: Types.ObjectId | string
    type: string,
    code: string,
    status: "running" | "failed" | "successed",
    checked: boolean,
    moveToHidden?: boolean
    atachment?: string
    err?: any,
    info?: any
}

const CDN_OperationSchema = new Schema({
    operation: {
        type: String,
        required: true,
        enum: [
            "copy",
            "copyToOther",
            "moveToOther",
            "move",
            "unzip",
            "zip",
            "download-folder",
            "delete",
            "restore",
            "hard-delete",
            "rename",
            "backup-restore"
        ]
    },
    admin: {
        type: Types.ObjectId,
        required: false,
        ref: "admin"
    },
    cdn: {
        type: Types.ObjectId,
        required: true,
        ref : "fileManagerConfig"
    },
    toCdn: {
        type: Types.ObjectId,
        required: false,
        ref : "fileManagerConfig"
    },
    type: {
        type: String,
        required: false
    },
    code: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["running", "failed", "successed"],
        default: "running"
    },
    checked: {
        type: Boolean,
        required: true,
        default: false
    },
    moveToHidden: {
        type: Boolean,
        required: false
    },
    atachment: {
        type: String,
        required: false
    },
    err: {
        type: Object,
        required: false
    },
    info: {
        type: Object,
        required: false
    }
})


export const CDN_OperationModel = model<CDN_Operation>("cdn_operation", CDN_OperationSchema)
