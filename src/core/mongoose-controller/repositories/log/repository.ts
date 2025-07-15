
import Log, { LogModel } from "./model";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";


export default class LoginHistoryRepository extends BaseRepositoryService<Log> {
    constructor(options? :RepositoryConfigOptions) {
        super(LogModel,options)
    }
}
