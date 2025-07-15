import { Document, model, Schema } from "mongoose";

export interface PeriodConfig {
    weekDays?: ("Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday")[],
    monthly?: {
        month: number,
        day: number
    }[]
}

export default interface PSI extends Document{
    enabled : boolean,
    periodType:  "daily" | "weekly" | "monthly" |"custom",
    periodConfig ?: PeriodConfig
}

const psi_Schema = new Schema({
    enabled: {
        type :Boolean,
        required : true
    },
    periodType : {
        type: String,
        required : false,
        enum : ["daily" , "weekly" ,"monthly" , "custom"]
    },
    periodConfig: {
        type: Object,
        required: false
    },

}) 

export const PSI_Model = model<PSI>("psi" , psi_Schema)