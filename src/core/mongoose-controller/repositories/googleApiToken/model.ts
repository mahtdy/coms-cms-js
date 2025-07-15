
import { Document, model, Schema, Types } from "mongoose";

export default interface GoogleApiToken extends Document {
    type: string,
    token: any,
    domains: Types.ObjectId[]
}

const googleApiSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    token: {
        type: Object,
        required: false
    },
    domains: {
        type: [Types.ObjectId],
        required: true,
        default: []
    }
})

export const GoogleApiTokenModel = model<GoogleApiToken>("google-api-token", googleApiSchema)