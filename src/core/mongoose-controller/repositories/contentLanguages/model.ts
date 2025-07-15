import { Document, Schema, Types, model } from "mongoose";



export default interface ContentLanguage extends Document{
    module: string,
    group : {
        content : Types.ObjectId,
        language : Types.ObjectId
    }[]
}


const contentLanguageSchema = new Schema({
    module : String,
    group : {
        type :[ new Schema({
            content : {
                type : Types.ObjectId,
                required : true
            },
            language : {
                type : Types.ObjectId,
                required : true,
                ref : "language"
            }
        })],
        default : []
    }
})


export const ContentLanguageModel = model<ContentLanguage>("content-language", contentLanguageSchema)