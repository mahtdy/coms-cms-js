import { Body, Query } from "../../decorators/parameters";
import { Get, Put } from "../../decorators/method";
import BaseController, { ControllerOptions } from "../controller";
import LoanTemplate from "../repositories/loanTemplate/model";
import LoanTemplateRepository from "../repositories/loanTemplate/repository";
import { z } from "zod"
import { Response } from "../../controller";


const warrantySchema = z.object({
    deed: z.object({
        min: z.number().int().min(0),
        enabled: z.boolean()
    }),
    personal: z.object({
        min: z.number().int().min(0),
        guarantorsCount: z.number().int().min(0)
    })
});

const periodeSchema = z.object({
    months: z.number(),
    bankFees: z.number().positive().optional(),
    
    supplierName: z.string().optional(),
    supplierIcon: z.string().optional(),
    warranty: warrantySchema,
    formula : z.enum([ "banking" , "market"]),
    interestRate : z.coerce.number().min(0),
    enabled : z.boolean().default(true),

    _id : BaseController.id.optional()
});

const loanTemplateSchema = z.object({
    title: z.string(),
    icon: z.string().optional(),
    amount: z.number(),
    periodes: z.array(periodeSchema),
    dueDate: z.coerce.date().optional(),
});

export class LoanTemplateController extends BaseController<LoanTemplate>{
    constructor(baseRoute: string, repo: LoanTemplateRepository, options?: ControllerOptions) {
        super(baseRoute, repo, options)
    }

    @Put("")
    async editLoanTemplate(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Body({
            schema: loanTemplateSchema
        }) data: any
    ) {
        return this.editById(id, {
            $set: data
        })
    }
    
    @Get("")
    async getLoan(
        @Query({
            destination : "id",
            schema : BaseController.id
        } ) id: string
    ){
        return this.findById(id)
    }


    @Get("/search")
    async searchLoanTemplate(
        @Query({
            destination : "q",
            schema : z.string()
        }) q : string
    ): Promise<Response>{
        let query = {
            title : {
                $regex : new RegExp(q)
            }
        }
        return this.paginate(1, 10 , query)
    }
}


const loanTemplate = new LoanTemplateController("/loan-template", new LoanTemplateRepository(), {
    insertSchema: loanTemplateSchema
})


export default loanTemplate   