
import { Document, Schema, Types, model } from "mongoose" 
import Address from "../address/model"

export default interface People extends Document{
    nameAndFamily : string,
    email : string,
    phone : string,
    address : Types.ObjectId | string | Address,
    info : object
}
const peopleSchema = new Schema({
    // fields
    nameAndFamily: {
        type : String,
        required : true
    },
    email : {
        type: String,
        required : false
    },
    phone : {
        type : String,
        required : true,
        unique : true
    },
    address : {
        type : Types.ObjectId,
        required : false,
        ref : "address"
    },
    info : {
        type : Object,
        required : false
    },
    isReal : {
        type : Boolean,
        required : true,
        default : true
    }

})

export const PeopleModel = model<People>("people" , peopleSchema)