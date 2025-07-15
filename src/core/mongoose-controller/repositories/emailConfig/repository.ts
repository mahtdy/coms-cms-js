import EmailConfig, { EmailConfigModel } from "./model";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";


export default class EmailConfigRepository extends BaseRepositoryService<EmailConfig> {
    constructor(options? :RepositoryConfigOptions) {
        super(EmailConfigModel, options)
    }
    async getDefault(): Promise<EmailConfig | null> {
        try {
            return await this.findOne({
                isDefault: true
            },
                {
                    fromDb: true
                })
        } catch (error) {
            throw error
        }
    }
}      
