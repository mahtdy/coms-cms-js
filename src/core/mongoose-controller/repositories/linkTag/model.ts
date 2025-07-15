
import { Schema, model, Document, Types, ObjectId } from "mongoose";
var ObjectId = Types.ObjectId


export default interface LinkTag extends Document {
    link: string | ObjectId,
    tag: string,

}

const linkTagSchema = new Schema({
    link: {
        type: ObjectId,
        required: true,
        unique : true,
        ref : "content"
    }, 
    tag: {
        type: String,
        required: true,
        unique : true
    },
})


export const LinkTagModel = model<LinkTag>('linkTag', linkTagSchema)

