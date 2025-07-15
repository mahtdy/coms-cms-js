import BaseRepositoryService, {
  RepositoryConfigOptions,
} from "../../../core/mongoose-controller/repository";
import Warehouse, { WarehouseModel } from "../warehouse/model";

export default class WarehouseRepository extends BaseRepositoryService<Warehouse> {
  constructor(options?: RepositoryConfigOptions) {
    super(WarehouseModel, options);
  }
}
