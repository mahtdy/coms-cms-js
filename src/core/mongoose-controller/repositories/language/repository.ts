import Language, { LanguageModel } from "./model";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
// import { baseLanguage } from "../../core/baseLanguage";


export default class LanguageRepository extends BaseRepositoryService<Language> {
    constructor(options? : RepositoryConfigOptions) {
        super(LanguageModel, options)
    }
    async insert(language: Language): Promise<Language> {
        // language.translation = baseLanguage
        return super.insert(language)
    }
}
