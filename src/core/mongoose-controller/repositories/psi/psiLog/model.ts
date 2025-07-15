import { Document, model, Schema, Types } from "mongoose";


export default interface PSI_Log extends Document {
    id: string | Types.ObjectId,
    module: string,
    date: Date,
    mobileInfo: any,
    desktopInfo: any
}

const psi_LogSchema = new Schema({
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
    mobileInfo: {
        type: Object,
        required: false
    },
    desktopInfo: {
        type: Object,
        required: false
    }
    
})

export const PSI_LogModel = model<PSI_Log>("psi-log", psi_LogSchema)