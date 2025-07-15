import BaseRepositoryService from "../../../core/mongoose-controller/repository";
import { RepositoryConfigOptions } from "../../../core/mongoose-controller/repository";
import Discount, { DiscountModel } from "../../../repositories/admin/discount/model";

export default class DiscountRepository extends BaseRepositoryService<Discount> {
    constructor(options?: RepositoryConfigOptions) {
        super(DiscountModel, options);
    }
}
