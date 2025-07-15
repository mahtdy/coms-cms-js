import BasketRepository from "../../../repositories/admin/basket/repository";
import BaseController, {
  ControllerOptions,
} from "../../../core/mongoose-controller/controller";
import Basket from "../../../repositories/admin/basket/model";
import { z } from "zod";
import { Types } from "mongoose";

export class BasketController extends BaseController<Basket> {
  constructor(
    baseRoute: string,
    repo: BasketRepository,
    options?: ControllerOptions
  ) {
    super(baseRoute, repo, options);
  }

  // initApis() {
  //   super.initApis();
  // }
}
const basket = new BasketController("/basket", new BasketRepository(), {
  insertSchema: z.object({
    product: BaseController.id,
    productwarehouse: BaseController.id,
    user: BaseController.id,
    price: z.coerce.number().positive().int(),
    quantity: z.coerce.number().positive().int().default(1),
  }),
});

export default basket;
