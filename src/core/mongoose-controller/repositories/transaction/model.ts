import { Document, model, Schema, Types } from "mongoose";


export default interface Transaction extends Document{
    type: "payBack" | "pay" | "installment" | "prePay" | "chargeAccount" | "chargeAccountInstallment" | "withdraw" ,
    transactionType: "deposit" | "withdra"  |"transmission"
    amount : number,
    payType: "payGateWay" | "cash" | "transfer" | "check" | "pos" | "wallet",
    status : "success" | "failed" | "rejected" | "waiting" | "confirmed" | "canceled" |  "returned",

     // returned : برگشت خورده
    // rejected : رد
    // confirmed : تایید شده
    // canceled : لغو
    // 

    ispaid : boolean,
    attachments : string[], 
    invoice ?: Types.ObjectId ,
    installmentId ?: Types.ObjectId,
    createdAt : Date,
    paidAt ?: Date,
    deadline ?: Date,
    failedAt ?: Date,
    successAt ?: Date,
    info : any,
    owner ?: Types.ObjectId,
    ownerType ?: string,
    paymentConfig ?: Types.ObjectId | string,
    payGateway ?: Types.ObjectId | string,

    bankAccount ?: Types.ObjectId,
    chest  ? : Types.ObjectId


    placeType: "spend" | "in-bank" | "in-chest" | "dein",
    spendInfo ?: {
        type : string , 
        id: Types.ObjectId | string
    },
    bankInfo : {
        account : string,
    },
    dein ?: {
        drodownType: "percentage" | "static",
        volume : number,
        account : string
    }

    description : string
    
}

const transactionSchema = new Schema({
    type : {
        type : String,
        required : true,
        enum : ["payBack" , "pay" , "installment" , "prePay" , "chargeAccount" , "chargeAccountInstallment" , "withdraw"]
    },
    transactionType : {
        type : String,
        required : true,
        enum : ["deposit" , "withdraw" , "transmission"],
        default : "deposit"
    },
    amount : {
        type : Number,
        required : true
    },
    payType : {
        type : String,
        required : true,
        enum : ["payGateWay" , "cash" , "transfer" , "check" , "pos" , "wallet"]
    },
    status : {
        type : String,
        required : true,
        enum : ["success" , "failed" , "rejected" , "waiting" , "confirmed" , "canceled" ,"returned"]
    },
    ispaid : {
        type : Boolean,
        required : true
    },
    attachments : {
        type : [String],
        required : true
    },
    invoice : {
        type : Types.ObjectId,
        required : false,
        ref : "invoice"
    },
    installmentId : {
        type : Types.ObjectId,
        required : false,
        ref : "installment"
    },
    createdAt : {
        type : Date,
        required : true,
        default : () => new Date()
    },
    deadline : {
        type : Date,
        required : false
    },
    paidAt : {
        type : Date,
        required : false
    },
    failedAt : {
        type : Date,
        required : false
    },
    successAt : {
        type : Date,
        required : false
    },
    info : {
        type: new Schema({
            number: String,
            saiadNumber: String,
            bank: String,
            branch: String,

            source: String,
            destination: {
                type: Types.ObjectId,
                required: false,
                ref: "bank-account"
            },
            code: String,

            account: {
                type: Types.ObjectId,
                required: false,
                ref: "bank-account"
            },
            pos: {
                type: Types.ObjectId,
                required: false,
                ref: "pos-device"
            },
        }),
        required : false
    },

    owner : {
        type : Types.ObjectId,
        required : false,
        refPath : "ownerType"
    },
    ownerType : {
        type : String,
        required : false
    },
    
    paymentConfig : {
        type : Types.ObjectId,
        required : false,
        ref : "paymentConfig"
    },
    payGateway : {
        type : Types.ObjectId,
        required : false,
        ref : "payment-gateway"
    },
    posId : {
        type: Types.ObjectId,
        required : false,
        ref : "pos-device"
    },
    bankAccount : {
        type : Types.ObjectId,
        required : false,
        ref : "bank-account"
    },
    chest : {
        type : Types.ObjectId,
        required : false,
        ref : "chest"
    },

    placeType: {
        type: String,
        enum: [
            "spend",
            "in-bank",
            "in-chest",
            "dein"
        ],
        required: false
    },
    spendInfo: {
        type: new Schema({
            type : {
                type: String,
                required: true
            }, 
            id: {
                type: Types.ObjectId,
                required: true,
                refPath: "spendInfo.type"
            }
        }),
        required: false
    },
    bankInfo: {
        type: new Schema({
            account : {
                type: Types.ObjectId,
                ref: "bank-account",
                required: true
            }
        }),
        required: false
    },
    dein : {
        type : new Schema({
            drodownType : {
                type : String,
                required : true,
                enum : ["percentage" , "static"]
            },
            volume : {
                type : Number,
                required : true
            },
            account : {
                type : Types.ObjectId,
                ref : "bank-account",
                required : true
            }
        }),
        required : false
    },
    description : {
        type: String,
        required : true,
        default : " "
    }

})

export const TransactionModel = model<Transaction>("transaction" , transactionSchema)
