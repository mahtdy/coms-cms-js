import TicketRepository from "../../../core/mongoose-controller/repositories/ticket/repository";
import { TicketController } from "../../../core/mongoose-controller/controllers/ticket";
import UserRepository from "../../../core/mongoose-controller/repositories/user/repository";


var ticket = new TicketController("/ticket", new TicketRepository() )