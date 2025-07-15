import { z } from "zod";
import BaseController, { ControllerOptions } from "../controller";
import PSI from "../repositories/psi/model";
import PSI_Repository from "../repositories/psi/repository";
import { Response } from "../../controller";
import { Get } from "../../decorators/method";



export class PSI_Controller extends BaseController<PSI> {
    constructor(baseRoute: string, repo: PSI_Repository, options?: ControllerOptions) {
        super(baseRoute, repo, options)
    }

    create(data: PSI, ...params: [...any]): Promise<Response> {
        return super.create(data)
    }

    @Get("")
    async getOne(): Promise<Response> {
        try {
            let data = await this.repository.findOne({})
            if (data == null) {
                return {
                    status: 404
                }
            }
            return {
                status: 200,
                data
            }
        } catch (error) {
            throw error
        }
    }




    initApis(): void {
        // super.initApis()
        this.addRouteWithMeta("", "post", this.create.bind(this), {
            "1": {
                index: 0,
                source: "body",
                schema: this.insertSchema
            }
        })
    }
}

const psi = new PSI_Controller("/psi", new PSI_Repository(), {
    insertSchema: z.object({
        enabled: z.boolean(),
        periodType: z.enum(["daily", "weekly", "monthly", "custom"]).optional(),
        periodConfig: z.object
            ({
                weekDays: z.array(
                    z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])
                ).optional(),
                monthly: z.array(z.object({
                    month: z.coerce.number().int().min(1).max(11),
                    day: z.coerce.number().int().min(1).max(31)
                })).optional()
            }
            ).optional()
    })
})

export default psi