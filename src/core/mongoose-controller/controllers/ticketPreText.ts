import BaseController from "../controller";
import TicketPreText from "../repositories/ticketPreText/model";
import TicketPreTextRepository from "../repositories/ticketPreText/repository";
import {z} from "zod"


export class TicketPreTextController extends BaseController<TicketPreText>{

}

var ticketPreText  = new TicketPreTextController("/ticketPreText", new TicketPreTextRepository(),{
    insertSchema : z.object({
        text: z.string(),
        category: BaseController.id,
    }),
  
})

export default ticketPreText