
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId
import { BaseAdmin } from '../admin/model'
import FileManagerConfig from "../fileManagerConfig/model";


export default interface FileManagerPermission extends Document {
    admin: BaseAdmin | string,
    size: number,
    pathsPermission: {
        path: string,
        allowedActions: string[],
        showType?: string[],
        uploadTypes?: string[],
        recurcive?: boolean,
        status?: boolean
    }[],
    cdn: FileManagerConfig | string,
}

const fileManagerPermissionSchema = new Schema({
    admin: {
        type: ObjectId,
        required: true,
        ref: "admin"
    },
    size: {
        type: "Number",
        required: true
    },
    pathsPermission: {
        type: [
            new Schema({
                path: {
                    type: String,
                    required: true
                },
                allowedActions: {
                    type: [String],
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
                recurcive: {
                    type: Boolean,
                    required: true,
                    default :true
                },
                status: {
                    type: Boolean,
                    required: true,
                    default : true
                }
            })
        ],
        required: true,
        default: []
    },
    cdn: {
        type: ObjectId,
        required: true,
        ref: 'fileManagerConfig'
    }
})


export const FileManagerPermissionModel = model<FileManagerPermission>('fileManagerPermission', fileManagerPermissionSchema)

