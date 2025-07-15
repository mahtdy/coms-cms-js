
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId
import {BaseAdmin} from '../admin/model'


export default interface DataTableConfig extends Document {
    lable: string,
    dataTable: string,
    config: any,
    admin: BaseAdmin | string,

}

const dataTableConfigSchema = new Schema({
    lable: {
        type: String,
        required: true
    }, 
    dataTable: {
        type: String,
        required: true
    }, 
    config: {
        type: Object,
        required: true
    }, 
    admin: {
        type: ObjectId,
        required: true,
        ref: "admin"
    },
})


export const DataTableConfigModel = model<DataTableConfig>('dataTableConfig', dataTableConfigSchema)

