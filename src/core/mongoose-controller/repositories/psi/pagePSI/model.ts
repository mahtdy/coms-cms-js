import { Document, model, Schema, Types } from "mongoose";


export default interface PagePSI extends Document {
    date : Date,
    id : Types.ObjectId | string,
    module : string,
    mobileJson : any,
    desktopJson: any
}

const pagePSISchema = new Schema({
    id: {
        type: Types.ObjectId,
        required: true
    },
    module: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    mobileJson: {
        type: Object,
        required: true
    },
    desktopJson: {
        type: Object,
        required: true
    }
}) 

export const PagePSI_Model = model<PagePSI>("page-psi",pagePSISchema)