import { Schema, model, Document, Types }
    from "mongoose";
export default interface BlockList extends Document {
    ip?: string,
    expireDate: Date,
    id: any,
    owner: string,
    step: number
}
const blockListSchema = new Schema(
    {
        ip: {
            type: String,
            required: false,
            validate: function (value: string) {
                // if (!IP.validateIP(value)) {
                //     throw new Error("آدرس آی پی نامعتبر است")
                // } 
            }
        },
        expireDate: {
            type: Date,
            required: true
        },
        id: {
            type: Types.ObjectId,
            required: true
        },
        owner: {
            type: String,
            required: true,
            enum: ["user", "admin"]
        },
        step: {
            type: Number,
            required: true, default: 1
        }
    })
export const BlockListModel = model<BlockList>("blockList", blockListSchema)