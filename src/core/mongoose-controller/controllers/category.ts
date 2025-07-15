
import BaseController, { ControllerOptions } from "../controller";
import Category from "../repositories/category/model";
import CategoryRepository from "../repositories/category/repository";
import CacheService from "../../cache";
import { z } from "zod"
import { Response } from "../../controller";
import CategoryMapRepository from "../repositories/categoryMap/repository";
import {  Types } from "mongoose";
import { Query, Body } from "../../decorators/parameters";




export class CategoryController extends BaseController<Category>{
    catMapRepo: CategoryMapRepository
    constructor(baseRoute: string, repo: CategoryRepository, options: ControllerOptions) {
        super(baseRoute, repo, options)
        this.catMapRepo = new CategoryMapRepository()
    }
    async createByInfo(data: Category, lable?: string, parent?: string ,language? : string): Promise<Response> {
        try {
            if(language == undefined){
                language = data.language as string
            }
            var d = await super.create(data)
            if (lable) {
                var category = d.data?._id
                var ancestors: any[] = []

                if (parent) {
                    var p = await this.catMapRepo.findOne({
                        category: parent
                    })
                    if (p != null) {
                        ancestors = [...p?.ancestors as string[]]
                        ancestors.push(parent as string)
                        parent = parent
                    }
                }


                this.catMapRepo.insert({
                    lable,
                    category,
                    parent,
                    language,
                    ancestors
                } as any)
            }
        } catch (error) {
            throw error
        }
        return d
    }
   

    async edit(
        @Query(
            {
                destination: "id",
                schema: BaseController.id
            }
        ) id: string,
        @Body({
            schema: z.object({
                title :z.string().optional(),
                parent : BaseController.id.optional()
            })
        }) update: any
    ): Promise<Response> {
        var dd = await this.editById(id, {
            $set: update
        })

        try {
            if (update.parent) {


                var parent = await this.catMapRepo.findOne({
                    _id: update.parent
                })
                if (parent != null) {
                    var parentlist = parent.ancestors
                    parentlist.push(update.parent)

                    var category = await this.catMapRepo.findByIdAndUpdate(
                        new Types.ObjectId(update.parent as string)
                        , {
                            $set: {
                                ancestors: parentlist
                            }
                        })

                    if (category != null) {
                        var result = await this.repository.updateCategoryTree(update.parent as string,
                            category.ancestors as string[], parentlist)
                    }

                }
            }
        } catch (error) {
            console.log(error)
        }

        return dd
    }

    public search(page: number, limit: number, reqQuery: any, admin?: any, ...params: any[]): Promise<Response> {
        // console.log("search")
        return super.search(page,limit,reqQuery,admin)
    }
    

    initApis(): void {
        this.addRouteWithMeta("", "post", this.createByInfo.bind(this), {
            "1": {
                index: 0,
                source: "body",
                schema: this.insertSchema
            }, 
            "2": {
                index: 1,
                source: "query",
                schema: z.string().optional(),
                destination : "lable"
            }, 
            "3": {
                index: 2,
                source: "query",
                schema: BaseController.id.optional(),
                destination : "parent"   
            }, 
            "4": {
                index: 3,
                source: "query",
                schema: BaseController.id.optional(),
                destination : "language"   
            }, 
        })
        this.addRouteWithMeta("s", "get", this.search.bind(this), BaseController.adminPaginateMeta)
        this.addRouteWithMeta("", "delete", this.delete.bind(this), {
            "1": {
                index: 0,
                source: "query",
                destination: "id",
                schema: BaseController.id
            },
        })
        this.addRoute("", "put", this.edit.bind(this))
        this.addRouteWithMeta("s/search", "get", this.search.bind(this), BaseController.searcheMeta)
        this.addRoute("s/search/list", "get", this.getSearchList.bind(this))
    }

   

    

}

var category = new CategoryController("/category",

    new CategoryRepository({
        cacheService: new CacheService("backup")
    }), {
    insertSchema: z.object({
        title: z.string(),
        language : BaseController.id
    }),
    searchFilters: {
        title: ["eq", "reg"],
        _id : ["eq" , "list"],
        language : ["eq" , "list"]
    },
    paginationConfig : {
        fields : {
            title : {
                en_title : "title",
                fa_title : "عنوان",
                isOptional : false,
                type : "string",
                filters : ["reg" ],
                sortOrderKey : true
            },
            useage :{
                en_title : "useage",
                fa_title : "تعداد استفاده",
                isOptional : false,
                sortOrderKey : false,
                type : "number",
                filters : [],
            },
            language :{
                en_title : "language",
                fa_title : "زبان",
                isOptional : false,
                sortOrderKey : false,
                type : "number",
                filters : [],
                object_value: ["panelTitle"],
                target_func: "v1",
            }
        },
        paginationUrl : "/categorys",
        searchUrl : "/categorys",
        serverType : "",
        tableLabel : "category",
        actions :[

            {
                api: "/category",
                type: "delete",
                route: "/panel/permission/adminrole/$_id",
                queryName: "id",
                text: "حذف",
                fromData: ["_id"]
            },
            {
                api: "",
                type: "insert",
                route: "/panel/content/category-list",
                queryName: "adminid",
                text: "دسته‌بندی جدید"
            },
            {
                api: "",
                type: "edit_modal",
                route: "/panel/content/category-list",
                queryName: "",
            }
        ],
        auto_filter_name : "title",
        auto_search_title :"عنوان",
        auto_search_key : "title$reg",
        auto_search_url : "/categorys?",
        auto_filter_idKey : "_id",
        auto_search_submit : "_id$list"
    }

}
)

export default category