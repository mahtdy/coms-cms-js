"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseModel = void 0;
const mongoose_1 = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const warehouseSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "user"
    },
    is_actvie: {
        type: Boolean,
        require: false,
    },
});
warehouseSchema.plugin(uniqueValidator, { message: "{PATH} is duplicated" });
exports.WarehouseModel = (0, mongoose_1.model)("warehouse", warehouseSchema);
