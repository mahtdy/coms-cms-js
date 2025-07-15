import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import { CDN_Operation, CDN_OperationModel } from "./model";




export default class CDN_OperationRepository extends BaseRepositoryService<CDN_Operation>{
    constructor(options? : RepositoryConfigOptions){
        super(CDN_OperationModel,options)
    }
}