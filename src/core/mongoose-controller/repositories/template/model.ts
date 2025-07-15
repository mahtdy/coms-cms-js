import { Schema, model } from "mongoose";
import { Document } from "mongoose";



export default interface Template extends Document {
    name: string,
    created : Date,
    isDefault: boolean
}

const templateSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    created : {
        type :Date,
        required : true,
        default : () => new Date()
    },
    isDefault: {
        type: Boolean,
        required : true,
        default : false
    }
})

export const TemplateModel = model<Template>("template", templateSchema)