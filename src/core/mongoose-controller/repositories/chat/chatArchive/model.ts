
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId
import {BaseAdmin} from '../../admin/model'


export default interface ChatArchive extends Document {
    admin: BaseAdmin,
    messages: {
        text: string,
        date: Date,
        from: string,
    }[],
    info: object,
    date: Date

}

const chatArchiveSchema = new Schema({
    admin: {
        type: ObjectId,
        required: true,
        ref: "admin"
    },
    date: {
        type: Date,
        required: true,
        default: () => {
            return new Date()
        }
    },
    messages: {
        type: [new Schema(
            {
                text: {
                    type: String,
                    required: true
                },
                date: {
                    type: Date,
                    required: true
                },
                from: {
                    type: String,
                    required: true
                },
            }
        )],
        required: true
    },
    info: {
        type: Object,
        required: true
    },
})


export const ChatArchiveModel = model<ChatArchive>('chatArchive', chatArchiveSchema)

