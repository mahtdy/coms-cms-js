import { Document, Schema, Types, model } from "mongoose";


interface Collection {
    [key: string]: {
        sub?: Collection,
        visible: 0 | 1 | 2,
        persianName: string,
        canEdit: boolean
    }
}

export default interface DBSchema extends Document {
    collectionName: string,
    collectionSchema: any,
    persianName: string,
    subPart: string

}

const collectionSchema = new Schema({
    sub: {
        type: Object,
        required: false
    },
    visible: {
        type: String,
        required: true,
        enum: ["0", "1", "2"],
        default : 1
    },
    persianName : {
        type: String,
        required : true
    },
    canEdit : {
        type : Boolean,
        required : true,
        default : true
    }
}, {
    _id : false
})


const dbSchema = new Schema({
    collectionName: {
        type: String,
        required: true,
        unique: true
    },
    collectionSchema: {
        type: Map,
        of : collectionSchema,
        required: true,
    },
    persianName: {
        type: String,
        required: true,
    },
    subPart: {
        type: String,
        required: true
    }
})

export var DBSchemaModel = model<DBSchema>("dbSchema", dbSchema)