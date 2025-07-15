import { Document, Schema, Types, model } from "mongoose";



export default interface LoanTemplate extends Document {
    title: string,
    icon?: string,
    amount: number,
    periodes: {
        months: number,
        bankFees?: number,
        supplierName?: string,
        supplierIcon?: string,
        warranty: {
            deed: {
                min: number,
                enabled: boolean
            },
            personal: {
                min: number,
                guarantorsCount: number,
            }
        },
        formula: "banking" | "market",
        interestRate: number,
        enabled : boolean,
        _id : Types.ObjectId
    }[],
    dueDate: Date
}


const WarrantySchema = new Schema({
    deed: {
        type: new Schema({
            min: {
                type: Number,
                required: true
            },
            enabled: {
                type: Boolean,
                required: true,
                default: false
            }
        } , {_id : false})
    },
    personal: {
        type: new Schema({
            min: {
                type: Number,
                required: true
            },
            guarantorsCount: {
                type: Number,
                required: true
            }
        } , {_id : false})

    }
}, { _id: false });


const PeriodeSchema = new Schema({
    months: {
        type: Number,
        required: true
    },
    bankFees: {
        type: Number,
        required: false
    },
    supplierName: {
        type: String,
        required: false
    },
    supplierIcon: {
        type: String,
        required: false
    },
    warranty: {
        type: WarrantySchema,
        required: true
    },
    formula:{
        type : String,
        required : true,
        enum : [ "banking" , "market"]
    },
    interestRate: {
        type : Number,
        required : true
    },
    enabled : {
        type : Boolean,
        required : true
    }

},);



const loanTemplateSchema = new Schema({
    title:{ 
        type : String,
        required : true
    },
    icon: {
        type: String,
        required: false
    },
    amount: {
        type: Number,
        required: true
    },
    periodes: {
        type: [PeriodeSchema],
        required: true
    },
    dueDate: {
        type: Date,
        required: false
    }

})

export const loanTemplateModel = model<LoanTemplate>("loan-template", loanTemplateSchema)