import { model } from "mongoose";
import AdminRepository from "../../core/mongoose-controller/repositories/admin/repository"
import  { BaseAdmin , adminSchema  }  from "../../core/mongoose-controller/repositories/admin/model"
import LogInController from "../../core/mongoose-controller/auth/admin/admin-logIn";

export const AdminModel = model<BaseAdmin>('admin', adminSchema)


// var login = new SimpleLogIn<Admin>("/login",new SimpleLogInRepository(AdminModel))
var login = new LogInController<BaseAdmin>("" ,new AdminRepository<BaseAdmin>({
    model : AdminModel,
    // salt : "111244"
}))
login.tag = "/admin/login"


export default login