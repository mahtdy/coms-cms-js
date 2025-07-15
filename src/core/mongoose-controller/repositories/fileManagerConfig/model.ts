import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId

export enum FileManagerType {
    "objectStorage" = "objectStorage",
    "ftp" = "ftp"
}
export default interface FileManagerConfig extends Document {
    title: string,
    type: "ftp" | "objectStorage",
    hostUrl: string,
    config: any,
    isDefault: boolean,
    isDefaultContent : boolean,
    isInternal : boolean,
    
    totalSize: number,
    usedSize: number,
    maxSize: number,
    filesInfo: any,
    isBackup: boolean,
    isMirror: boolean,
    status :boolean,
    readonly ?: boolean,
    used ?: boolean,
    mirrorCDN ?: string,
    backups ?: string[] | Types.ObjectId[],
    transfered ?: number
}

const fileManagerConfigSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: FileManagerType
        },
        hostUrl: {
            type: String,
            required: false
        },
        config: {
            type: Object,
            required: false
        },
        isDefault: {
            type: Boolean,
            required: true,
            default: false
        },
        isDefaultContent : {
            type : Boolean,
            required: true,
            default : false
        },
        isInternal : {
            type: Boolean,
            required: false,
        },
        totalSize: {
            type: Number,
            required: false,
            // megabyte
        },
        usedSize: {
            type: Number,
            required: false,
            // megabyte
        },
        maxSize:{
            type: Number,
            required :false
        },
        filesInfo: {
            type: Object,
            required: false
        },
        isBackup: {
            type: Boolean,
            required: true,
            default: false
        },
        status : {
            type: Boolean,
            required : true,
            default : true
        },
        readonly :{
            type : Boolean,
            required : true,
            default : false
        },
        used : {
            type : Boolean,
            required : false,
            default : false
        },
        mirrorCDN : {
            type:  Types.ObjectId,
            required : false,
        },
        backups: {
            type : [Types.ObjectId],
            required : true,
            default : []
        },

        transfered : {
            type: Number,
            required : false
        }
    })


export const FileManagerConfigModel = model<FileManagerConfig>('fileManagerConfig', fileManagerConfigSchema)

