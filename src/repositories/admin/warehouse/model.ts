import { Document, Schema, Types, model } from "mongoose";
import {
  BasePage,
  basePageSchema,
} from "../../../core/mongoose-controller/basePage/model";

export default interface Warehouse extends BasePage {
  name: string;
  address: string;
  phone_number: string;
  manager_id: Types.ObjectId | string;
  capacity: number;
  status: 'active' | 'inactive';
}

let warehouseSchema = { ...basePageSchema };

const schema = Object.assign(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    manager_id: {
      type: Types.ObjectId,
      ref: "admin",
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  warehouseSchema
);

const warehouseSchemaObj = new Schema(schema);

// ایندکس برای بهبود عملکرد
warehouseSchemaObj.index({ status: 1 });
warehouseSchemaObj.index({ manager_id: 1 });

export const WarehouseModel = model<Warehouse>("warehouse", warehouseSchemaObj);