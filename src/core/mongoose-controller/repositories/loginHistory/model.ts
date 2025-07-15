
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId


export default interface LoginHistory extends Document {
    count: number,
    id: any,
    owner: string,

}

const loginHistorySchema = new Schema({
    count: {
        type: "Number",
        required: true
    },
    id: {
        type: ObjectId,
        required: true,
        refPath: "owner"
    },
    owner: {
        type: String,
        required: true,
        enum: ["admin", "user"]
    }
})


export const LoginHistoryModel = model<LoginHistory>('loginHistory', loginHistorySchema)

