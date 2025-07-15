import { Document, Schema, model } from "mongoose"


export default interface ContentQueue extends Document{
    data : any
}


const contentQueueSchema = new Schema({
    data : {
        type : Object,
        required : true
    }
})

export const ContentQueueModel = model<ContentQueue>("content-queue",contentQueueSchema)