
import { Model } from "mongoose";
import CustomerCategory, { CustomerCategoryModel } from "./model";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";


export default class CustomerCategoryRepository extends BaseRepositoryService<CustomerCategory> {
    constructor(options ? : RepositoryConfigOptions) {
        super(CustomerCategoryModel, options)
    }
}      
