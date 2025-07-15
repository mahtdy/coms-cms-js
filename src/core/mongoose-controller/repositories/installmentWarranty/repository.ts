import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import InstallmentWarranty, { InstallmentWarrantyModel } from "./model";


export default class InstallmentWarrantyRepository extends BaseRepositoryService<InstallmentWarranty>{
    constructor(options?: RepositoryConfigOptions) {
        super(InstallmentWarrantyModel, options);
    }
}