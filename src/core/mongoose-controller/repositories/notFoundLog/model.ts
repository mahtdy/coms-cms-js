
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId


export default interface NotFoundLog extends Document {
    url: string,
    date: Date,
    count : number
}

const notFoundLogSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    lastDate: {
        type: Date,
        required: true,
        default : () => {
            return new Date()
        }
    },
    count : {
        type : Number ,
        required : true,
        default : 1
    }
})


export const NotFoundLogModel = model<NotFoundLog>('notFoundLog', notFoundLogSchema)

