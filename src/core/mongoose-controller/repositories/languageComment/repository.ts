import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import LanguageCommentConfig, { LanguageCommentConfigModel } from "./model";



export default class LanguageCommentRepository extends BaseRepositoryService<LanguageCommentConfig>{
    constructor(options ?: RepositoryConfigOptions){
        super(LanguageCommentConfigModel,options)
    }
}