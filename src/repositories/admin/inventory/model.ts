import { Document, Schema, Types, model } from "mongoose";
import {
  BasePage,
  basePageSchema,
} from "../../../core/mongoose-controller/basePage/model";

export default interface Inventory extends BasePage {
  warehouse_id: Types.ObjectId | string;
  variant_id: Types.ObjectId | string;
  quantity: number;
  variant_price: number;
  purchase_price: number;
  min_stock_threshold: number;
  batch_number: string;
  last_updated: Date;
}

let inventorySchema = { ...basePageSchema };

const schema = Object.assign(
  {
    warehouse_id: {
      type: Types.ObjectId,
      ref: "warehouse",
      required: true,
    },
    variant_id: {
      type: Types.ObjectId,
      ref: "productvariant", // فرض می‌کنیم جدول واریانت محصول وجود دارد
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    variant_price: {
      type: Number,
      required: true,
      min: 0,
    },
    purchase_price: {
      type: Number,
      required: true,
      min: 0,
    },
    min_stock_threshold: {
      type: Number,
      required: true,
      min: 0,
      default: 10,
    },
    batch_number: {
      type: String,
      required: true,
      trim: true,
    },
    last_updated: {
      type: Date,
      default: Date.now,
    },
  },
  inventorySchema
);

const inventorySchemaObj = new Schema(schema);

// ایندکس‌های مهم برای عملکرد بهتر
inventorySchemaObj.index({ warehouse_id: 1, variant_id: 1, batch_number: 1 }, { unique: true });
inventorySchemaObj.index({ warehouse_id: 1 });
inventorySchemaObj.index({ variant_id: 1 });
inventorySchemaObj.index({ quantity: 1, min_stock_threshold: 1 });

export const InventoryModel = model<Inventory>("inventory", inventorySchemaObj);