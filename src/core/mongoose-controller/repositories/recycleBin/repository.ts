import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import RecycleBin, { RecycleBinModel } from "./model";



export default class RecycleBinRepository extends BaseRepositoryService<RecycleBin>{
    constructor(options ?: RepositoryConfigOptions){
        super(RecycleBinModel, options)
    }
}