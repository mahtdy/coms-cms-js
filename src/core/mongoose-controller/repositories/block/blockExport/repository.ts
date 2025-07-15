import BaseRepositoryService, { RepositoryConfigOptions } from "../../../repository"
import BlockExport, { BlockExportModel } from "./model";


export default class BlockExportRepository extends BaseRepositoryService<BlockExport>{
    constructor(options ?: RepositoryConfigOptions){
        super(BlockExportModel,options)
    }
}