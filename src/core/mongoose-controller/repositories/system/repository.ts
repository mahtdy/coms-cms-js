import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import { FilterQuery, UpdateQuery} from "mongoose"
import { SystemConfig, SystemConfigModel } from "./model";


export default class SystemConfigRepository extends BaseRepositoryService<SystemConfig>{
    constructor(options? :RepositoryConfigOptions) {
        super(SystemConfigModel , options)
    }

    async getConf(key: string): Promise<SystemConfig | null> {
        return await this.findOne({
            key: key
        })
    }

    async getConfigValue(key : string) : Promise<any>{
        var config = await this.getConf(key) 
        return config?.value != undefined ? config.value : undefined
    }

    async getConfigByLable(lable : string) : Promise<any>{
        return this.findAll({
            lable
        })
    }

    async updateOne(query: FilterQuery<SystemConfig>, data: UpdateQuery<SystemConfig>): Promise<any> {
      var res = await super.updateOne(query , data)
      return res
    }
}