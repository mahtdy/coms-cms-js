import { BaseAdmin } from "../../../core/mongoose-controller/repositories/admin/model"
import AdminAccount from  "../../../core/mongoose-controller/controllers/account"
import AdminRepository from "../../../core/mongoose-controller/repositories/admin/repository"
import { AdminModel } from "../login"
var account =  new AdminAccount("/account",new AdminRepository<BaseAdmin>({
    model : AdminModel,
    // salt : "111244"
}))
export default account