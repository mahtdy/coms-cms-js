import {
  QueryInfo,
  RepositoryConfigOptions,
} from "../../../core/mongoose-controller/repository";
import BasePageRepository from "../../../core/mongoose-controller/basePage/repository";
import Warehouse, { WarehouseModel } from "./model";
import { Types } from "mongoose";

export default class WarehouseRepository extends BasePageRepository<Warehouse> {
  constructor(options?: RepositoryConfigOptions) {
    super({
      model: WarehouseModel,
      typeName: "warehouse",
      
      selectData: {
        name: 1,
        address: 1,
        phone_number: 1,
        manager_id: 1,
        capacity: 1,
        status: 1,
        insertDate: 1,
        updateDate: 1,
      },
      
      sort: {
        insertDate: {
          show: "تاریخ ایجاد",
        },
        name: {
          show: "نام انبار",
        },
      },
      ...options,
    });
  }

  /**
   * یافتن انبارهای فعال
   */
  async findActiveWarehouses(queryInfo?: QueryInfo): Promise<Warehouse[]> {
    return this.findAll(
      { status: 'active' },
      queryInfo,
      [{ path: "manager_id", select: "name email" }]
    );
  }

  /**
   * بررسی ظرفیت انبار
   */
  async checkCapacity(warehouseId: string | Types.ObjectId): Promise<boolean> {
    const warehouse = await this.findById(warehouseId);
    if (!warehouse) return false;
    
    // اینجا می‌توانید منطق بررسی ظرفیت را اضافه کنید
    // مثلاً مقایسه با موجودی فعلی
    return true;
  }

  /**
   * آمار انبار
   */
  async getWarehouseStats(warehouseId: string | Types.ObjectId) {
    // این متد بعداً با اتصال به جدول موجودی تکمیل می‌شود
    return {
      totalProducts: 0,
      totalValue: 0,
      lowStockItems: 0,
    };
  }
}