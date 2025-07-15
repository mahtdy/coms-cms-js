
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId
import BaseUser from '../../user/model'


export default interface ChatQueue extends Document {
    date: Date,
    socket: string,
    messages: {
        text: string,
        date: string,
    }[],
    info: {
        info?: object,
        user?: BaseUser,
        userInfo: object,
        page: string,
        os : string,
        browser : string,
        firstView: Date
    },
    token : string

}

const chatQueueSchema = new Schema({
    socket: {
        type: String,
        required: true
    },
    messages: {
        type: [
            new Schema(
                {
                    text: {
                        type: String,
                        required: true
                    },
                    date: {
                        type: String,
                        required: true,
                        default: () => {
                            return new Date(Date.now())
                        }
                    },
                }, { _id: false }
            )],
        required: true
    },
    info: {
        type: new Schema(
            {
                ipInfo: {
                    type: Object,
                    required: true
                },
                user: {
                    type: ObjectId,
                    required: false,
                    ref: "user"
                },
                userInfo: {
                    type: Object,
                    required: true
                },
                page: {
                    type: String,
                    required: true
                },
                firstView: {
                    type: Date,
                    required: true,
                    default : () => new Date()
                },
                os : String,
                browser : String
            }
        ),
        required: true
    },
    token : {
        type: String,
        required : true
    }
})


export const ChatQueueModel = model<ChatQueue>('chatQueue', chatQueueSchema)

