

import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId


export default interface Department extends Document {
    name: string,
    startDate: Date,
    status: boolean,

}

const departmentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        startDate: {
            type: Date,
            required: true,
            default: () => {
                return new Date()
            }
        },
        status: {
            type: Boolean,
            required: true,
            default: true
        },
    })


export const DepartmentModel = model<Department>('department', departmentSchema)

