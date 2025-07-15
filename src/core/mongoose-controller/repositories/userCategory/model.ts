
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId


export default interface UserCategory extends Document {
    title: string,

}

const userCategorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    isBasic: {
        type: Boolean,
        required: true,
        default: false
    }
})


export const UserCategoryModel = model<UserCategory>('userCategory', userCategorySchema)

