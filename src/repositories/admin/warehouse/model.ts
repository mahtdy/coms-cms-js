import { Document, model, Schema, Types } from "mongoose";
import Product from "../product/model";
import product from "../../../apps/admin/controllers/product";
import BaseUser from "../../../core/mongoose-controller/repositories/user/model";
const uniqueValidator = require("mongoose-unique-validator");

export default interface Warehouse extends Document {
  title: string;
  description: string;
  address: string;
  phone: number;
  manager: string | BaseUser;
  is_active: boolean;
}

const warehouseSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: false,
  },
  address: {
    type: String,
    require: false,
  },
  phone: {
    type: Number,
    require: true,
  },
  manager: {
    type: Types.ObjectId,
    required: true,
    ref: "user"
  },
  is_actvie: {
    type: Boolean,
    require: false,
  },

});

warehouseSchema.plugin(uniqueValidator, { message: "{PATH} is duplicated" });
export const WarehouseModel = model<Warehouse>("warehouse", warehouseSchema);
