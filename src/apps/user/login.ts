import { model } from "mongoose";
import UserRepository from "../../core/mongoose-controller/repositories/user/repository"
import BaseUser ,{ userSchema } from "../../core/mongoose-controller/repositories/user/model"
import LogInController from "../../core/mongoose-controller/auth/user/user-login";
import { UserModel } from "../../repositories/user/model";



// var login = new SimpleLogIn<Admin>("/login",new SimpleLogInRepository(AdminModel))
var login = new LogInController<BaseUser>("", new UserRepository<BaseUser>({
    model: UserModel,
    // salt: "111244"
}))
login.tag = "/user/login"


export default login