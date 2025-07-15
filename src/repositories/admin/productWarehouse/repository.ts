import { ProductwarehouseController } from "../../../apps/admin/controllers/productwarehouse";
import BaseRepositoryService from "../../../core/mongoose-controller/repository";
import { RepositoryConfigOptions } from "../../../core/mongoose-controller/repository";
import Productwarehouse, {
  ProductwarehouseModel,
} from "../../../repositories/admin/productWarehouse/model";

export default class ProductWarehouseRepository extends BaseRepositoryService<Productwarehouse> {
  constructor(options?: RepositoryConfigOptions) {
    super(ProductwarehouseModel, options);
  }
}

// const productwarehouse = new ProductwarehouseController(
//   "/productwarehouse",
//   new ProductWarehouseRepository(),
//   {}
// );
