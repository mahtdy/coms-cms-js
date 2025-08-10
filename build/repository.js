"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = __importDefault(require("../../../core/mongoose-controller/basePage/repository"));
const model_1 = require("./model");
class WarehouseRepository extends repository_1.default {
    constructor(options) {
        super({
            model: model_1.WarehouseModel,
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
    async findActiveWarehouses(queryInfo) {
        return this.findAll({ status: 'active' }, queryInfo, [{ path: "manager_id", select: "name email" }]);
    }
    /**
     * بررسی ظرفیت انبار
     */
    async checkCapacity(warehouseId) {
        const warehouse = await this.findById(warehouseId);
        if (!warehouse)
            return false;
        // اینجا می‌توانید منطق بررسی ظرفیت را اضافه کنید
        // مثلاً مقایسه با موجودی فعلی
        return true;
    }
    /**
     * آمار انبار
     */
    async getWarehouseStats(warehouseId) {
        // این متد بعداً با اتصال به جدول موجودی تکمیل می‌شود
        return {
            totalProducts: 0,
            totalValue: 0,
            lowStockItems: 0,
        };
    }
}
exports.default = WarehouseRepository;
