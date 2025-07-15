import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import TranslationLog, { TranslationLogModel } from "./model";


export default class TranslationLogRepository extends BaseRepositoryService<TranslationLog>{
    constructor(options ?: RepositoryConfigOptions){
        super(TranslationLogModel,options)
    }
}