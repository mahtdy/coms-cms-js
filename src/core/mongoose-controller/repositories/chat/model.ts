
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId
import { BaseAdmin } from '../admin/model'
import BaseUser from '../user/model'


export default interface Chat extends Document {
    admin?: BaseAdmin | string,
    secondAdmin?: BaseAdmin | string,
    admins?: BaseAdmin[] | string[]
    user?: any,
    adminSockets?: string[],
    userSocket?: string,
    info?: {
        info: any,
        user?: BaseUser | Types.ObjectId,
        userInfo: any,
        page: string,
        views: number,
        lastView: Date,
        firstView: Date,
        lastPage: string,
        os: string,
        browser: string
    },
    notes?: {
        admin: Types.ObjectId,
        note: string,
        date: Date
    }[],
    isClosed: boolean
    isStart: boolean
    blocked: boolean
    userOnline?: boolean,
    userLastSeen?: Date,
    adminOnline: boolean,
    adminLastSeen?: Date,
    secondAdminOnline?: boolean,
    secondAdminLastSeen?: Date,
    userToken?: string,
    messages: any[]
}

const chatSchema = new Schema({
    admin: {
        type: ObjectId,
        required: false,
        ref: "admin"
    },
    secondAdmin: {
        type: ObjectId,
        required: false,
        ref: "admin"
    },
    admins: {
        type: [ObjectId],
        required: true,
        default: []
    },
    userSocket: {
        type: String,
        required: false
    },
    adminSockets: {
        type: [String],
        required: true,
        default: []
    },
    messages: {
        type: [
            new Schema(
                {
                    text: {
                        type: String,
                        required: false,
                        default : ""
                    },
                    date : {
                        type: Date,
                        required : true,
                        default : () => new Date()
                    }
                }
            )],
        required: true,
        default: []
    },
    info: {
        type: new Schema(
            {
                user: {
                    type: ObjectId,
                    required: false,
                    ref: "user"
                },
                ipInfo: {
                    type: Object,
                    required: true
                },
                userInfo: {
                    type: Object,
                    required: false
                },
                page: {
                    type: String,
                    required: false
                },
                views: {
                    type: Number,
                    required: true,
                    default: 1
                },
                lastView: {
                    type: Date,
                    required: true,
                    default: () => new Date()
                },
                firstView: {
                    type: Date,
                    required: true,
                    default: () => new Date()
                },
                lastPage: {
                    type: String,
                    required: false
                },
                os: String,
                browser: String

            },
            {
                _id: false
            }
        ),
        required: false
    },
    notes: {
        type: [new Schema({
            admin: {
                type: Types.ObjectId,
                required: true
            },
            note: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true,
                default: () => {
                    return new Date()
                }
            }
        })],
        required: true,
        default: []
    },
    isClosed: {
        type: Boolean,
        required: true,
        default: false
    },
    isStart: {
        type: Boolean,
        required: true,
        default: false
    },
    blocked: {
        type: Boolean,
        required: true,
        default: false
    },
    userOnline: {
        type: Boolean,
        required: false,
        default: true
    },
    userLastSeen: {
        type: Date,
        required: false
    },
    adminOnline: {
        type: Boolean,
        required: true,
        default: false
    },
    adminLastSeen: {
        type: Date,
        required: false
    },
    secondAdminOnline: {
        type: Boolean,
        required: false
    },
    secondAdminLastSeen: {
        type: Date,
        required: false
    },
    userToken: {
        type: String,
        required: false
    }

})


export const ChatModel = model<Chat>('chat', chatSchema)

