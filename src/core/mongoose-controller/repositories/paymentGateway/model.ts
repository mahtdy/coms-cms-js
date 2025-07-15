import { Document, model, Schema, Types } from "mongoose";
import BankAccount from "../bankAccount/model";
import Domain from "../domain/model";



export default interface PaymentGateway extends Document{
    title : string,
    // name : string,
    type : "melat" | "saderat" | "meli" | "eghtesad-novin" | "saman" | "ap" | "parsian" | "pasargad" | "id-pay" | "zarinpal" | "pay" | "nextpay" | "test",
    isActive : boolean
    isRegistered : boolean,
    bankAccount : BankAccount | Types.ObjectId,
    canDelete : boolean,
    config : any,
    domain : Types.ObjectId | string | Domain
}


const paymentGatewaySchema = new Schema({
    title : {
        type : String,
        required : true
    },
    // name : {
    //     type : String,
    //     required : true
    // },
    type : {
        type : String,
        required : true,
        enum : [
            "melat",
            "saderat",
            "meli",
            "eghtesad-novin",
            "saman",
            "ap",
            "parsian",
            "pasargad",
            "id-pay",
            "zarinpal",
            "pay",
            "nextpay",
            "test"
        ]
    },
    isActive : {
        type : Boolean,
        required : true,
        default : true
    },
    isRegistered : {
        type : Boolean,
        required : true,
        default : false
    },
    bankAccount : {
        type : Types.ObjectId,
        required : true,
        ref : "bank-account"
    },
    canDelete : {
        type : Boolean, 
        required : true,
        default : true
    },
    config : {
        type : Object,
        required : true
    },
    domain : {
        type : Types.ObjectId,
        required: false,
        ref : "domain"
    }
})

export const PaymentGatewayModel = model<PaymentGateway>("payment-gateway" , paymentGatewaySchema)