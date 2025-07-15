import { Schema, Document, model } from "mongoose";
import { BaseAdmin } from "../admin/model";

export default interface APIKey extends Document {
    title :string,
    token: string,
    creator: BaseAdmin | string,
    expire?: Date,
    status: boolean,
    email?: string,
    phone?: string,
    ips: [string],
    permission : {
        partition : string ,
        type : "any" | "semi",
        ips : string[],
        permissionData?:  any
    }[]
}

export var apiKeySchema = new Schema({
    title : {
        type : String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    expire: {
        type: Date,
        required: false
    },
    status: {
        type: Boolean,
        required: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    phone: {
        type: String,
        required: false,
        unique: true
    },
    ips: {
        type: [String],
        required: true,
        default: []
    },
    permission: {
        type: [
            new Schema({
                partition : {
                    type : String,
                    required : false
                } ,
                type :{
                    type: String,
                    enum : ["any" , "semi"],
                } ,
                ips :{
                    type :[String],
                    required : true,
                    default : []
                },
                permissionData:  {
                    type: Object,
                    required : false
                }
            })
        ],
        default : false
    }
})

export var APIKeyModel = model<APIKey>("apikey", apiKeySchema)