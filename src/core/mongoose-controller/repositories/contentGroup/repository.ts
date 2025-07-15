import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import ContentGroup, { ContentGroupModel } from "./model";


export default class ContentGroupRepository extends BaseRepositoryService<ContentGroup>{
    constructor(options? :RepositoryConfigOptions){
        super(ContentGroupModel, options)
    }
}