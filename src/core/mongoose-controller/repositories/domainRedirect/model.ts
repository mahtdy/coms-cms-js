import { Document, model, Schema, Types } from "mongoose";
import Domain from "../domain/model";


export default interface DomainRedirect extends Document{
    from:  Types.ObjectId | string,
    to :  Types.ObjectId | string,
    status : boolean
}

const domainRedirectSchema = new Schema({
    from: {
        type : Types.ObjectId,
        required: true,
        ref: "domain"
    },
    to : {
        type : Types.ObjectId,
        required: true,
        ref: "domain"
    },
    status : {
        type: Boolean,
        required : true,
        default : true
    }
})

export const DomainRedirectModel = model<DomainRedirect>("domain-redirect" , domainRedirectSchema)