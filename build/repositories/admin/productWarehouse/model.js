"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductwarehouseModel = void 0;
const mongoose_1 = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const productwarehouseSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Types.ObjectId,
        require: true,
        ref: "product",
    },
    warehouse: {
        type: mongoose_1.Types.ObjectId,
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
exports.ProductwarehouseModel = (0, mongoose_1.model)("productwarehouse", productwarehouseSchema);
