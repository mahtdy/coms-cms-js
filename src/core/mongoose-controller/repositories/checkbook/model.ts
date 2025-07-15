import  {Document, Schema, Types, model} from "mongoose"

export default interface Checkbook extends Document {
    startNumber : number,
    endNumber : number,
    account : Types.ObjectId | string,
    pageCount : number,
}

const checkbookSchema = new Schema({
    startNumber :{
        type : Number,
        required : true
    },
    endNumber :{
        type : Number,
        required : true
    },
    account : {
        type : Types.ObjectId,
        required : true,
        ref : "bank-account"
    },
    pageCount : {
        type : Number,
        required : true,
        default : 0
    }
})


export const CheckbookModel = model<Checkbook>("checkbook" , checkbookSchema) 