
import LoginHistory, { LoginHistoryModel } from "./model";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";


export default class LoginHistoryRepository extends BaseRepositoryService<LoginHistory> {
    constructor(options? :RepositoryConfigOptions) {
        super(LoginHistoryModel , options)
    }
}
