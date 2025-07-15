import { Document, model, Schema, Types } from "mongoose";
import Installment from "../installment/model";


export default interface InstallmentWarranty extends Document{
    installment : Types.ObjectId | Installment,
    type : "check" | "other",
    info ?: any,
    description ?: string,
    attachments ?: string[],
    checkStatus ?: "waiting" | "accepted" 
} 

const installmentWarrantySchema = new Schema({
    installment : {
        type : Types.ObjectId,
        required : true,
        ref : "installment"
    },
    type : {
        type : String,
        enum : ["check" , "other"],
        required : true
    },
    info : {
        type : Object,
        required : false
    },
    description : {
        type : String,
        required : false
    },
    attachments : {
        type : [String],
        required : false
    },
    checkStatus : {
        type : String,
        required : false
    }
})

export const InstallmentWarrantyModel = model<InstallmentWarranty>("installment-warranty", installmentWarrantySchema)