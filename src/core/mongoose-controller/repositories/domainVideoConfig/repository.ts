import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import DomainVideoConfig, { DomainVideoConfigModel } from "./model";



export default class DomainVideoConfigRepository extends BaseRepositoryService<DomainVideoConfig>{
    constructor(options ?: RepositoryConfigOptions){
        super(DomainVideoConfigModel, options)
    }
}