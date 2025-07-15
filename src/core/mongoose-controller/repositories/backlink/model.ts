
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId


export default interface BackLink extends Document {
    url: string,
    pageAuthority?: number,
    domainAuthority?: number,
    spamScore?: number,
    inboundLinks?: string[],
    links: {
        url: string,
        text: string,
    }[],

}

const backLinkSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    pageAuthority: {
        type: Number,
        required: false
    },
    domainAuthority: {
        type: Number,
        required: false
    },
    spamScore: {
        type: Number,
        required: false
    },
    inboundLinks: {
        type: [String],
        required: false
    },
    links: {
        type: [
            new Schema(
                {
                    url: {
                        type: String,
                        required: true
                    },
                    text: {
                        type: String,
                        required: true
                    },
                }
            )],
        required: true
    },
})


export const BackLinkModel = model<BackLink>('backLink', backLinkSchema)

