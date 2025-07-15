import { Document, Schema, Types, model } from "mongoose";
import Action from "../action/model";
import { BaseAdmin } from "../admin/model";


export default interface AdminPermission extends Document {
    admin: BaseAdmin | string,
    allowedActions: string[] | Action[] |Types.ObjectId[],
    schemaFilter: {
        dbSchema: string | Types.ObjectId,
        allowed: string[]
    }[],
    moduleAction : {
        subPart : string,
        config : {
            [x : string] : any
        }
    }[]
}


var AdminPermissionSchema = new Schema({
    admin: {
        type: Types.ObjectId,
        required: true,
        ref : "admin"
    },
    allowedActions: {
        type: [Types.ObjectId],
        required: true,
        default : [],
        ref: "action"
    },
    schemaFilter: {
        type: [
            new Schema({
                dbSchema: {
                    type: Types.ObjectId,
                    required: true,
                    ref : "dbSchema"
                },
                allowed: {
                    type: [String],
                    required: true,
                    default: []
                }
        }, {
            _id : false
        })],
        required : true,
        default : []
    },
    moduleAction : {
        type : [
            new Schema({
                subPart : {
                    type : String,
                    required : true
                },
                config : {
                    type : Object,
                    required : true,
                    default : {}
                }
            })
        ],
        required: true,
        default : []
    }
})

export var AdminPermissionModel = model<AdminPermission>("adminPermission", AdminPermissionSchema)