import { Document, Schema, model } from "mongoose";

enum BlockType {
    "static",
    "dynamic"
}

interface ComponentObject {
    type: "text" | 'date' | "svg" | "img" | "object" | "array" | "number" | "boolean" | "enum" | "link" | "select" | "mixed",
    mixedTypes?: ("img" | "svg" | "text" | 'date' | "object" | "array" | "number" | "boolean" | "enum" | "link" | "select")[],
    selectList?: string[],
    dataFrom: "query" | "static",
    title?: string,
    key : string,
    min?: number,
    max?: number,
    requiredByOther?: {
        field: string,
        value: any
    }[],
    object?: ComponentObject[],
    arrayType?: "text" | 'date' | "object",
    queryFrom?: "article" | "category",
    required: boolean,
    linktypes?: ("svg" | "png" | "jpg" | "webp" | "jpeg")[],
    imageConfig?: {
        width: number,
        height: number,
        validTypes: ("png" | "jpg" | "webp" | "jpeg")[]
    },
    value ?: any
}

export interface DataMap {
    key: string
    type: "text" | 'date' | "svg" | "img" | "object" | "array" | "number" | "boolean" | "enum" | "component" | "link" | "select" | "mixed",
    mixedTypes?: ("img" | "svg" | "text" | 'date' | "object" | "array" | "number" | "boolean" | "enum" | "component" | "link" | "select")[]
    selectList?: string[],
    dataFrom: "query" | "static",
    title?: string,
    min?: number,
    max?: number,
    componentType?: "menu" | "hamberger",
    componentSubType?: string
    requiredByOther?: {
        field: string,
        value: any
    }[],
    object?: ComponentObject[],
    children?: DataMap[],
    arrayType?: "text" | 'date' | "object",
    queryFrom?: "article" | "category",
    block?: string,
    value?: any,
    required: boolean,
    linktypes?: ("svg" | "png" | "jpg" | "webp" | "jpeg")[],
    imageConfig?: {
        width: number,
        height: number
        validTypes: ("png" | "jpg" | "webp")[]
    }

}

export default interface Block extends Document {
    name: string
    dataType: BlockType,
    tsx: string,
    css: string,
    dataMap: DataMap[],
    childComponents: {
        path: string,
        componentType: string
    }[],
    blockSubType?: string
}

export const blockSchema = {
    name: {
        type: String,
        required: true,
        unique: true
    },
    dataType: {
        type: String,
        enum: BlockType,
        required: true
    },
    tsx: {
        type: String,
        required: true
    },
    css: {
        type: String,
        required: true
    },
    dataMap: {
        type: Object,
        required: true
    },
    childComponents: {
        type: [new Schema({
            path: {
                type: String,
                required: true
            },
            componentType: {
                type: String,
                required: true
            }
        }, {
            _id: false
        })],
        required: true,
        default: []
    },

    blockSubType: {
        type: String,
        required: false
    }
    // queries: {
    //     type : [new Schema({
    //         from: {
    //             type: String,
    //             required : false
    //         },
    //         filter : {
    //             type : Object,
    //             required : false

    //         },
    //         fromOwn: {
    //             type : new Schema({

    //                 path: {
    //                     type : String,
    //                     required : true
    //                 },
    //             } , {_id : false})
    //         },
    //         sort : {
    //             type : Object,
    //             required : false
    //         },
    //         limit : {
    //             type : Number,
    //             required : false
    //         } ,
    //         part : {
    //             type: String,
    //             require : false
    //         }
    //     })],
    //     required : false       
    // },
    // dataMapper: {

    // },
}


// const BlockModel = model<Block>("block", blockSchema)