import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import People, { PeopleModel } from "./model";


export default class PeopleRespository extends BaseRepositoryService<People>{
    constructor(options?: RepositoryConfigOptions) {
        super(PeopleModel, options)
    }
}