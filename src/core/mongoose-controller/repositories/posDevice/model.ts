import { Document, model, Schema, Types } from "mongoose";
import { BaseAdmin } from "../admin/model";


export default interface POS_Device extends Document {
    title : string,
    serialNumber : string,
    enabled : boolean,
    bankAccount : Types.ObjectId,
    canDelete : boolean

}

const pos_DeviceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    serialNumber: {
        type: String,
        required: true
    },
    enabled: {
        type: Boolean,
        required: true,
        default: true
    },
    bankAccount : {
        type : Types.ObjectId,
        required : true,
        ref : "bank-account"
    },
    canDelete : {
        type: Boolean,
        required: true,
        default: true
    }
})




export const POS_DeviceModel = model<POS_Device>("pos-device", pos_DeviceSchema)