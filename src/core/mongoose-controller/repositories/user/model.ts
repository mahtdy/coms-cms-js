import { Schema, model, Document, Types } from "mongoose";
import CustomerCategory from "../customerCategory/model";
const uniqueValidator = require('mongoose-unique-validator');
import {z} from "zod"
import BaseController from "../../controller";


export default interface BaseUser extends Document {
    id : Types.ObjectId,
    name: string,
    family: string,
    email: string,
    isEmailRegistered?: boolean,
    profile ?:string,
    nationalCode ?: string,
    newEmail?: string,
    emailHash?: string,
    phoneNumber: string,
    password: string,
    towFactorLogIn?: boolean,
    towFactorTocken?: string,
    userCategory?: CustomerCategory | string,
    passwordLastChange: Date,
    changePassword : boolean,
    passwords: string[],
    notificationTokens?: {
        domain : Types.ObjectId,
        type : "web-push",
        config : any
    }[],
    wallet : number
}

export var userSchema : any = {
    name: {
        type: String,
        required: true
    },
    family: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    profile:{
        type: String,
        required : false
    },
    isEmailRegistered: {
        type: Boolean,
        required: true,
        default: false
    },
    newEmail: {
        type: String,
        validate: function (value: string) {
            // if (!Email.validateEmail(value)) {
            //     throw new Error("ایمیل وارد شده نامعتبر است");
            // }
            return true
        }
    },
    emailHash: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: function (value: string) {
            // if (!PhoneNumber.validateNumber(value)) {
            //     throw new Error("شماره تلفن وارد شده نامعتبر است");
            // }
            return true
        },
        unique: true
    },
    
    nationalCode : {
        type: String ,
        required : false
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    passwordLastChange: {
        type: Date,
        required: true,
        default: () => {
            return new Date(Date.now())
        }
    },
    changePassword : {
        type: Boolean,
        required : true,
        default : true
    },
    passwords: {
        type: [String],
        requierd: true,
        default: []
    },
    towFactorLogIn: {
        type: Boolean,
        required: true,
        default: false
    },
    towFactorTocken: {
        type: String,
        required: false
    },
    userCategory: {
        type: Types.ObjectId,
        required: false,
        default: "6108d532e681165bcd45812e",
        ref: "customerCategory"
    },
    notificationTokens: {
        type: [new Schema ( {
            domain : Types.ObjectId,
            type : {
                type: String,
                default : "web-push"
            },
            config : Object
        })],
        required: false
    },
    wallet : {
        type: Number,
        required: true,
        default: 0
    }
}

export var baseUserZod =z.object( {
    name: z.string(),
    family: z.string(),
    email: z.string(),
    isEmailRegistered: z.boolean().optional(),
    // newEmail: z.string(),
    // emailHash?: z.string(),
    phoneNumber: z.string(),
    password: z.string(),
    towFactorLogIn: z.boolean().optional(),
    // towFactorTocken?: string,
    userCategory : BaseController.id.optional(),
    passwordLastChange: z.coerce.date().default(() => new Date()),
    // passwords: string[],
    // notificationTokens?: string | string[],
}).omit({
    passwordLastChange : true
})
// const userSchema = new Schema()
// userSchema.plugin(uniqueValidator, { message: "{PATH} is unique" })

// export const UserModel = model<BaseUser>("user", userSchema)
