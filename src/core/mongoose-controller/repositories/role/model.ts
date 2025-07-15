import { Document, Types, Schema, model } from "mongoose";


export default interface Role extends Document {
    name: string,
    createAt: Date,
    parent?: Role | string | Types.ObjectId
}

var roleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        required: true,
        default: () => new Date()
    },
    parent: {
        type: Types.ObjectId,
        required: false,
        ref : "role"
    }
})

export var RoleModel = model<Role>("role", roleSchema)