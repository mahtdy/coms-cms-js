import { Query } from "../../decorators/parameters";
import { Response } from "../../controller";
import { BasePageController, basePageZod, seoSchema } from "../basePage/controller";
import CategoryContent from "../repositories/categoryContent/model";
import CategoryContentRepository from "../repositories/categoryContent/repository";
import { z } from "zod"
import { Get } from "../../decorators/method";
import { AdminInfo } from "../auth/admin/admin-logIn";
import BaseController from "../controller";

let schema = z.object({}).merge(seoSchema)
.omit({
    mainKeyWord : true
})

const insertSchema =basePageZod.merge( z.object({
    catID: BasePageController.id,
    title: z.string(),
    mainImage: z.string(),
    summary: z.string(),
    content: z.string().optional(),
    seo : schema
})).omit({
    category: true,
    categories: true,
    // seo.mainKeyWord : true
})


export class CategoryContentController extends BasePageController<CategoryContent> {

    @Get("/content")
    getCategoryContent(
        @Query(
            {
                destination: "language",
                schema: BasePageController.id
            }
        ) language: string,
        @Query({
            destination: "catID",
            schema: BasePageController.id
        }) catID: string,
        @Query({
            destination: "lable",
            schema: z.string().default("content")
        }) lable: string,


    ): Promise<Response> {
        return super.findOne({
            catID,
            lable,
            language

        })
    }
    async publish(data: CategoryContent, id: string, update: boolean, admin: AdminInfo): Promise<Response> {
        try {
            let r = await super.publish(data, id, update, admin)
            return r
        } catch (error) {
            //  console.log(error)
            throw error
        }
    }



    initApis(): void {
        super.initApis()
        this.addRouteWithMeta(
            "/categoryContents/search",
            "get",
            this.search.bind(this),
            BaseController.searcheMeta
        );
        this.addRoute("/search/list", "get", this.getSearchList.bind(this));

    }
}
const categoryContent = new CategoryContentController("/categoryContent", new CategoryContentRepository(

    {
        population: [
            {
                path: "catID",
            },
            {
                path: "language",
            },
        ]
    }
), {
    insertSchema,
    searchFilters: {
        title: ["reg", "eq"],
        language: ["eq"],
    },

})

export default categoryContent