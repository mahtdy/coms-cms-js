import { Document, model, Schema, Types } from "mongoose";



export default interface DomainImageConfig extends Document {
    "upload-path": {
        fileManager: string,
        path: string
    },
    "valid-Suffix": string[],
    "image-result-Suffixs": string[],
    "nonConvert-Suffixs": string[],
    "image-addressing": "y-m-d" | "y-m" | "y" | "y-n" | "n" | "y-m-n",
    "convert-main": boolean,
    "compress-main": boolean,
    "compress-quality"?: number,
    "make-phone-image"?: boolean,
    "phone-width": number,
    domain: string | Types.ObjectId,
    "watermark-main": boolean,
    "main-watermark-config"?: Types.ObjectId | string,
    watermark: boolean,
    "watermark-config" ?: Types.ObjectId | string,
    type ?: string 

}

const domainImageSchema = new Schema({
    "upload-path": {
        type: new Schema({
            fileManager: String,
            path: String
        }, {
            _id: false
        })
    },
    "valid-Suffix": {
        type: [String]
    },
    "image-result-Suffixs": {
        type: [String]
    },
    "nonConvert-Suffixs": {
        type: [String]
    },
    "image-addressing": {
        type: String
    },
    "convert-main": {
        type: Boolean
    },
    "compress-main": {
        type: Boolean
    },
    "make-phone-image": {
        type: Boolean,
        required: true,
        default: true
    },
    "compress-quality": {
        type: Number,
        required: true,
        default: 80
    },
    "phone-width": {
        type: Number,
        required: true,
        default: 500,
        min: 300,
        max: 500
    },
    domain: {
        type: Types.ObjectId,
        required: true,
        ref: "domain"
    },
    "watermark-main": {
        type: Boolean
    },
    "main-watermark-config" : {
        type: Types.ObjectId,
        required: false,
        ref : "waterMark"
    },
    watermark: {
        type: Boolean,
        required: true,
        default: false
    },
    "watermark-config" : {
        type : Types.ObjectId ,
        required: false,
        ref : "waterMark"
    },
    type : {
        type: String,
        required : false
    }
})


export const DomainImageConfigModel = model<DomainImageConfig>("domain-image-config", domainImageSchema)