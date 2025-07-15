import { Document, Schema, model } from "mongoose";


export default interface TranslationLog extends Document{
    all : number,
    translated: number,
    translation: any,
    fileLocate: string,
    source : string,
    destination : string,
    status: "error" | "success" | "pending"
}

const translationLogSchema = new Schema({
    all: {
        type: Number,
        required : true
    },
    translated:{
        type: Number,
        required: true
    },
    translation : {
        type: Object,
        required: true
    },
    fileLocate:{
        type: String,
        required: true,
        enum : ["panel","server"]
    },
    source : {
        type: String,
        required : true
    },
    destination : {
        type: String,
        required : true
    },
    status:{
        type: String,
        required: true,
        enum : ["error","success","pending"],
        default : "pending"
    },
})

export const TranslationLogModel = model<TranslationLog>("translationLog", translationLogSchema)
