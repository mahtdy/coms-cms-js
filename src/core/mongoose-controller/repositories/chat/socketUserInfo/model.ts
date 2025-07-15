
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId


export default interface SocketUserInfo extends Document {
    socket: string,
    info: any,

}

const socketUserInfoSchema = new Schema({
    socket: {
        type: String,
        required: true
    },
    info: {
        type: Object,
        required: true
    },
})


export const SocketUserInfoModel = model<SocketUserInfo>('socketUserInfo', socketUserInfoSchema)

