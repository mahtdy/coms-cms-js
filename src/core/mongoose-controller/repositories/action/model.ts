import { Document, Schema, model } from "mongoose";



export default interface Action extends Document {
    url: string,
    method: "POST" | "GET" | "PUT" | "DELETE",
    title: string,
    partName: string,
    subPartName?: string,
    partPersion: string,
    subPartPersion?: string,
    description?: string,
    isMainGet?: boolean
}


var actionSchema = new Schema({
    url : {
        type : String,
        required : true
    },
    method : {
        type : String,
        enum: ["POST" , "GET" , "PUT" , "DELETE"],
        required : true
    },
    title : {
        type : String,
        required : true
    },
    partName: {
        type: String,
        required : true
    },
    subPartName: {
        type : String,
        required: false
    },
    partPersion:{
        type : String,
        required : true
    },
    subPartPersion : {
        type : String,
        required : false
    },
    description:{
        type: String,
        required : false
    },
    isMainGet : {
        type : Boolean,
        required : false
    }
})

export const ActionModel = model<Action>("action" , actionSchema) 