import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository"
import BackupFile, { BackupFileModel } from "./model"


export default class BackupFileRepository extends BaseRepositoryService<BackupFile>{
    constructor(options ?: RepositoryConfigOptions){
        super(BackupFileModel, options )
    }
}