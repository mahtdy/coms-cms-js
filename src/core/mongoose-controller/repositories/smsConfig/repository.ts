
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import SmsConfig, { SmsConfigModel } from "./model";


export default class SmsConfigRepository extends BaseRepositoryService<SmsConfig> {
    constructor(options? :RepositoryConfigOptions) {
        super(SmsConfigModel, options)
    }
    async getDefault(): Promise<SmsConfig | null> {
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
    async getOTP(): Promise<SmsConfig | null> {
        try {
            return await this.findOne({
                isOTP: true
            }, {
                fromDb: true
            })
        } catch (error) {
            throw error
        }
    }
}
