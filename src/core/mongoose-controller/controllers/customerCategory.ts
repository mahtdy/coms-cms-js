import BaseController, { ControllerOptions } from "../controller";
import CustomerCategory from "../repositories/customerCategory/model";
import CustomerCategoryRepository from "../repositories/customerCategory/repository";
import { z } from "zod"


export class CustomerCategoryController extends BaseController<CustomerCategory>{
    constructor(baseRoute: string, repo: CustomerCategoryRepository, options?: ControllerOptions) {
        super(baseRoute, repo, options)
    }

    initApis(): void {
        super.initApis()
        this.addRouteWithMeta(this.baseRoute +"s/search", "get", this.search.bind(this) , BaseController.searcheMeta)
        this.addRoute("s/search/list", "get", this.getSearchList.bind(this))
    }
}


var customerCategory = new CustomerCategoryController("/customerCategory", new CustomerCategoryRepository({

}), {
    insertSchema: z.object(
        {
            title: z.string(),
            isBasic: z.boolean().default(false)
        }
    ),
    searchFilters : {
        title: ["eq" , "reg"]
    }
})

export default customerCategory