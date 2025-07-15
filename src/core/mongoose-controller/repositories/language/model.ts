
import { Schema, model, Document, Types } from "mongoose";
import Domain from "../domain/model";
var ObjectId = Types.ObjectId
const uniqueValidator = require('mongoose-unique-validator');


export default interface Language extends Document {
    title: string,
    panelTitle : string,
    sign: string,
    direction: "ltr" | "rtl",
    status: boolean,
    showInLangList : boolean,
    index : boolean,
    translation: object,
    fileURL ?: string,
    panelFileURL? :string,
    filePath ?: any
    panelFilePath ? : any,
    isDomain ?: boolean
    domainCDN ?: boolean,
    domain ?: Domain | Types.ObjectId | string,
    isDefault ?: boolean
    countries : string[]
}

const languageSchema = new Schema({
    title: {
        type: String,
        required: true
    },   
    panelTitle: {
        type: String,
        required: true
    },
    sign: {
        type: String,
        required: true,
        unique: true
    },
    direction: {
        type: String,
        enum : ["rtl", "ltr"],
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    translation: {
        type: Object,
        required: true,
        default : {}
    },
    fileURL: {
        type: String,
        required : false
    },
    panelFileURL:{
        type: String,
        required : false
    },
    filePath: {
        type: String,
        required : false
    },
    panelFilePath:{
        type: String,
        required : false
    },
    isDomain: {
        type: Boolean,
        required: true,
        default: false
    },
    domain : {
        type : Types.ObjectId,
        ref : "domain",
        required : false
    },
    isDefault : {
        type : Boolean, 
        required : true,
        default : false
    },
    domainCDN: {
        type: Boolean,
        required : false,
    },
    showInLangList: {
        type: Boolean,
        required : true,
        default : false
    },
    
    index: {
        type: Boolean,
        required : true,
        default : false
    },
    countries :{
        type: [String],
        required: true,
        default : []
    }
})

languageSchema.plugin(uniqueValidator, { message: "تکراری است {PATH} شناسه" })


export const LanguageModel = model<Language>('language', languageSchema)

