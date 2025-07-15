import { Query } from "../../decorators/parameters";
import { Response } from "../../controller";
import BaseController, { ControllerOptions } from "../controller";
import BackLink from "../repositories/backlink/model";
import BackLinkRepository from "../repositories/backlink/repository";
import { z } from "zod"
import ArcticleContentProccessor from "../../services/articleProccessing";


export class BackLinkController extends BaseController<BackLink> {
    constructor(baseRoute: string, repo: BackLinkRepository, options: ControllerOptions) {
        super(baseRoute, repo, options)
    }

    async testURL(
        @Query({
            destination : "id",
            schema: BaseController.id
        })
        id : string): Promise<Response>{

        try {
            var backLink = await this.repository.findById(id)
            if (backLink == null) {
                return {
                    status : 404 ,
                    message: "یافت نشد"
                }
            }
            return {
                status : 200,
                data : await ArcticleContentProccessor.testBackLink(backLink?.url, backLink?.links)
            }
                
        } catch (error) {
            throw error
        }
    }

    initApis(): void {
        super.initApis()
        this.addRoute("/test","get",this.testURL.bind(this))
    }

}

var backlink = new BackLinkController("/backlink", new BackLinkRepository(), {
    insertSchema: z.object({
        url: z.string(),
        pageAuthority: z.number().optional(),
        domainAuthority: z.number().optional(),
        spamScore: z.number().optional(),
        inboundLinks: z.array(z.string()).optional(),
        links: z.array(z.object({
            url: z.string(),
            text: z.string(),
        })),
    })
})

export default backlink