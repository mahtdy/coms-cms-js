import { Document, Schema, model } from "mongoose";

export default interface BrandFeatureValue extends Document {}

const brandFeatureValueSchema = new Schema({
  title: {
    typee: String,
    reqired: true,
  },
  description: {
    type: String,
    required: false,
  },
  values: {
    type: [Object],
    required: true,
    default: [],
  },
});

export const BrandFeatureValueModel = model<BrandFeatureValue>(
  "brandFeatureValue",
  brandFeatureValueSchema
);
