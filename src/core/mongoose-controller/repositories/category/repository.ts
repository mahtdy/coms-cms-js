
import Category, { CategoryModel } from "./model";
import BaseRepositoryService, { QueryInfo, RepositoryConfigOptions } from "../../repository";
import { FilterQuery, Document } from "mongoose";
import ContentRepository from "../content/repository";


export default class CategoryRepository extends BaseRepositoryService<Category> {
    contentRepo : ContentRepository
    constructor(options? : RepositoryConfigOptions) {
        super(CategoryModel, options)
        this.contentRepo = new ContentRepository()
    }

    async paginate(query: FilterQuery<Category>, limit: number, page: number, options?: QueryInfo): Promise<{ list: Document[] | any[]; count: number; }> {
        try {
            if(options != undefined){
               options = {}

                options.population = [{
                    path: "language",
                    select: ["title" , "panelTitle" , "sign"]
                }]
            }
            let res = await super.paginate(query , limit , page,options)
            let lst :any[] = res.list
            for (let i = 0; i < lst.length; i++) {
                lst[i].useage = await this.contentRepo.getcount({
                    category : lst[i]._id
                })
            }
            return res
        } catch (error) {
            throw error
        }
    }



}
