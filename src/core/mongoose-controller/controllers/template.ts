import { Body, Query } from "../../decorators/parameters";
import { Put } from "../../decorators/method";
import BaseController, { ControllerOptions } from "../controller";
import Template from "../repositories/template/model";
import TemplateRepository from "../repositories/template/repository";
import { z } from "zod"


export class TemplateController extends BaseController<Template>{
    constructor(baseRoute: string, repo: TemplateRepository, options?: ControllerOptions) {
        super(baseRoute, repo, options)
    }


    @Put("")
    async updateTemplate(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Body({
            schema: z.object({
                isDefault: z.boolean()
            })
        }) config: any
    ) {
        return this.editById(id, {
            $set: config
        }, {
            ok: true
        })
    }
}

const template = new TemplateController("/template", new TemplateRepository(), {
    insertSchema: z.object({
        name: z.string(),
        isDefault: z.boolean().default(false)
    })
})
// template.loginRequired = true
export default template