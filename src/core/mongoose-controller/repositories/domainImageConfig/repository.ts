import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import DomainImageConfig, { DomainImageConfigModel } from "./model";



export default class DomainImageConfigRepository extends BaseRepositoryService<DomainImageConfig>{
    constructor(options ?: RepositoryConfigOptions){
        super(DomainImageConfigModel, {
            
        })
    }
}