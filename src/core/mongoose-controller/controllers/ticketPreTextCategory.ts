import BaseController from "../controller";
import TicketPreTextCategory from "../repositories/ticketPreTextCategory/model";
import TicketPreTextCategoryRepository from "../repositories/ticketPreTextCategory/repository";
import {z} from "zod"


export class TicketPreTextCategoryController extends BaseController<TicketPreTextCategory>{
    initApis(): void {
        super.initApis()
        this.addRouteWithMeta("/search" , "get", this.search.bind(this), BaseController.searcheMeta)
    }
}

var ticketPreTextCategory = new TicketPreTextCategoryController("/ticketPreTextCategory" , new TicketPreTextCategoryRepository(),{
    insertSchema :z.object({
        title : z.string()
    }),
    searchFilters: {
        title: ["eq", "reg"]
    }
})


export default  ticketPreTextCategory