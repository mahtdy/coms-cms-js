import BaseController, { ControllerOptions } from "../controller";
import Department from "../repositories/department/model";
import DepartmentRepository from "../repositories/department/repository";
import { z } from "zod"



export class DepartmentController extends BaseController<Department>{
    constructor(baseRoute: string, repo: DepartmentRepository, options?: ControllerOptions) {
        super(baseRoute, repo, options)
    }
    
}

var department = new DepartmentController("/department", new DepartmentRepository(), {
    insertSchema: z.object({
        name: z.string(),
        status: z.boolean(),
    })
})

export default department