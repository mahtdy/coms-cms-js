import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import DomainRedirect, { DomainRedirectModel } from "./model";



export default class DomainRedirectRepository extends BaseRepositoryService<DomainRedirect>{
    constructor(options? : RepositoryConfigOptions){
        super(DomainRedirectModel, options)
    }
}