
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId


export default interface UserSocket extends Document {
    token: string,
    socket: string,

}

const userSocketSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    socket: {
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
})


export const UserSocketModel = model<UserSocket>('userSocket', userSocketSchema)

