import BaseRepositoryService from "../repository";
import BaseController from "../controller";
import Log, { LogModel } from "../repositories/log/model";
import {z} from "zod"





var log = new BaseController<Log>("/log",
    new BaseRepositoryService<Log>(LogModel,{
    })
)
log.exclude("/log","post")

log.addRouteWithMeta("es/search", "get" , log.search.bind(log),BaseController.searcheMeta)

export default log