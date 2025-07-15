import { model, Schema } from "mongoose";
import { Document, Types } from "mongoose";



export default interface UserComment extends Document{
    comment : string | Types.ObjectId | string,
    type: "like" |"dislike",
    clientId : string
}

const userCommentSchema =  new Schema({
    comment : {
        type: Types.ObjectId,
        required: true
    } , 
    type: {
        type: String,
        enum :["like" ,"dislike"]
    },
    clientId : {
        type: String,
        required : true
    }
})

export const UserCommentModel = model<UserComment>("user-comment" , userCommentSchema)