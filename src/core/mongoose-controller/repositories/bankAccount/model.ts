import { Document, model, Schema, Types } from "mongoose";
import { BaseAdmin } from "../admin/model";
import Address from "../address/model";


export default interface BankAccount extends Document {
    title : string,
    isReal : boolean,
    isOfficial : boolean,
    shaba: string,
    card: string,
    number: string,
    type: "sell" | "buy" | "wallet",
    createdAt: Date,
    bank: string,
    enabled: boolean,
    canDelete : boolean,
    owner : string,
    inventory : number,
    isTankhah: boolean,

    address : Address | Types.ObjectId | string,
    deinPossible : boolean,
    maxDein ?: number,
    deinDrodown ?: number,
    deinExprie ?: Date

}

const bankAccountSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    isReal: {
        type: Boolean,
        required: true,
        default: true
    },
    isOfficial: {
        type: Boolean,
        required: true,
        default: true
    },
    shaba: {
        type: String,
        unique: true,
        required: true
    },
    card: {
        type: String,
        unique: true,
        required: true
    },
    number: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: String,
        enum: ["sell", "buy", "wallet"],
        required: true,
        default: "sell"
    },
    createdAt: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    bank: {
        type: String,
        required: true
    },
    enabled: {
        type: Boolean,
        required: true,
        default: true
    },
    canDelete : {
        type: Boolean,
        required: true,
        default: true
    },
    owner : {
        type : String,
        required : true
    },
    inventory: {
        type: Number,
        required: true,
        default: 0
    },
    isTankhah: {
        type: Boolean,
        required: true,
        default: false
    },



    address :{
        type: Types.ObjectId,
        required:  true,
        ref : "address"
    },
    deinPossible :{//وضعیت خرید دین برای این حساب
        type: Boolean,
        required : true,
    },
    maxDein : { // حداکثر مبلغ خرید دین سالیانه
        type : Number,
        required : false,
    },
    deinDrodown : { // درصد کم شدن در خرید دین چک
        type: Number,
        required : false
    },
    deinExprie : { // زمان اتمام قرارداد خرید دین
        type : Date,
        required : false
    }


})




export const BankAccountModel = model<BankAccount>("bank-account", bankAccountSchema)