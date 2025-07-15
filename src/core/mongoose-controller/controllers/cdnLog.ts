import CacheService from "../../cache";
import BaseController from "../controller";
import CdnLog, { CdnLogModel } from "../repositories/cdnLog/model"
import CdnLogRepository from "../repositories/cdnLog/repository";





var cdnLog = new BaseController<CdnLog>("/cdnLog",
    new CdnLogRepository({
        cacheService : new CacheService("cdnLog")
    })
)
cdnLog.exclude("/cdnLog", "post")

cdnLog.addRouteWithMeta("es/search", "get", cdnLog.search.bind(cdnLog), BaseController.searcheMeta)

export default cdnLog