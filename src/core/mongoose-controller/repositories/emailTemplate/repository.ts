import EmailTemplate, { EmailTemplateModel } from "./model";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";


export default class EmailTemplateRepository extends BaseRepositoryService<EmailTemplate> {
    constructor(options? :RepositoryConfigOptions) {
        super(EmailTemplateModel,options)
    }
    async disableDefaultConfig(id: string) {
        try {
            await this.updateMany({
                defaultEmailConfig: id
            }, {
                $unset: {
                    defaultSmsConfig: 1
                }
            })
        } catch (error) {
            throw error
        }
    }
}
