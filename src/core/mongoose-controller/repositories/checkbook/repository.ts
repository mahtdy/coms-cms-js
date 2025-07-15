
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository"
import Checkbook, { CheckbookModel } from "./model";

export default class CheckbookRepository extends BaseRepositoryService<Checkbook>{
    constructor(options? : RepositoryConfigOptions){
        super(CheckbookModel , options)
    }
}