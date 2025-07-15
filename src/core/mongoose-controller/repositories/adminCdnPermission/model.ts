
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId
import {BaseAdmin} from '../admin/model'


export default interface AdminCdnPermission extends Document {
    admin: BaseAdmin,
    size: number,
    showType?: string[],
    uploadTypes?: string[],

}

const adminCdnPermissionSchema = new Schema({
    admin: {
        type: ObjectId,
        required: true,
        ref: "admin"
    },
    size: {
        type: "Number",
        required: true
    },
    showType: {
        type: [String],
        required: false
    },
    uploadTypes: {
        type: [String],
        required: false
    },
})


export const AdminCdnPermissionModel = model<AdminCdnPermission>('adminCdnPermission', adminCdnPermissionSchema)

