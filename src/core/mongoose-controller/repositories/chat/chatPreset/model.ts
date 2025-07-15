import { Document, Schema, model } from "mongoose";



export default interface ChatPreset extends Document {
    text: string,
    category: string
}

const chatPresetSchema = new Schema({
    text : {
        type: String,
        required : true
    },
    category : {
        type : String,
        required : true,
        default : ""
    }
})


export const ChatPresetModel = model<ChatPreset>("chatPreset", chatPresetSchema)