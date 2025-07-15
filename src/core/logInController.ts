import Controller, { Response } from "./controller";
import { Admin } from "./decorators/parameters";
import { AdminInfo } from "./mongoose-controller/auth/admin/admin-logIn";



export default class BaseLogIn extends Controller {
    constructor(baseRoute: string) {
        super(baseRoute)
    }

    async checkLogIn(@Admin() admin: AdminInfo) : Promise<Response> {
        if (admin?._id != undefined)
            return {
                next: true
            }
        return {
            status : 403,
            data : {
                logIn : true
            }
        }
    }

}