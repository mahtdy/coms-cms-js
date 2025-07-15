
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId
import Category from '../category/model'


export default interface CategoryMap extends Document {
    lable: string,
    category: Category | string,
    parent?: Category | string,
    ancestors: Category[] | string[]
    language ?: string | Types.ObjectId,
    showTitle? : string
}

const categoryMapSchema = new Schema({
    lable: {
        type: String,
        required: true
    },
    language : {
        type : Types.ObjectId,
        required: false
    },
    showTitle: {
        type: String,
        required : false
    },
    category: {
        type: ObjectId,
        required: true,
        ref: "category"
    },
    parent: {
        type: ObjectId,
        required: false,
        ref: "category"
    },
    ancestors: {
        type: [ObjectId],
        required: true,
        ref: "category"
    }
})


export const CategoryMapModel = model<CategoryMap>('categoryMap', categoryMapSchema)

