import { Document, model, Schema, Types } from "mongoose";
import ProductWarehouse from "../productWarehouse/model";
import productwarehouse from "../../../apps/admin/controllers/productwarehouse";
import Product from "../product/model";
import Warehouse from "../warehouse/model";
import {date} from "zod";
import {time} from "speakeasy";
const uniqueValidator = require("mongoose-unique-validator");

export default interface Productwarehouse extends Document {
  product: string | Product;
  warehouse: string | Warehouse;
  config: object;
  lastUpdated: string;
  price: number;
  purchasePrice: number;
  minStockThreshold: number;
  quantity: number;
  // cost: number;
}

const productwarehouseSchema = new Schema({
  product: {
    type: Types.ObjectId,
    require: true,
    ref: "product",
  },

  warehouse: {
    type: Types.ObjectId,
    require: true,
    ref: "warehouse",
  },
  config: {
    type: Object,
    require: false,
  },
  lastUpdated: {
    type: String,
    require: false,
  },
  price: {
    type: Number,
    require: true,
  },
  purchasePrice: {
    type: Number,
    require: true,
  },
  minStockThreshold: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  // cost: {
  //   type: Number,
  //   required: true,
  //   default: 0
  // },
});

productwarehouseSchema.plugin(uniqueValidator, {
  message: "{PATH} is duplicated",
});
export const ProductwarehouseModel = model<Productwarehouse>(
  "productwarehouse",
  productwarehouseSchema
);
