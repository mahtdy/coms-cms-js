import { Document, model, Schema, Types } from "mongoose";


export default interface LanguageCommentConfig extends Document {
    "ungegistered-user-comment": boolean,
    "min-comment-delay": number,
    "min-comment-delay-unit": "minute" | "second" | "hour",
    "max-comment-character": number,
    "max-comment-show-limit": number,
    "template": string,
    "captcha": boolean,
    "captcha-type": "google" | "cload" | "system",
    "comment-reply": boolean,
    "comment-rate": boolean,
    "comment-submit-without-confirm": boolean,
    "comment-show-sort": "oldest" | "latest"
    "comment-policy": string,

    "validate-phone"?: boolean,
    "show-auto-signup"?: boolean,
    "email"?: boolean,
    "atach"?: boolean,
    "allowd-file-types"?: string[],
    "atach-size"?: number,
    "atach-size-unit"?: "MB" | "KB",
    "atach-count"?: number,
    "upload-path": {
        fileManager: string,
        path: string
    },

    "like-type": "like-dislike" | "like",

    //editor
    "editor"?: boolean,
    "external-link-type"?: "follow" | "nofollow",
    "editor-upload-path": {
        fileManager: string,
        path: string
    },
    "editor-upload-types"?: string[],
    "editor-upload-size"?: number,
    "editor-upload-unit"?: "MB" | "KB"
    "image-width"?: number



    language: string | Types.ObjectId
}

const languageCommentSchema = new Schema({
    "ungegistered-user-comment": {
        type: Boolean
    },
    "min-comment-delay": {
        type: Number
    },
    "min-comment-delay-unit": {
        type: String,
        enum: ["minute", "second", "hour"]
    },
    "max-comment-character": {
        type: Number
    },
    "max-comment-show-limit": {
        type: Number
    },
    "template": {
        type: String
    },
    "captcha": {
        type: Boolean
    },
    "captcha-type": {
        type: String,
        enum: ["google", "cload", "system"]
    },
    "comment-reply": {
        type: Boolean
    },
    "comment-rate": {
        type: Boolean
    },
    "comment-submit-without-confirm": {
        type: Boolean
    },
    "comment-show-sort": {
        type: String,
        enum: ["latest", "oldest", "system"]
    },
    "comment-policy": {
        type: String
    },


    "validate-phone": Boolean,
    "show-auto-signup": Boolean,
    "email": Boolean,
    "atach": Boolean,
    "allowd-file-types": [String],
    "atach-size": Number,
    "atach-size-unit": {
        type: String,
        enum: ["MB", "KB"]
    },
    "atach-count": Number,
    "upload-path": new Schema({
        fileManager: String,
        path: String
    }, { _id: false }),


    "like-type": {
        type: String,
        required: true,
        enum: ["like-dislike", "like"],
        default: "like"
    },

    //editor
    "editor": Boolean,
    "external-link-type": {
        type: String,
        enum: ["follow", "nofollow"]
    },
    "editor-upload-path": new Schema({
        fileManager: String,
        path: String
    }, {
        _id: false
    }),
    "editor-upload-types": [String],
    "editor-upload-size": Number,
    "editor-upload-unit": {
        type: String,
        enum: ["MB", "KB"]
    },
    "image-width": {
        type: Number,
        min: 300,
        max: 500
    },


    language: {
        type: Types.ObjectId,
        ref: "language"
    }
})


export const LanguageCommentConfigModel = model<LanguageCommentConfig>("language-comment", languageCommentSchema)