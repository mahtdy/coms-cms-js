
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId
import TicketPreTextCategory from '../ticketPreTextCategory/model'


export default interface TicketPreText extends Document {
    text: string,
    category: TicketPreTextCategory | string | Types.ObjectId,

}

const ticketPreTextSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    category: {
        type: ObjectId,
        required: true,
        ref: "ticketPreTextCategory"
    },
})


export const TicketPreTextModel = model<TicketPreText>('ticketPreText', ticketPreTextSchema)

