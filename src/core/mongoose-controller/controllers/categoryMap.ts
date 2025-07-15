import CategoryMapRepository from "../repositories/categoryMap/repository"
import CategoryMap from "../repositories/categoryMap/model"
import BaseController, { ControllerOptions } from "../controller"
import { Query, Body } from "../../decorators/parameters"
import { z } from "zod"
import { Log, Post , Put , Get} from "../../decorators/method"
import { Response } from "../../controller"
import CacheService from "../../cache"
import { Route } from "../../application"
import LanguageRepository from "../repositories/language/repository"

export class CategoryMapController extends BaseController<CategoryMap>{
    languageRepo : LanguageRepository
    constructor(baseRoute: string, repo: CategoryMapRepository, options: ControllerOptions) {
        super(baseRoute, repo, options)
        this.languageRepo = new LanguageRepository()
    }

    initApis(): void {
        
    }
    

    @Put("")
    async editByLable(
        @Body({
            destination: "lable",
            schema: z.string()
        }) lable: string,
        @Body({
            destination: "map",
            schema: z.array(BaseController.search)
        }) map: any,
        @Body({
            destination : "language",
            schema: BaseController.id
        }) language : string
    ): Promise<Response> {
        try {
            return {
                status: 200,
                data: await this.repository.changeByLable(lable, map , language)
            }
        } catch (error) {
            throw error
        }
    }


    @Log
    @Post("")
    async createByLable(
        @Body({
            destination: "lable",
            schema: z.string()
        }) lable: string,
        @Body({
            destination: "map",
            schema: z.array(BaseController.search)
        }) map: any,
        @Body({
            destination : "language",
            schema: BaseController.id
        }) language : string
    ): Promise<Response> {
        try {
            // console.log("language",map )
            return {
                status: 200,
                data: await this.repository.changeByLable(lable, map,language)
            }
        } catch (error) {
            throw error
        }
    }



    @Log
    @Get("")
    async getByLable(
        @Query({
            destination : "lable",
            schema :  z.string()
        }) lable : string,
        @Query({
            destination : "language",
            schema :  BaseController.id.optional()
        }) language : string
    ): Promise<Response> {
        try {
            // console.log("lable", lable)
            if(lable == "article"){
                lable = "content"
            }
            return {
                status: 200,
                data:  await this.repository.getByLable(lable,language)
            }
        }
        catch (error) {
            throw error
        }

    }


    @Get("es")
    async getAllMaps(
        @Query({
            destination : "lable",
            schema :  z.string()
        }) lable : string,
    ):Promise<Response>{
        let data :any[] = await this.languageRepo.findAll({},{
            projection : {
                title : 1,
                panelTitle : 1,
                sign : 1 
            }
        }) as any[]
        data = JSON.parse(JSON.stringify(data))
        for (let i = 0; i < data.length; i++) {
            data[i]["map"] = await this.repository.getByLable(lable,data[i]._id)
            // console.log(data[i]["map"] )
        }
        return {
            status: 200 ,
            data
        }
    }

    @Get("/search")
    async searchInMap(
        @Query({
            destination : "lable",
            schema : z.string()
        }) lable : string,
        @Query({
            destination : "showTitle",
            schema : z.string()
        })showTitle :string
    ){
        try {
            let r = await this.paginate(1, 10 , {
                lable,
                showTitle : {
                    $regex : new RegExp(showTitle)
                }
            })
            return r
        } catch (error) {
            console.log(error)
        }
       
    }

}

var categoryMap = new CategoryMapController("/categoryMap",new CategoryMapRepository({
    cacheService : new CacheService("categoryMap")
}),{})
export default categoryMap