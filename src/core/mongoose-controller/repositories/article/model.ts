import { Schema, model, Document, Types } from "mongoose";
// import {  basePageSchema } from "../../basePage";
import { BasePage, basePageSchema } from "../../basePage/model";
import { BaseAdmin } from "../admin/model";
const uniqueValidator = require('mongoose-unique-validator');
import * as _ from 'lodash';


export enum ProccessStatus {
    "inQueue" = 1,
    "inProccess" = 2,
    "finished" = 3,
    "failed" = 4
}

export enum ProccessName {
    "videos" = "videos",
    "content" = "content",
    "images" = "images"
}

export enum ArticleType {
    "general" = "general",
    "gallery" = "gallery",
    "video" = "video",
    "podcast" = "podcast",
    "category_faq" = "category_faq",
    "increamental" = "increamental"
}

export enum ContentType {
    "article" = "article",
    "page" = "page",
}


export default interface Article extends BasePage {
    isLandingPage: boolean,
    // type: "general" | "gallery" | "video" | "podcast" | "category_faq" | "increamental"
    type : string,
    suggestArticles?: {
        status : boolean
        content :  string | Types.ObjectId
    }[],
    contentType: "article" | "page",
    title: string,
    mainImage?: string,
    summary: string,
    content: string,
    proccesses: Proccess[],
    istop: boolean,
    topDate ?: Date,
    needProccess: boolean,
  
}


export interface Proccess extends Document {
    name: string,
    persianName: string,
    status: number,
    problems?: string[]
}

// export interface Video extends Document {
//     mainSrc: string,
//     subTitles?: {
//         hard?: boolean,
//         src: string,
//         info?: any
//     }[],
//     result?: ProccessedVideo[],
//     isProccessed?: boolean
// }

export interface ProccessedVideo extends Document {
    path: string,
    type: string,
    dimension: string,
    size: number,
    basePath: string
}

const ProccessSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ProccessName
    },
    persianName: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true,
        enum: ProccessStatus,
        default: ProccessStatus.inQueue
    },
    problems: {
        type: [String],
        required: false
    }
})

const proccessedVideoSchema = new Schema({
    path: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    dimension: {
        type: String,
        required: false
    },
    size: {
        type: Number,
        required: true
    },
    basePath: {
        type: String,
        required: true
    }
})

let schema = _.cloneDeep(basePageSchema)

export const articleSchema = new Schema(Object.assign(
    {
        isLandingPage: {
            type: Boolean,
            required: true,
            default: false
        },
        type: {
            type: String,
            required: true,
            enum: ArticleType,
            default: ArticleType.general
        },
        suggestArticles: {
            type: [new Schema({
                status : {
                    type : Boolean,
                    required: true
                },
                content :  {
                    type: Types.ObjectId,
                    required : true,
                    ref: "article"
                }
            }, {
                _id : false
            })],
            default : []
        },
        contentType: {
            type: String,
            required: true,
            enum: ContentType,
            default: ContentType.article
        },
        title: {
            type: String,
            required: false,
            unique: true
        },
        mainImage: {
            type: String,
            required: false,
        },
        summary: {
            type: String,
            required: false
        },
        content: {
            type: String,
            required: false
        },
        files: {
            type: [String],
            required: function () {
                return this.type == ArticleType.gallery ||
                    this.type == ArticleType.podcast ||
                    this.type == ArticleType.video
            },
            default: []
        },

        status: {
            type: String,
            required: false,
            enum: [
                ""
            ],
            default: ""
        },

        proccesses: {
            type: [ProccessSchema],
            required: true,
            default: () => {
                return [
                    {
                        name: "content",
                        persianName: "پردازش محتوا"
                    },
                    {
                        name: "videos",
                        persianName: "پردازش ویدیو"
                    },
                    {
                        name: "images",
                        persianName: "پردازش عکس‌ها"
                    }
                ]
            }
        },
        istop: {
            type: Boolean,
            required: true,
            default: false
        },
        topDate : {
            type : Date, 
            required  : false
        },
        needProccess: {
            type: Boolean,
            required: true,
            default: false
        },
        
        module : {
            type:String,
            default : "article"
        }
    }, 
    schema
))

articleSchema.plugin(uniqueValidator, { message: "{PATH} is duplicated" })

export const ArticleModel = model<Article>("article", articleSchema)

// export default new Model

