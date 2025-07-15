import { Document, Schema, model } from "mongoose";



export default interface Feature extends Document{
    title : string,
    description? : string,

    values: any[]

} 

const featureSchema = new Schema({
  title :{
    type : String,
    required: true,
  },
  description : {
    type : String,
    required: false
  },
  values: {
    type: [Object],
    required: true,
    default :[]
  }
})  

export const FeatureModel = model<Feature>("feature" , featureSchema)