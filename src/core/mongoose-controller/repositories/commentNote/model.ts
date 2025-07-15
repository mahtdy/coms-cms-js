

import { model, Schema, Types } from "mongoose";
import { Document } from "mongoose";


export default interface CommentNote extends Document{
    user : string,
    notes : {
        text : string,
        create : Date,
        admin : Types.ObjectId | string
    }[]
}

const commentNoteSchema  =  new Schema({
    user : {
        type: String,
        required : true,
    },
    notes: {
        type: [new Schema({
            text : String,
            create : {
                type:Date,
                default : () => new Date()
            },
            admin : {
                type : Types.ObjectId,
                required : false,
                ref : "admin"
            }
        })],
        required : true
    }
})

export const CommentNoteModel = model<CommentNote>("comment-note" ,commentNoteSchema)