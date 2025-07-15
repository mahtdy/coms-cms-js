import { Types } from "mongoose";
import { Response } from "../../controller";
import { Get, Post, Put } from "../../decorators/method";
import BaseController, { ControllerOptions } from "../controller";
import Checkbook from "../repositories/checkbook/model";
import CheckbookRepository from "../repositories/checkbook/repository";
import { z } from "zod"
import { QueryInfo } from "../repository";
import { Body, Query } from "../../decorators/parameters";


const insertSchema = z.object({
    startNumber: z.coerce.number(),
    endNumber: z.coerce.number(),
    account: BaseController.id,
    pageCount: z.coerce.number().int().positive(),

})

export class CheckbookController extends BaseController<Checkbook>{
    constructor(baseRoute: string, repo: CheckbookRepository, options?: ControllerOptions) {
        super(baseRoute, repo, options)
    }

    @Put("")
    async edit(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Body({
            schema: insertSchema
        }) data : Checkbook
    ) {
        try {
            return this.editById(id, {
                $set: data
            })
        } catch (error) {
            throw error
        }
    }

    @Post("")
    async create(data: Checkbook): Promise<Response> {
        return await super.create(data)
    }

    @Get("")
    findById(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string | Types.ObjectId, queryInfo?: QueryInfo | undefined): Promise<Response> {
        try {
            return this.findOne({
                _id: id,
            })
        } catch (error) {
            throw error
        }
    }
}

const checkbook = new CheckbookController("/checkbook", new CheckbookRepository({
    population: [
        {
            path : "account",
            select: ["title"]
        }
    ]
}), {
    population :  [{
        path: "account"
    }],
    insertSchema,

})
export default checkbook