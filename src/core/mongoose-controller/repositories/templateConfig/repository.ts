import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import TemplateConfig, { TemplateConfigModel } from "./model";



export default class TemplateConfigRepository extends BaseRepositoryService<TemplateConfig>{
    constructor(options ?: RepositoryConfigOptions){
        super(TemplateConfigModel,options)
    }
}