import { Document, Schema, model } from "mongoose";

export default interface PublishCycle extends Document{
    name: string,
    time : string
}

const publishCycleSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    time : {
        type : String,
        required : true
    }
})

export const PublishCycleModel = model<PublishCycle>("publish-cycle" , publishCycleSchema)