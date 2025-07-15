import { Schema, model, Document } from "mongoose"
import { BasePage } from "../../basePage/model"

export default interface Author extends BasePage {
    name: string,
    family: string,
    biography: string,
    image: string
}

const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    family: {
        type: String,
        required: true
    },
    biography: {
        type : String,
        required : true,
    },
    image : {
        type: String,
        required: false
    }
})

export const AuthorModel = model<Author>("author", authorSchema)