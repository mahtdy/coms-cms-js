import { Document, Schema, Types, model } from "mongoose";
import Template from "../template/model";
import Language from "../language/model";

interface Box {
    children : Box[],
    design : "horizontal" | "vertical" | "base",
    size : number,
    css : {
        internal ?: any,
        external ?: any
    }
    // conte
}

export default interface TemplateConfig extends Document{
    template : Template | string,
    language ?: Language | string,
    type :"general" | "gallery" | "video" | "podcast" | "category_faq" | "increamental",
    imageConfig : {
        name : string,
        resolotion : {
            h : number,
            w : number
        },
        compersionConfig ?: any
    }[],
    body: {
        children: [],
        design : "horizontal" | "vertical",
        size : number
        
    }
}

const templateConfigSchema = new Schema({
    template : {
        type : Types.ObjectId,
        required : true,
        ref : "template"
    },
    language : {
        type: Types.ObjectId,
        required : false,
        ref : "language"
    },
    type : {
        type: String,
        required : true,
        enum : ["general" , "gallery" , "video" , "podcast" , "category_faq" , "increamental"]
    },
    imageConfig : {
        type : [new Schema({
            name : {
                type : String,
                required : true
            },
            resolotion : new Schema( {
                h : {
                    type : Number,
                    required : true,
                },
                w :  {
                    type : Number,
                    required : true
                }
            } , {
                _id : false
            }),
            compersionConfig :{
                type: Object ,
                required : false
            }
        },{
            _id : false
        })],
        required : true,
        default : []
    }
})


export const TemplateConfigModel =  model<TemplateConfig>("templateConfig" , templateConfigSchema)