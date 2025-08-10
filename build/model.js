"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseModel = void 0;
const mongoose_1 = require("mongoose");
const model_1 = require("../../../core/mongoose-controller/basePage/model");
let warehouseSchema = { ...model_1.basePageSchema };
const schema = Object.assign({
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
        type: mongoose_1.Types.ObjectId,
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
}, warehouseSchema);
const warehouseSchemaObj = new mongoose_1.Schema(schema);
// ایندکس برای بهبود عملکرد
warehouseSchemaObj.index({ status: 1 });
warehouseSchemaObj.index({ manager_id: 1 });
exports.WarehouseModel = (0, mongoose_1.model)("warehouse", warehouseSchemaObj);
