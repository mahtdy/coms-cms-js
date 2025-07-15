import { Document, Schema, Types, model } from "mongoose";
import Category from "../../../core/mongoose-controller/repositories/category/model";
import {
  BasePage,
  basePageSchema,
} from "../../../core/mongoose-controller/basePage/model";
import Brand from "../brand/model";
// import Category from "../shoppingCategory/model";

export default interface Product extends BasePage {
  title: string;
  price: number;
  image: string;
  description: string;
  brand: Brand | Types.ObjectId | string;
  features: {
    id: Types.ObjectId;
    values: any[];
  }[];
}

let pschema = { ...basePageSchema };

const schema = Object.assign(
  {
    title: String,
    price: Number,
    image: String,
    description: String,
    category:  {
        type: Types.ObjectId,
        required: true,
        ref: "category",
    },
    addrresses: [
      new Schema(
        {
          f1: String,
        },
        {
          // _id: false
        }
      ),
    ],
    passportInfo: new Schema(
      {},
      {
        _id: false,
      }
    ),
    brand: {
      type: Types.ObjectId,
      required: true,
      ref: "brand",
    },
    features: {
      type: [
        new Schema(
          {
            id: Types.ObjectId,
            values: [Object],
          },
          {
            _id: false,
          }
        ),
      ],
    },
  },
  pschema
);

const productSchema = new Schema(schema);

export const ProductModel = model<Product>("product", productSchema);
