
import BaseController from "../controller";
import BackupLog from "../repositories/backupLog/model";
import {z} from "zod"
import BackupLogRepository from "../repositories/backupLog/repository";
import CacheService from "../../cache";





var backupLog = new BaseController<BackupLog>("/backupLog",
    new BackupLogRepository({
        cacheService : new CacheService("backupLog")
    })
)
export default backupLog
