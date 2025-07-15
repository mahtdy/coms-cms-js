import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import ContentLanguage, { ContentLanguageModel } from "./model";



export default class ContentLanguageRepository extends BaseRepositoryService<ContentLanguage>{
    constructor(options?: RepositoryConfigOptions){
        super(ContentLanguageModel, options);
    }
}