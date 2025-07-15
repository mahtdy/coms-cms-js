
import { Schema, model, Document, Types } from "mongoose";
var ObjectId = Types.ObjectId
import FileManagerConfig from '../fileManagerConfig/model'


export interface PeriodConfig {
    hour?: number,
    minute?: number,
    hourly?: {
        hour: number,
        minute: number,
    }[],
    weekDays?: ("Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday")[],
    monthly?: {
        month: number,
        day: number
    }[]
}

export default interface Backup extends Document {
    cdn?: FileManagerConfig | Types.ObjectId | string,
    backupType: 'source' | 'database' | 'file' | 'full',

    isInternalDB: boolean,
    periodType: "hourly" | "daily" | "weekly" | "monthly" |"custom",
    periodConfig?: PeriodConfig,
    deletionSchedule: number,


    dbConfig?: DbConfig,
    server: string,
    path: string,
    status: "inProccess" | "proccessed" | "disabled" | "waiting"

}
interface DbConfig extends Document {
    type: 'mongodb' | 'postgresql'
    host: string,
    port: number,
    username: string,
    password: string,
    database: string,
    auth_db?: string
}


const backupSchema = new Schema({
    cdn: {
        type: ObjectId,
        required: false,
        ref: "fileManagerConfig"
    },
    backupType: {
        enum: ['source', 'database', 'file', 'full'],
        type: String,
        required: true
    },

    isInternalDB: {
        type: Boolean,
        required: true,
        default: true
    },
    periodType: {
        type: String,
        enum: ["hourly", "daily", "weekly", "monthly" ,"custom"],
        required: true
        // default : false
    },
    periodConfig: {
        type: Object,
        required: false
    },
    deletionSchedule: {
        type: Number,
        required: true,
        default: 10
    },

    dbConfig: {
        type: new Schema({
            type: {
                type: String,
                required: true,
                enum: [
                    'mongodb',
                    'postgresql'
                ]
            },
            host: {
                type: String,
                required: true
            },
            port: {
                type: Number,
                required: true
            },
            username: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            database: {
                type: String,
                required: true
            },
            auth_db: {
                type: String,
                required: false
            }
        }),
        required: false
    },
    path: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true,
        enum: [
            "waiting",
            "inProccess",
            "proccessed",
            "disabled"
        ],
        default: "waiting"
    },

})


export const BackupModel = model<Backup>('backup', backupSchema)

