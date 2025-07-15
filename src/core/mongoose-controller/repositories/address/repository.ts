import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import Address, { AddressModel } from "./model";

export default class AddressRepository extends BaseRepositoryService<Address>{
    constructor(options? : RepositoryConfigOptions){
        super(AddressModel, options)
    }
}