import { Document, Schema, model } from "mongoose"


export default interface PaymentConfigPreText extends Document {
    text : string
}



const paymentConfigPreTextSchema = new Schema({
    text : {
        type: String,
        required : false
    }
})

export const PaymentConfigPreTextModel = model<PaymentConfigPreText>("payment-config-pretext" , paymentConfigPreTextSchema)