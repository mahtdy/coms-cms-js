import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import NotificationToken, { NotificationTokenModel } from "./model";



export default class NotificationTokenRepository extends BaseRepositoryService<NotificationToken>{
    constructor(options? : RepositoryConfigOptions){
        super(NotificationTokenModel,options)
    }
}