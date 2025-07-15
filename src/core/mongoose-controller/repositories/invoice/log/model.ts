import { Document, model, Schema , Types } from "mongoose";

export default interface InvoiceLog extends Document {
    type: 
    "accept-check" | 
    "reject-check" |
    "change-check" |
    "pay-installment" |
    "pay-pre-pay" |
    "pay-penalty" |
    "pay" |
    "charge-wallet-for-pay" |
    "add-installment" |
    "forgive-penalty" |
    "forgive-all-penalties" |
    "delete-payment-config",
    date: Date,
    description: string,
    data: any
}

const invoiceLogSchema = new Schema({
    type: {
        type: String,
        enum: [
            "accept-check",
            "reject-check",
            "change-check",
            "pay-installment",
            "pay-pre-pay",
            "pay-penalty",
            "pay",
            "charge-wallet-for-pay",
            "add-installment",
            "forgive-penalty",
            "forgive-all-penalties",
            "delete-payment-config"
        ]
    },


    
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    data: {
        type: Schema.Types.Mixed,
        required: true,
        default: {}
    },
    invoice: {
        type : Types.ObjectId,
        ref : "invoice",
        required : true
    },
    beforeData: {
        type: Number,
        required: true
    },
    afterMony: {
        type: Number,
        required: true
    }
})

export const InvoiceLogModel = model<InvoiceLog>("invoice-log", invoiceLogSchema)
