import { Document, Schema, Types, model } from "mongoose";



export default interface InternalMessage extends Document {
    date: Date,
    seen: boolean,
    id: Types.ObjectId | string,
    namespace: string,
    message : string

}

const internalMessageSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: () => new Date()
    },
    seen :{
        type : Boolean,
        required: true,
        default : false
    },
    id: {
        type : Types.ObjectId,
        required: true
    },
    namespace : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    }
})

export  const InternalMessageModel = model<InternalMessage>("internalMessage", internalMessageSchema)