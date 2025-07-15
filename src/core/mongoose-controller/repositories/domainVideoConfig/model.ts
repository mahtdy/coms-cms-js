import { Document, model, Schema, Types } from "mongoose";



export default interface DomainVideoConfig extends Document {
    "upload-path": {
        fileManager: string,
        path: string
    },
    "editor-upload-size": {
        unit: "MB" | "GB",
        value: number
    },
    "download-size": {
        unit: "MB" | "GB",
        value: number
    },
    "upload-size": {
        unit: "MB" | "GB",
        value: number
    },
    "save-path": {
        fileManager: string,
        path: string
    },
    "quality-persent": number,
    "save-paths": {
        quality: string,
        fileManager: string,
        path: string
    }[],
    "save-main-source": boolean,
    "video-result-Suffixs": string[],
    "valid-Suffix": string[],
    "save-quality": string[],
    "auto-save-quality": boolean,
    watermark?: boolean,
    "watermark-config"?: Types.ObjectId | string,
    domain: string | Types.ObjectId,
    type ?: string
}

const domainVideoSchema = new Schema({
    "upload-path": {
        type: new Schema({
            fileManager: String,
            path: String
        }, {
            _id: false
        })
    },
    "editor-upload-size": {
        type: new Schema({
            unit: {
                type: String,
                enum: ["MB", "GB"]
            },
            value: {
                type: Number,

            }
        }, {
            _id: false
        })
    },
    "download-size": {
        type: new Schema({
            unit: {
                type: String,
                enum: ["MB", "GB"]
            },
            value: {
                type: Number,

            }
        }, {
            _id: false
        })
    },
    "upload-size": {
        type: new Schema({
            unit: {
                type: String,
                enum: ["MB", "GB"]
            },
            value: {
                type: Number,

            }
        }, {
            _id: false
        })
    },
    "save-path": {
        type: new Schema({
            fileManager: String,
            path: String
        }, {
            _id: false
        })
    },
    "quality-persent": {
        type: Number
    },
    "save-paths": {
        type: [new Schema({
            fileManager: String,
            path: String,
            quality: String
        }, {
            _id: false
        })]
    },
    "save-main-source": {
        type: Boolean
    },
    "video-result-Suffixs": {
        type: [String]
    },
    "valid-Suffix": {
        type: [String]
    },
    "save-quality": {
        type: [String]
    },
    "auto-save-quality": {
        type: Boolean
    },
    domain: {
        type: Types.ObjectId,
        required: true,
        ref: "domain"
    },
    watermark: {
        type: Boolean,
        required: true,
        default: false
    },
    "watermark-config": {
        type: Types.ObjectId,
        required: false,
        ref: "video-config"
    },
    type : {
        type:String,
        required: false
    }
})


export const DomainVideoConfigModel = model<DomainVideoConfig>("domain-video-config", domainVideoSchema)