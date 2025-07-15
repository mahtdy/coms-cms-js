
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId
import BaseUser from '../../user/model'


export default interface ChatCheckList extends Document {
    date: Date,
    messages: {
        text: string,
        date: Date,
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

const chatCheckListSchema = new Schema({
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
            }
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
    checked: {
        type: Boolean,
        required: false,
        default: false
    },
    token : {
        type: String,
        required : true
    }
})


export const ChatCheckListModel = model<ChatCheckList>('chatCheckList', chatCheckListSchema)

