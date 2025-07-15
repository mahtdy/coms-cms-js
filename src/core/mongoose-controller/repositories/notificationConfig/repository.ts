import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import NotificationConfig, { NotificationConfigModel } from "./model";



export default class NotificationConfigRepository extends BaseRepositoryService<NotificationConfig>{
    constructor(config? : RepositoryConfigOptions){
        super(NotificationConfigModel , config)
    }
}