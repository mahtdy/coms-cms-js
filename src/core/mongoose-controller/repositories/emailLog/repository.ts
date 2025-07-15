

import EmailLog, { EmailLogModel } from "./model";
import BaseRepositoryService , { RepositoryConfigOptions } from "../../repository";


export default class EmailLogRepository extends BaseRepositoryService<EmailLog> {
    constructor(options?: RepositoryConfigOptions) {
        super(EmailLogModel, options)
    }
}      


