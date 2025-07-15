import { Document, Schema, Types, model } from "mongoose";



export default interface RecycleBin extends Document{
    config : Types.ObjectId | string,
    path : string,
    original : string
}

const recycleBinSchema = new Schema({
    config : {
        type : Types.ObjectId,
        required : true
    },
    path : {
        type : String,
        required : true
    },
    original : {
        type : String,
        required : true
    }
})

export const RecycleBinModel = model<RecycleBin>("recycle-bin" ,recycleBinSchema)