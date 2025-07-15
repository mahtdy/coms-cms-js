import { Document, Schema, Types, model } from "mongoose";
import { BaseAdmin } from "../admin/model";


export default interface RefreshToken extends Document {
    refresh : string,
    expire : Date ,
    admin : string,
    tries: number
}

const refreshToken = new Schema({
    refresh :{
        type : String,
        required : true
    },
    expire :{
        type: Date,
        required : true
    },
    admin : {
        type : Types.ObjectId,
        required : true
    },
    tries : {
        type : Number,
        required: true,
        default : 0
    }
})

export const RefreshTokenModel = model<RefreshToken>("refreshToken" , refreshToken)