import TicketPreText, { TicketPreTextModel } from "./model";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";


export default class TicketPreTextRepository extends BaseRepositoryService<TicketPreText> {
    constructor(options ?: RepositoryConfigOptions) {
        super(TicketPreTextModel,options)
    }
}      
