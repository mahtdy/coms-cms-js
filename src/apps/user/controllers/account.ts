import AdminAccount from  "../../../core/mongoose-controller/controllers/userAccount"
import { UserModel } from "../../../repositories/user/model"
import UserRepository from "../../../core/mongoose-controller/repositories/user/repository"
import BaseUser from "../../../core/mongoose-controller/repositories/user/model"
var account =  new AdminAccount("/account",new UserRepository<BaseUser>({
    model : UserModel,
    salt : "111244"
}))
export default account