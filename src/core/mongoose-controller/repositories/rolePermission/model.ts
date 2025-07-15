import { Document, Schema, Types, model } from "mongoose";
import Role from "../role/model";
import Action from "../action/model";


export default interface RolePermission extends Document {
    role: Role | string,
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

var RolePermissionSchema = new Schema({
    role: {
        type: Types.ObjectId,
        required: true
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

export var RolePermissionModel = model<RolePermission>("rolePermission", RolePermissionSchema)