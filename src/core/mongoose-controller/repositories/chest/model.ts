
import { Document, Schema, model } from "mongoose"

export default interface Chest extends Document {
    title : string;
    createdAt: Date,
    enabled: boolean,
    canDelete : boolean,
    inventry : number,
    isTankhah: boolean
}

const chestSchema = new Schema({
    title  : {
        type: String,
        required: true
    },
    createdAt : {
        type: Date,
        default:() => new Date(),
        required : true
    },
    enabled: {
        type: Boolean,
        required: true,
        default: true
    },
    canDelete : {
        type : Boolean,
        required : true,
        default : true
    },
    inventry : {
        type : Number,
        required : true,
        default : 0
    },
    isTankhah : {
        type : Boolean,
        required : true,
        default : false
    }
})

export const ChestModel = model<Chest>("chest" , chestSchema)