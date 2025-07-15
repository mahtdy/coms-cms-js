import BaseRepositoryService, { RepositoryConfigOptions } from "../../../repository";
import PSI_Log, { PSI_LogModel } from "./model";



export default class PSI_LogRepository extends BaseRepositoryService<PSI_Log>{
    constructor(options? : RepositoryConfigOptions){
        super(PSI_LogModel, options)
    }
}