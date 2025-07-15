
import BaseController, { ControllerOptions } from "../controller";
import LinkTag from "../repositories/linkTag/model";
import LinkTagRepository from "../repositories/linkTag/repository"
import CacheService from "../../cache";
import { z } from "zod"
import { Response } from "../../controller";
import { Query } from "../../decorators/parameters";
import { Get } from "../../decorators/method";




export class LinkTagController extends BaseController<LinkTag>{
    constructor(baseRoute: string, repo: LinkTagRepository, options: ControllerOptions) {
        super(baseRoute, repo, options)
    }



    @Get("/tags")
    async getTagLink(
        @Query({
            destination: "tags",
            schema: z.array(z.string())
        })
        tags: string[]
    ): Promise<Response> {
        try {
            return {
                status: 200,
                data: await this.repository.getLinksByTags(tags)
            }
        } catch (error) {
            throw error
        }
    }

    @Get("/by-id")
    async getLinkByTag(
        @Query({
            destination : "link",
            schema : BaseController.id
        }) link : string
    ){
        try {
            return this.findOne({
                link
            })
        } catch (error) {
            throw error
        }
    }
}

var linktag = new LinkTagController("/linktag",
    new LinkTagRepository({
        cacheService: new CacheService("linktag")
    }), {
    insertSchema: z.object({
        link: BaseController.id
    })
}
)
// log.addRouteWithMeta("es/search", "get" , log.search.bind(log),BaseController.searcheMeta)

export default linktag