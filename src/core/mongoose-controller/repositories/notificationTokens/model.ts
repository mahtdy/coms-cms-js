import { Document, model, Schema, Types } from "mongoose";



export default interface NotificationToken extends Document{
    domain : string | Types.ObjectId,
    config : any,
    type : "web-push" 
}
const notificationTokenSchema = new Schema({
    domain:{
        type : Types.ObjectId,
        required : true
    },
    config : {
        type : Object,
        required : true
    },
    type : {
        type : String,
        required : true,
        default : "web-push"
    }
})

export const NotificationTokenModel = model<NotificationToken>("notification-token" , notificationTokenSchema)