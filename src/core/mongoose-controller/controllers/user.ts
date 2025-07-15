import BaseController from "../controller";
import BaseUser from "../repositories/user/model";



export class UserController<T extends BaseUser> extends BaseController<T>{

}