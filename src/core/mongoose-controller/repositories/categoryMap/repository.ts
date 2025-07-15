
import CategoryMap, { CategoryMapModel } from "./model";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import ContentMaduleRegistry from "../../contentRegistry";
import CategoryContentRepository from "../categoryContent/repository";
import ContentRepository from "../content/repository";

const lableMap :any = {
    "content" : "categoryContent"
}

const lableModuleMap : any = {
    "content" : "article"
}


export default class CategoryMapRepository extends BaseRepositoryService<CategoryMap> {
    categoryContentRepo : CategoryContentRepository
    contentRegistry: ContentMaduleRegistry
    contentRepo : ContentRepository
    constructor(options?: RepositoryConfigOptions) {
        super(CategoryMapModel,options)
        this.categoryContentRepo = new CategoryContentRepository()
        this.contentRegistry = ContentMaduleRegistry.getInstance()
        this.contentRepo = new ContentRepository()

    }

    getCategoryAnsectors(map : any[]){

    }

    async changeByLable(lable: string, map: any[] ,language : string) {

        let beforeMap = await this.getByLable(lable, language)
        
        var data = this.extractMap(map)


        let before= this.extractMap2(beforeMap) 

        let inf = [ ]
        data.map((elem, i) => {
            elem['lable'] = lable
            elem['language'] = language
        })
        for (let i = 0; i < data.length; i++) {
            inf.push(data[i])
            data[i] = {
                "insertOne": {
                    "document": data[i]
                }
            }
        }

        
        
        var ops: any[] = [
            {
                deleteMany: {
                    filter: {
                        lable: {
                            $eq: lable
                        },
                        language : {
                            $eq : language
                        }
                    }
                }
            }
        ]
        ops.push(...data)
        let res = await this.collection.bulkWrite(ops)

        let categories = await this.findAll({
            lable,
            language
        })


        let moduleName =  lableModuleMap[lable] || lable

        let module = this.contentRegistry.getRegistry(moduleName)

        try {
            for (let i = 0; i < inf.length; i++) {
                let ansectors = this.findCategoryAnsectors(before , inf[i].category)
               

                await module?.repo?.updateMany(
                    {
                        category: inf[i].category,
                        language 
                    }, {
                        $pull :{
                            categories :{
                                $in : ansectors
                            }
                        }
                    }
                )

                let r = await module?.repo?.updateMany(
                    {
                        category: inf[i].category,
                        language 
                    }, {
                        $addToSet : {
                            categories :
                            {
                                $each : inf[i].ancestors || []
                            } 
                        }
                    }
                )


            }
        } catch (error) {
            console.log(error)
        }
    
        return res
        

    }


    findCategoryAnsectors(data:any[],id : string){
        for (let i = 0; i < data.length; i++) {
            if(data[i].category.toString() == id 
                ){
                     data[i].ancestors || []
                    
            }
        }
        return []
    }

    async insertMap(lable: string, map: any[] ,language : string ) : Promise<any> {
        var exists = await this.isExists({
            lable: {
                $eq: lable as ("content" | "shopping" | "faq")
            },
            language 
        })
        if (exists) {
            throw new Error("برچسب تکراری")
        }
        var data = this.extractMap(map)
        data.map((elem, i) => {
            elem['lable'] = lable
            elem['language'] = language
        })
        return this.insertMany(data)

    }

    extractMap(map: any[], ancestors: string[] = [], parent ?: string) {
        var list: any[] = []
        for (let i = 0; i < map.length; i++) {
            var elem: any = {}
            elem['category'] = map[i].category
            elem['ancestors'] = ancestors
            elem["parent"] = parent


            list.push(elem)
            elem["showTitle"] = map[i].showTitle ||  map[i].title
            if (map[i].children?.length != 0) {
                var tmp_ancestors = [...ancestors]
                tmp_ancestors.push(map[i].category)
                list.push(...this.extractMap(map[i].children, tmp_ancestors , map[i].category))
            }

        }
        return list
    }

    extractMap2(map: any[], ancestors: string[] = [], parent ?: string) {
        var list: any[] = []
        for (let i = 0; i < map.length; i++) {
            var elem: any = {}
            elem['category'] = map[i].id
            elem['ancestors'] = ancestors
            elem["parent"] = parent


            list.push(elem)
            elem["showTitle"] = map[i].showTitle ||  map[i].title
            if (map[i].children?.length != 0) {
                var tmp_ancestors = [...ancestors]
                tmp_ancestors.push(map[i].category)
                list.push(...this.extractMap2(map[i].children, tmp_ancestors , map[i].id))
            }

        }
        return list
    }

    async getByLable(lable: string ,language :string)  {
        try {
            var data: any = await this.findAll({
                lable: {
                    $eq: lable 
                },
                language
            }, {

            }, [
                "category", "ancestors", "parent"
            ])
            

            let moduleName =  lableModuleMap[lable] || lable

            let module = this.contentRegistry.getRegistry(moduleName)

            let defaultDomain = await this.contentRepo.domainRepo.findOne({
                isDefault : true
            })


            for (let i = 0; i < data.length; i++) {
                if(module != undefined){
                    
                    data[i].useage = await module.repo?.getcount({
                      $or :[{
                        category: data[i].category._id
                      } , {
                        categories :  data[i].category._id
                      }],
                      isPublished : true,
                      language 
                    })

                    data[i].draftUseage = await module.repo?.getcount({
                        $or :[{
                          category: data[i].category._id
                        } , {
                          categories :  data[i].category._id
                        }],
                        isDraft : true,
                        language 
                      })

                }
                

                let catLabale = lableMap[lable] || lable

                let catContent = await this.contentRepo.findOne({
                    categoryLable :  lable,
                    language : language,
                    id :  data[i].category._id
                })
                if( catContent != null){
                    data[i].url = catContent.url.startsWith("/") ? `https://${defaultDomain?.domain}${catContent.url}` :  `https://${catContent.url}`
                }
            }
            data = this.convertData(data ,undefined,language)
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    convertData(data: CategoryMap[], id?: string , language? : string) {
        // console.log(id)

        var results: any[] = []
        for (let i = 0; i < data.length; i++) {
            if (id == undefined && data[i].parent == undefined) {
                var item: any = {}

                item['id'] = (data[i].category as any)._id || ""
                item = Object.assign(item, (data[i].category as any)["_doc"])
                delete item["_id"]
                delete item["_v"]
                
                if(item.showTitle == undefined){
                    item["showTitle"] = language ? item.translation?.[language] ||  item.title : item.title
                }
                item.useage = (data[i] as any).useage || 0
                item.url = (data[i] as any).url
                item.draftUseage = (data[i] as any).draftUseage || 0
                 
                item.children = this.convertData(data, (data[i].category as any)._id || "" , language)
                results.push(item)
            }
            if (data[i].parent != undefined && (data[i].parent as any)._id.toString() == id) {
                var item: any = {}
                item['id'] = (data[i].category as any)?._id || ""


                item = Object.assign(item, (data[i].category as any)?.["_doc"])
                delete item["_id"]
                delete item["_v"]

                item["showTitle"] = language ? item.translation?.[language] ||  item.title : item.title

                item.useage = (data[i] as any).useage || 0
                item.url = (data[i] as any).url
                item.draftUseage = (data[i] as any).draftUseage || 0

                item.children = this.convertData(data, (data[i].category as any)?._id || "" , language)
                item['parent'] = (data[i].parent as any)._id.toString()
                results.push(item)
            }
        }
        return results
    }

}      
