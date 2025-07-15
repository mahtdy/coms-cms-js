import { Schema, Types, model } from "mongoose";
import { Document } from "mongoose";



export default interface CommentForm extends Document {
    hash: string,
    info: any,
    submitted: boolean,
    notificationTokens?: {
        domain : Types.ObjectId,
        type : "web-push",
        config : any
    }[]
}

const commentFormSchema = new Schema({
    hash: {
        type: String,
        required: true,
        unique: true
    },
    info: {
        type: Object,
        required: true
    },
    submitted: {
        type: Boolean,
        required: true,
        default: false
    },
    notificationTokens: {
        type: [new Schema ( {
            domain : Types.ObjectId,
            type : {
                type: String,
                default : "web-push"
            },
            config : Object
        })],
        required: false
    }
});

export const CommentFormModel = model<CommentForm>("comment-form", commentFormSchema)