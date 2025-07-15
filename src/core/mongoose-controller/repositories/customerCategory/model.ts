
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId


export default interface CustomerCategory extends Document {
    title: string,
    isBasic : boolean
}

const customerCategorySchema = new Schema({
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


export const CustomerCategoryModel = model<CustomerCategory>('customerCategory', customerCategorySchema)

