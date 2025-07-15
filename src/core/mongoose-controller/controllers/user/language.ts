import { FilterQuery } from "mongoose";
import { Response } from "../../../controller";
import BaseController, { ControllerOptions } from "../../controller";
import Language from "../../repositories/language/model";
import LanguageRepository from "../../repositories/language/repository";
import { QueryInfo } from "../../repository";
import { Get } from "../../../decorators/method";
import { Types } from "mongoose";
import { Query } from "../../../decorators/parameters";
import LanguageCommentRepository from "../../repositories/languageComment/repository";


export class LanguageController extends BaseController<Language>{
    languageCommentRepo : LanguageCommentRepository
    constructor(baseRoute: string, repo :LanguageRepository,options? :ControllerOptions){
        super(baseRoute, repo ,options)
        this.languageCommentRepo = new LanguageCommentRepository()
    }

    // @Get("s/")
    async paginate(page: number, limit: number, query?: FilterQuery<Language>, options?: QueryInfo, ...params: [...any]): Promise<Response> {
        if(query == undefined){
            query ={}
        }
        return super.paginate(page, limit,query, options)
    }

    @Get("")
    findById(
        @Query({
            destination : "id",
            schema : BaseController.id
        })
        id: string | Types.ObjectId, queryInfo?: QueryInfo): Promise<Response> {
       return super.findById(id)
   }

   @Get("/comment/config")
   async getLanguageCommentConf(
    @Query({
        destination : "id",
        schema : BaseController.id
    }) id : string
   ) : Promise <Response>{
        try {
            return {
                data : await this.languageCommentRepo.findOne({
                    language: id
                })
            }
        } catch (error) {
            throw error
        }
   }
    initApis(): void {
     
        this.addRouteWithMeta("s", "get", this.paginate.bind(this), Object.assign(BaseController.paginateMeta, { absolute: false }))
         
    }
}   

const language = new LanguageController("/language", new LanguageRepository(), {})

export default language