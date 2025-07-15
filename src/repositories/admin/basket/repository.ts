import BaseRepositoryService from "../../../core/mongoose-controller/repository";
import { RepositoryConfigOptions } from "../../../core/mongoose-controller/repository";
import Basket, { BasketModel } from "../../../repositories/admin/basket/model";

export default class BasketRepository extends BaseRepositoryService<Basket> {
  constructor(options?: RepositoryConfigOptions) {
    super(BasketModel, options);
  }
}
