
import { Schema, model, Document, Types } from "mongoose";
const uniqueValidator = require('mongoose-unique-validator');


export default interface Category extends Document {
    title: string,
    useage: number,
    language : Types.ObjectId | string
}

const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    language :{
        type: Types.ObjectId,
        required : true,
        ref : "language"
    },
    useage: {
        type : Number,
        required : true,
        default : 0
    },
})


categorySchema.plugin(uniqueValidator, { message: "{PATH} is duplicated" })
export const CategoryModel = model<Category>('category', categorySchema)

