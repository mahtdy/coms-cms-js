import { Document, model, Schema } from "mongoose";



export default interface LoanSetting extends Document {
    from : number,
    to : number,
    deed :{
        min : number,
        enabled : boolean
    },
    personal : {
        min : number,
        guarantorsCount : number,
    },
    enabled: boolean

}

const loanSettingSchema = new Schema({
    from : {
        type : Number,
        required : true
    },
    to : {
        type : Number,
        required : true
    },
    deed : {
        type : new Schema({
            min : {
                type : Number,
                required : true
            },
            enabled : {
                type : Boolean,
                required : true,
                default : false
            }
        })
    },
    personal : {
        type : new Schema({
            min : {
                type : Number,
                required : true
            },
            guarantorsCount : {
                type : Number,
                required : true
            }
        })
    },
    enabled : {
        type : Boolean,
        required : true, 
        default : true
    }

});

export const LoanSettingModel = model<LoanSetting>("loan-setting", loanSettingSchema)