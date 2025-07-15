
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId
import {BaseAdmin} from '../admin/model'
import Article from '../article/model'

export enum TaskType {
    "T&D" = "title&description",
    "createNewContent" = "createNewContent",
    "editContent" = "editContent",
    "linkToMasterPage" = "linkToMasterPage"
}

export enum TaskStatus {
    "finished" = "finished",
    "inProcess" = "inProcess",
    "ready" = "ready",
    "waitForCheck" = "waitForCheck",
    "done" = "done",
    "rejected" = "rejected"
}
export default interface SeoTask extends Document {
    date: Date,
    dateOfDuty?: Date,
    assigner?: BaseAdmin | string,
    assigned?: BaseAdmin | string,
    type: TaskType,
    status: TaskStatus,
    taskInfo?: any,
    page?: string,
    article?: Article | Types.ObjectId | string
}

const seoTaskSchema = new Schema(
    {
        date: {
            type: Date,
            required: true,
            default: () => {
                return new Date()
            }
        },
        dateOfDuty: {
            type: Date,
            required: false
        },
        assigner: {
            type: ObjectId,
            required: false,
            ref: "admin"
        },
        assigned: {
            type: ObjectId,
            required: false,
            ref: "admin"
        },
        type: {
            type: String,
            required: true,
            enum: TaskType
        },
        status: {
            type: String,
            required: true,
            enum: TaskStatus
        },
        taskInfo: {
            type: Object,
            required: false
        },
        page: {
            type: String,
            requierd: false
        },
        article: {
            type: Types.ObjectId,
            required: false,
            ref: "article"
        }
    })


export const SeoTaskModel = model<SeoTask>('seoTask', seoTaskSchema)

