import { FilterQuery } from "mongoose";
import { Response } from "../../controller";
import BaseController, { ControllerOptions } from "../controller"
import PublishCycle from "../repositories/publishCycle/model";
import PublishCycleRepository from "../repositories/publishCycle/repository";
import z from "zod"
import { QueryInfo } from "../repository";
import { AdminInfo } from "../auth/admin/admin-logIn";
import { Admin, Query } from "../../decorators/parameters";



export class PublishCycleController extends BaseController<PublishCycle>{
    constructor(baseRoute : string , repo : PublishCycleRepository,options ?: ControllerOptions){
        super(baseRoute ,repo,options)
    }
    
    async paginate(
        page: number, limit: number, @Admin() admin?: AdminInfo, @Query({
            // destination : "",
            schema: BaseController.search.optional()
        }) queryParam?: { [x: string]: any; }, query?: FilterQuery<PublishCycle>, options?: QueryInfo | undefined)
        
        : Promise<Response> {
        query = await this.searchHelper(queryParam)
        if (query == undefined) {
            query = {}
        }
        return super.paginate(page , limit , query , options)
    }
}

const publishCycle = new PublishCycleController("/publish-cycle" , new PublishCycleRepository(),{
    insertSchema: z.object({
        name : z.string(),
        time : BaseController.time
    }),
    searchFilters : {
        name : ["eq" , "reg"]
    }
})

export default publishCycle