
import TicketPreTextCategory, { TicketPreTextCategoryModel } from "./model";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";


export default class TicketPreTextCategoryRepository extends BaseRepositoryService<TicketPreTextCategory> {
    constructor(options ?: RepositoryConfigOptions) {
        super(TicketPreTextCategoryModel, options)
    }
}      
