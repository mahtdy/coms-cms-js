import { model, Schema, Types } from "mongoose";
import { Document } from "mongoose";


export default interface ContentGroup extends Document{
    ids :  (Types.ObjectId | string) [],
    type : string
}

const contentGroupSchema  =  new Schema({
    ids : {
        type: [Types.ObjectId],
        required : true,
        default : []
    },
    type: {
        type: String,
        required : true
    }
})

export const ContentGroupModel = model<ContentGroup>("content-group" ,contentGroupSchema)