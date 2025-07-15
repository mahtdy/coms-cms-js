import { Schema, Types, model } from "mongoose";
// import {  basePageSchema } from "../../basePage";
import Category from "../category/model";
import { BasePage, basePageSchema } from "../../basePage/model";



export default interface CategoryContent extends BasePage {
    catID: string | Category,
    title: string,
    mainImage ?: string,
    summary : string,
    content : string,
    lable : string
} 

let schema = {...basePageSchema}

const categoryContentSchema = new Schema(Object.assign(schema,{
    catID: {
        type : Types.ObjectId,
        required : true,
        ref : "category"
    },
    title: {
        type : String,
        required : true
    },
    mainImage : {
        type : String,
        required : false
    },
    summary : {
        type : String,
        required : true
    },
    content :  {
        type : String,
        required : false
    },
    module : {
        type:String,
        default : "categoryContent"
    }
})) 


export const CategoryContentModel = model<CategoryContent>("categoryContent",categoryContentSchema)