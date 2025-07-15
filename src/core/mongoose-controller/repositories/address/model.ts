import { Document, Types, Schema, model } from "mongoose";
import { string, z } from "zod"
import BaseController from "../../controller";



export default interface Address extends Document {
    x: number,
    y: number,
    state: string,
    city: string,
    cityPart?: string,
    street?: string,
    address: string,
    plaque: string,
    unit ?: number,
    type?: string,//hospital | office | ...
    title ?:string

}

export var addressSchema = z.object({
    x: z.number(),
    y: z.number(),
    state: z.string(),
    city: z.string(),
    cityPart: z.string().optional(),
    street: z.string().optional(),
    address: z.string(),
    plaque: z.string(),
    _id: BaseController.id.optional(),
    unit: z.number().optional(),
    type: z.string().optional(),
    title : z.string().optional()
})


const addressMongooseSchema = new Schema({
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    cityPart: {
        type: String,
        required: false
    },
    street: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    plaque: {
        type: String,
        required: true
    },
    unit: {
        type: Number,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    title : {
        type : String,
        required : false
    }
})


export const AddressModel = model<Address>("address" ,addressMongooseSchema)