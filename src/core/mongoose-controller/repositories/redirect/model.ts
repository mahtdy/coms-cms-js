
import { Schema, model, Document, Types } from "mongoose";
import Language from "../language/model";
import Domain from "../domain/model";
var ObjectId = Types.ObjectId

export default interface Redirect extends Document {
    type: "regex" | "1To1" | "NTo1" | "auto" | "oldToNew" | "important" | "update" |"language" 
    from: string,
    to: string,
    code: 301 |302 |303 |304 |307 |308,
    isAutomatic: boolean,
    external : boolean,
    fromStatic? : boolean,
    toStatic ?: boolean,
    language ? : Types.ObjectId | string | Language,
    regexConfig? : any,
    domain? : string | Domain | Types.ObjectId,
    created : Date
    status: boolean
}

const redirectSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum : ["regex", "1To1", "auto", "oldToNew" , "important" , "update" ,"language"]  ,
        default: "1To1",
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    regexConfig: {
        type: Object,
        required: false
    },
    code: {
        type: String,
        required: true,
        default: "301",
        enum :["301",'302','303','304','307','308']
    },
    isAutomatic: {
        type: Boolean,
        required: true,
        default: false
    },
    external : {
        type : Boolean, 
        required : true,
        default : false
    },
    fromStatic : {
        type : Boolean,
        required : true,
        default : false
    },
    toStatic :{
        type : Boolean,
        required : true,
        default : false
    },
    language : {
         type : Types.ObjectId,
         required : false,
         ref : "language"
    },
    domain: {
        type: Types.ObjectId,
        required: false,
        ref: "domain"
    },
    created: {
        type:Date,
        required : true,
        default : () =>{
            return new Date()
        }
    },
    status: {
        type: Boolean,
        required : true,
        default : true
    }
})


export const RedirectModel = model<Redirect>('redirect', redirectSchema)

