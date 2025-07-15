import { Document, Schema, Types, model } from "mongoose";

export default interface BlockExport extends Document{
    type: string,
    file: string,
    json: any,
    css : string,
    url : string,
    from : Types.ObjectId
}


const blockExportSchema = new Schema({
    type: {
        type :String,
        required : true
    },
    file: {
        type: String,
        required: true
    },
    json: {
        type: Object,
        required : true
    },
    css: {
        type: String,
        required : false
    },
    url : {
        type: String,
        required : true
    },
    from : {
        type : Types.ObjectId,
        required : true
    }
    
})

export const BlockExportModel = model<BlockExport>("block-export",blockExportSchema)
