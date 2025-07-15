
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId


export default interface FileUses extends Document {
    file: string,
    useType: "inside" | "outside",
    data: any,
    source: string
}

const fileUsesSchema = new Schema({
    file: {
        type: String,
        required: true
    },
    useType: {
        type: String,
        required: true,
        enum: [
            'inside',
            'outside'
        ]
    },
    data: {
        type: ObjectId,
        required: function(value: any) {
            if (this.useType == "inside")
                return true
            return false
        },
        refPath: 'source'
    },
    source: {
        type: String,
        required: function(value: any) {
            if (this.useType == "inside")
                return true
            return false
        },
    }
})


export const FileUsesModel = model<FileUses>('fileUses', fileUsesSchema)

