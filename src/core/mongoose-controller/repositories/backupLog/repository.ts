
import BackupLog, { BackupLogModel } from "./model";
import BaseRepositoryService , { RepositoryConfigOptions } from "../../repository";


export default class BackupLogRepository extends BaseRepositoryService<BackupLog> {
    constructor(options?: RepositoryConfigOptions) {
        super(BackupLogModel, options)
    }
}      

