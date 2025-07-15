import { Document, model, Schema, Types } from "mongoose";
import Invoice from "../invoice/model";
import { BaseAdmin } from "../admin/model";


export default interface Installment extends Document {
    number: number,
    netPrice: number,
    interest: number,
    penalty: number,
    finalPrice: number,
    paidPrice: number,
    iscanceled: boolean,
    paid: boolean,
    paidAt?: Date,
    transactions?: Types.ObjectId[],
    invoice: Types.ObjectId | string | Invoice,
    penaltypaid: boolean,
    deadline: Date
    notes: {
        date: Date,
        note: string,
        admin: Types.ObjectId | BaseAdmin
    },
    owner: Types.ObjectId,
    ownerType: string,
    paymentConfig: Types.ObjectId | string, // laon
    
    payment : Types.ObjectId | string // own installment  
    
    
    // status: "inproccess" | "finished" | "returned" | "arrived" | "ended" | "rejected" | "waiting" | "waitingForCancle" | "readyForCancle" | "confirmed"
    status: "rejected" | "waiting" | "confirmed" | "duringPayment" | "paid" | "paidWithDelay" | "arrived" | "paidWithoutPenalty" | "canceled",
    rejectMessage: string,

    isUpdated: boolean,
    updateAt: Date,
    changed?: boolean,
    penaltyForget? : boolean
}


const installmentSchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    netPrice: {
        type: Number,
        required: true
    },
    interest: {
        type: Number,
        required: true
    },
    penalty: {
        type: Number,
        required: false
    },
    finalPrice: {
        type: Number,
        required: true
    },
    transactions: {
        type: [Types.ObjectId],
        ref: "transaction",
        required: false
    },
    invoice: {
        type: Types.ObjectId,
        required: false,
        ref: "invoice"
    },
    penaltypaid: {
        type: Boolean,
        required: false
    },
    deadline: {
        type: Date,
        required: true
    },
    notes: {
        type: [{
            date: Date,
            note: String,
            admin: {
                type: Types.ObjectId,
                ref: "admin",
                required: true
            }
        }],
        required: true,
        default: []
    },
    owner: {
        type: Types.ObjectId,
        required: true,
        refPath: "ownerType"
    },
    ownerType: {
        type: String,
        required: true
    },
    paymentConfig: {
        type: Types.ObjectId,
        required: true,
        ref: "payment-config"
    },
    payment: {
        type: Types.ObjectId,
        required: false,
        ref: "payment-config"
    },
    paid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date,
        required: false,
    },
    paidPrice: {
        type: Number,
        required: true,
        default: 0
    },
    iscanceled: {
        type: Boolean,
        required: true,
        default: false
    },
    status: {
        type: String,
        enum: [
            "rejected",
            "waiting",
            "confirmed" ,
            "duringPayment",
            "paid",
            "paidWithDelay",
            "arrived",
            "paidWithoutPenalty",
            "canceled"
        ],
        default: "waiting",
        required: true
    },
    rejectMessage: {
        type: String,
        required: false
    },


    isUpdated: {
        type: Boolean,
        required: false
    },
    updateAt: {
        type: Date,
        required: false
    },
    changed: {
        type: Boolean,
        required: false
    },


    penaltyForget : {
        type :Boolean,
        required :false
    }
})

export const InstallmentModel = model<Installment>("installment", installmentSchema)
