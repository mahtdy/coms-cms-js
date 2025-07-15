import { Document, Schema, Types, model } from "mongoose";


export default interface Payment extends Document{
    factor : Types.ObjectId,
    type :  "pre-pay"| "installment" | "multi-stage" | "simple",
    payType: string,
    status: "waiting" | "paid" | "confirmed" | "rejected",
    deadline : Date,
    info: any,
    amount : Number 
}

const paymentSchema = new Schema({
    factor : {
        type : Types.ObjectId,
        required : false
    },
    type: {
        type: String,
        required : true,
        enum : ["pre-pay" , "installment" , "multi-stage" , "simple"]
    },
    payType: {
        type: String,
        enum : ["check" , "payGateWay" , "transfer" , "cash" ]
    },
    status: {
        type: String,
        enum : ["waiting" , "paid" , "confirmed" , "rejected"]
    },
    deadline : {
        type: Date,
        required : true,
    },
    info :{
        type: Object,
        required : true
    },
    amount:{
        type: Number,
        required : true
    }
})

export const PaymentModel = model<Payment>("payment" , paymentSchema)