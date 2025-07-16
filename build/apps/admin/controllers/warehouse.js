"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseController = void 0;
const controller_1 = __importDefault(require("../../../core/mongoose-controller/controller"));
const repository_1 = __importDefault(require("../../../repositories/admin/warehouse/repository"));
const zod_1 = require("zod");
class WarehouseController extends controller_1.default {
    constructor(baseRoute, repo, options) {
        super(baseRoute, repo, options);
    }
    initApis() {
        super.initApis();
    }
}
exports.WarehouseController = WarehouseController;
const warehouse = new WarehouseController("/warehouse", new repository_1.default(), {
    insertSchema: zod_1.z.object({
        title: zod_1.z.string(),
        description: zod_1.z.string().max(250).default("digital warehouse"),
        address: zod_1.z.string().max(500).default("tehran"),
        phone: zod_1.z.string().max(11).default("09123334444"),
        manager: controller_1.default.id,
        is_actvie: (0, zod_1.boolean)().default(true),
        // created_at: z.timestamp without time zone,
    }),
});
exports.default = warehouse;
// console.log("shah meyti");
// data: any
// ) {
//   return this.editById(
//     id,
//     {
//       $set: data,
//     },
//     {
//       ok: true,
//     }
//   );
// }
