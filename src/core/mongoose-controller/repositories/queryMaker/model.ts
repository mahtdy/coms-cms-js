import { Document, Schema, model } from "mongoose";



export default interface QueryMaker extends Document{
    title: string,
    repoName : string,
    preset : boolean,
    limit: number,
    query ?: {
        field : string,
        filter : "eq"| "list"| "reg" | "gte" | "lte",
        data : any
    }[],
    exact ?: {
        filter  : "eq" | "list",
        data : any
    },
    fromOwn ?: any[],
    sort ?: {
        key : string,
        type : "-1" | "1"
    }
}

const queryMakerSchema = new Schema({
    title :{
        type : String,
        required : true
    },
    repoName : {
        type: String,
        required : true
    },
    preset:{
        type : Boolean,
        required : true,
        default : false
    },
    limit : {
        type: Number,
        required : true
    },
    query : {
        type : [Object],
        required : true,
        default : []
    },
    exact: {
        type : Object,
        required : false
    },
    fromOwn :{
        type: [Object],
        required : false
    },
    sort : {
        type : new Schema({
            key : {
                type : String,
                required : true
            },
            type : {
                type : String,
                required : true,
                enum : ["-1", "1"]
            }
        } , {
            _id : false
        }),
        required : false
    },
})

export const QueryMakerModel = model<QueryMaker>("query" , queryMakerSchema)
