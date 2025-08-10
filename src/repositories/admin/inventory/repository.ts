import {
  QueryInfo,
  RepositoryConfigOptions,
} from "../../../core/mongoose-controller/repository";
import BasePageRepository from "../../../core/mongoose-controller/basePage/repository";
import Inventory, { InventoryModel } from "./model";
import { Types } from "mongoose";

export default class InventoryRepository extends BasePageRepository<Inventory> {
  constructor(options?: RepositoryConfigOptions) {
    super({
      model: InventoryModel,
      typeName: "inventory",
      
      selectData: {
        warehouse_id: 1,
        variant_id: 1,
        quantity: 1,
        variant_price: 1,
        purchase_price: 1,
        min_stock_threshold: 1,
        batch_number: 1,
        last_updated: 1,
      },
      
      sort: {
        last_updated: {
          show: "آخرین به‌روزرسانی",
        },
        quantity: {
          show: "موجودی",
        },
      },
      ...options,
    });
  }

  /**
   * یافتن موجودی بر اساس انبار
   */
  async findByWarehouse(
    warehouseId: string | Types.ObjectId,
    queryInfo?: QueryInfo
  ): Promise<Inventory[]> {
    return this.findAll(
      { warehouse_id: warehouseId },
      queryInfo,
      [
        { path: "warehouse_id", select: "name" },
        { path: "variant_id", select: "color size material product_id" }
      ]
    );
  }

  /**
   * یافتن موجودی کم
   */
  async findLowStock(warehouseId?: string | Types.ObjectId): Promise<Inventory[]> {
    const filter: any = {
      $expr: { $lt: ["$quantity", "$min_stock_threshold"] }
    };
    
    if (warehouseId) {
      filter.warehouse_id = warehouseId;
    }

    return this.findAll(filter, {}, [
      { path: "warehouse_id", select: "name" },
      { path: "variant_id", select: "color size material product_id" }
    ]);
  }

  /**
   * به‌روزرسانی موجودی
   */
  async updateStock(
    warehouseId: string | Types.ObjectId,
    variantId: string | Types.ObjectId,
    batchNumber: string,
    quantityChange: number,
    reason: string
  ): Promise<Inventory | null> {
    const inventory = await this.findOne({
      warehouse_id: warehouseId,
      variant_id: variantId,
      batch_number: batchNumber,
    });

    if (!inventory) {
      throw new Error("موجودی یافت نشد");
    }

    const newQuantity = inventory.quantity + quantityChange;
    if (newQuantity < 0) {
      throw new Error("موجودی کافی نیست");
    }

    const updatedInventory = await this.editById(inventory._id, {
      $set: {
        quantity: newQuantity,
        last_updated: new Date(),
      }
    });

    // ثبت در تاریخچه (بعداً پیاده‌سازی می‌شود)
    await this.recordInventoryHistory(
      inventory._id,
      quantityChange > 0 ? 'purchase' : 'sale',
      quantityChange,
      batchNumber,
      reason
    );

    return updatedInventory;
  }

  /**
   * ثبت تاریخچه موجودی
   */
  private async recordInventoryHistory(
    inventoryId: string | Types.ObjectId,
    changeType: 'purchase' | 'sale' | 'transfer' | 'adjustment',
    quantityChanged: number,
    batchNumber: string,
    reason: string
  ): Promise<void> {
    // این بخش بعداً با مدل InventoryHistory تکمیل می‌شود
    console.log(`History recorded: ${changeType}, ${quantityChanged}, ${reason}`);
  }

  /**
   * بررسی موجودی کافی
   */
  async checkAvailableStock(
    warehouseId: string | Types.ObjectId,
    variantId: string | Types.ObjectId,
    batchNumber: string,
    requiredQuantity: number
  ): Promise<boolean> {
    const inventory = await this.findOne({
      warehouse_id: warehouseId,
      variant_id: variantId,
      batch_number: batchNumber,
    });

    return inventory ? inventory.quantity >= requiredQuantity : false;
  }

  /**
   * محاسبه ارزش کل موجودی
   */
  async calculateTotalValue(warehouseId?: string | Types.ObjectId): Promise<number> {
    const match: any = {};
    if (warehouseId) {
      match.warehouse_id = new Types.ObjectId(warehouseId);
    }

    const result = await InventoryModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: null,
          totalValue: {
            $sum: { $multiply: ["$quantity", "$variant_price"] }
          }
        }
      }
    ]);

    return result.length > 0 ? result[0].totalValue : 0;
  }
}