
import BaseController, { ControllerOptions } from "../controller";
import ChestRepository from "../repositories/chest/repository";
import  Chest  from "../repositories/chest/model";
import { z } from "zod"
import { Get, Put } from "../../decorators/method";
import { Body, Query } from "../../decorators/parameters";

export  class ChestController extends BaseController<Chest>{
    constructor(path: string, repository: ChestRepository, options?: ControllerOptions) {
        super(path, repository, options)
    }

    @Put("")
    async edit(
        @Query({ destination: "id", schema: BaseController.id })
        id: string,
        @Body({
            schema: z.object({
                title : z.string(),
                enabled : z.boolean()
            }) 
        }) chest: Chest
    ){
        try {
            return await this.editById(id, {
                $set : chest
            }, {
                ok: true
            })
        } catch (error) {
            throw error
        }
    }
    

    @Get("")
    async getById(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string

    ) {
        try {
            return  await this.findById(id)
        } catch (error) {
            throw error
        }
    }

    initApis(): void {
        super.initApis()
        this.addRouteWithMeta("es/search", "get", this.search.bind(this), BaseController.searcheMeta)
        this.addRoute("es/search/list" ,"get" , this.getSearchList.bind(this))
    }
}


const chest = new ChestController("/chest" , new ChestRepository() , {
    insertSchema : z.object({
        title: z.string(),
        enabled : z.boolean(),
        inventry : z.coerce.number().min(0),
        isTankhah : z.boolean(),
    }),
    searchFilters: {
        title: ["eq", "reg"],
        enabled: ["eq"],
        inventory: ["eq" , "gte" , "lte"],
        isTankhah: ["eq"],
    }
})

export default chest