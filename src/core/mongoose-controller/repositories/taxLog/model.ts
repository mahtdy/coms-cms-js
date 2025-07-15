import {Document, Schema, Types, model} from "mongoose"


export default interface TaxLog extends Document{
    invoice : Types.ObjectId | string,
    type: "increase" | "decrease" ,
    amount : number
    date : Date
}

const taxLogSchema = new Schema({
    invoice :{ 
        type : Types.ObjectId,
        required : true
    },
    type : {
        type : String,
        enum : ["increase", "decrease"],
        required : true
    },
    amount : {
       type : Number,
       required: true
    },
    date :{
        type : Date,
        required : true,
        default : new Date()  
    }
})

export const TaxLogModel = model<TaxLog>("tax-log" , taxLogSchema)