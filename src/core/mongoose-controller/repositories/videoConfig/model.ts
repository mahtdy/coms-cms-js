
import { Document, Schema, model } from "mongoose"
export default interface VideoConfig extends Document {
    lable: string,
    configs: any[]
}

const videoConfigSchema = new Schema({
    lable: {
        type : String,
        required : true
    },
    configs: {
        type : [Object],
        required : true
    }
})


export const VideoConfigModel = model<VideoConfig>("video-config",videoConfigSchema)