import { Document, Schema, model } from "mongoose";
import Language from "../language/model";




export default interface SeoDraft extends Document {
    id: any,
    type: string,
    language: string |Language,
    categoryLable?: string,
    url ?: string,
    seoTitle ?: string,
    title ? :string, 
    mainKeyWord?: string,
    keyWords?: string[],
}

const seoDraftSchema = new Schema({
    id: {
        type: String,
        required: true
    },   
    type: {
        type: String,
        required: true,
        default: "article"
    },
    language: {
        type: String,
        required: true,
    },
    categoryLable: {
        type: String,
        required: false,
        // enum: [
        //     "content",
        //     "shopping"
        //     // + ...
        // ]
    },
    url: {
        type: String,
        required: false
    },
    seoTitle: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: false,
    },
    mainKeyWord:{
        type: String,
        required: false
    },
    keyWords: {
        type :[String],
        required: false
    }
})

export const SeoDraftModel = model<SeoDraft>("seoDraf", seoDraftSchema)