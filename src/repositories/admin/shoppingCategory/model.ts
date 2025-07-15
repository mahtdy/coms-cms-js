import { Schema, Types } from "mongoose";
import {
  BasePage,
  basePageSchema,
} from "../../../core/mongoose-controller/basePage/model";
import Feature from "../feature/model";
import Category from "../../../core/mongoose-controller/repositories/category/model";

export default interface ShoppingCategory extends BasePage {
  features: {
    featureId: Feature | Types.ObjectId | string;
    isFilter: boolean;
  }[];
  catId: Category | Types.ObjectId | string;
}

let schema = { ...basePageSchema };

const shoppingCategorySchema = new Schema(
  Object.assign(
    {
      features: {
        type: [
          new Schema({
            featureId: {
              type: Types.ObjectId,
              required: true,
              ref: "feature",
            },
            isFilter: {
              type: Boolean,
              required: true,
            },
          }),
        ],
        required: true,
        default: [],
      },
      catId: {
        type: Types.ObjectId,
        required: true,
        ref: "category",
        unique: true,
      },
    },
    schema
  )
);
