
import { Schema, model, Document, Types } from "mongoose";

export default interface Log extends Document {
    admin?: any,
    date: Date,
    collectionName?: string,
    ipAddress: string,
    afterData?: any,
    beforeData?: any,
    url: string,
    method: string,
    queryParam?: any,
    body?: any,
    success: boolean,
    statusCode: number,
    response: any
}

const logSchema = new Schema({
    admin: {
        type: Types.ObjectId,
        requierd: false,
        ref: "admin"
    },
    date: {
        type: Date,
        required: true,
        default: () => {
            return new Date()
        }
    },
    collectionName: {
        type: String,
        required: false
    },
    ipAddress: {
        type: String,
        requierd: true
    },
    afterData: {
        type: Object,
        required: false
    },
    beforeData: {
        type: Object,
        required: false
    },
    url: {
        type: String,
        requierd: true
    },
    method: {
        type: String,
        requierd: true
    },
    queryParam: {
        type: Object,
        required: false
    },
    body: {
        type: Object,
        required: false
    },
    success: {
        type: Boolean,
        required: true
    },
    statusCode: {
        type: Number,
        required: true
    },
    response: {
        type: Object,
        required: true
    }
})


export const LogModel = model<Log>('log', logSchema)

