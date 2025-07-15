
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId


export default interface TicketPreTextCategory extends Document {
    title: string,

}

const ticketPreTextCategorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
})


export const TicketPreTextCategoryModel = model<TicketPreTextCategory>('ticketPreTextCategory', ticketPreTextCategorySchema)

