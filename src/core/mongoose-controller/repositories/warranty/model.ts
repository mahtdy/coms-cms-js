
import { Document, Schema, Types, model } from "mongoose"
import Address from "../address/model"

export interface Warrantor {

    nameAndFamily: string,

    fatherName: string,
    birthCertificateNumber: string,
    gender: "male" | "female" | "other",

    email: string,
    emailVirified : boolean,
    emailCode ?: number,
    phone: string,
    phoneVirified : boolean,
    phoneCode ?: number,
    address: Types.ObjectId | string | Address,

    telephone: string,
    nationalCode: string,
    workAddrress: Types.ObjectId | string | Address,
    workTelephone: string,
    jobTitle: string


}

export const warrantorSchema = new Schema({
    nameAndFamily: {
        type: String,
        required: true
    },

    fatherName: {
        type: String,
    },
    birthCertificateNumber: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },


    email: {
        type: String,
        required: false
    },
    emailVirified : {
        type : Boolean,
        required : false
    },
    emailCode: {    
        type : Number
    },
    phone: {
        type: String,
        required: true
    },
    phoneVirified : {
        type : Boolean,
        required : false
    },
    phoneCode :{
        type: Number
    },
    address: {
        type: Types.ObjectId,
        required: false,
        ref: "address"
    },


    telephone: {
        type: String,
        required: false
    },
    nationalCode: {
        type: String,
        required: false
    },
    workAddrress: {
        type: Types.ObjectId,
        required: false,
        ref: "address"
    },
    workTelephone: {
        type: String,
        required: false
    },
    jobTitle: {
        type: String,
        required: false
    }

})

export default interface Warranty extends Document {
    warrantor: Warrantor,
    type: "deed" | "personal",
    attachments: any,
    paymentConfig: string | Types.ObjectId,
    personalType?: "check" | "promissory",
    info: any,
    confirmed: boolean,
    isReject ?: boolean
    rejectMessage ?: string
    isOwn: boolean,
    deed: string[],
    deedAddress?: Types.ObjectId | Address |string
    amount ?: number
    isInMortgage ?: boolean
    homeOffice : any
}

const warrantySchema = new Schema({
    warrantor: {
        type: warrantorSchema,
        required: true
    },
    type: {
        type: String,
        enum: ["deed", "personal"],
        required: false
    },
    attachments: {
        type: Object,
        required: false
    },
    paymentConfig: {
        type: Types.ObjectId,
        ref: "payment-config",
        required: false
    },
    personalType: {
        type: String,
        enum: ["check", "promissory"],
        required: false
    },
    info: {
        type: Object,
        required: false
    },
    confirmed: {
        type: Boolean,
        required: true,
        default: false
    },
    isReject : {
        type: Boolean,
        required : false
    },
    rejectMessage : {
        type : String,
        required : false
    },
    isOwn: {
        type: Boolean,
        required: true,
        default: false
    },
    deed: {
        type: Object,
        required: false
    },

    deedAddress: {
        type : Types.ObjectId,
        required : false,
        ref: "address"
    },
    amount :{
        type: Number,
        required : false
    },
    isInMortgage : {
        type : Boolean,
        required : false
    },
    homeOffice: {
        type: [Object],
        required: false
    },
})


export const WarrantyModel = model<Warranty>("warranty", warrantySchema)