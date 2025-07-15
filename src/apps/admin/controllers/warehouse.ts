import Warehouse from "../../../repositories/admin/warehouse/model";
import BaseController, {
  ControllerOptions,
} from "../../../core/mongoose-controller/controller";
import WarehouseRepository from "../../../repositories/admin/warehouse/repository";
import { Put } from "../../../core/decorators/method";
import { Query, Body } from "../../../core/decorators/parameters";
import {boolean, z} from "zod";
import {now} from "moment-jalaali";

export class WarehouseController extends BaseController<Warehouse> {
  constructor(
    baseRoute: string,
    repo: WarehouseRepository,
    options?: ControllerOptions
  ) {
    super(baseRoute, repo, options);
  }

  initApis() {
    super.initApis();
  }

  // @Put("/update", {
  //   absolute: true,
  // })
  // async update()
  // @Query({
  //   destination: "id",
  //   schema: BaseController.id,
  // })
  // id: string,
  // @Body({
  //   schema: z.object({
  //     title: z.string(),
  //     description: z.string().max(250).default("digital warehouse"),
  //     address: z.string().max(500).default("tehran"),
  //     phone: z.string().max(11).default("09123334444"),
  //   }),
  // })
  // data: {
  //   title: string;
  //   description: string;
  //   address: string;
  //   phone: string;
  // }
  // {
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
}
const warehouse = new WarehouseController(
  "/warehouse",
  new WarehouseRepository(),
  {
    insertSchema: z.object({
      title: z.string(),
      description: z.string().max(250).default("digital warehouse"),
      address: z.string().max(500).default("tehran"),
      phone: z.string().max(11).default("09123334444"),
      manager: BaseController.id,
      is_actvie: boolean().default(true),
      // created_at: z.timestamp without time zone,
    }),
  }
);
export default warehouse;

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
