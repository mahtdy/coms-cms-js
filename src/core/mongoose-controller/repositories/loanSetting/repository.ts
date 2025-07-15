import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import LoanSetting, { LoanSettingModel } from "./model";



export default class LoanSettingRepository extends BaseRepositoryService<LoanSetting>{
    constructor(options ?: RepositoryConfigOptions){
        super(LoanSettingModel , options)
    }
}