import { Body, Query } from "../../decorators/parameters";
import { Response } from "../../controller";
import { Get, Post, Put } from "../../decorators/method";
import BaseController, { ControllerOptions } from "../controller";
import LoanSetting from "../repositories/loanSetting/model";
import LoanSettingRepository from "../repositories/loanSetting/repository";
import { z } from "zod"
import { Types } from "mongoose";
import { QueryInfo } from "../repository";

const loanSettingSchema = z.object({
    from: z.coerce.number().int().min(0),
    to: z.number().int().min(1),
    deed: z.object({
        min: z.number().int().min(0),
        enabled: z.boolean()
    }),
    personal: z.object({
        min: z.number().int().min(0),
        guarantorsCount: z.number().int().min(0)
    }),
    enabled : z.boolean().default(true)
})

export class LoanSettingController extends BaseController<LoanSetting> {
    constructor(baseRoute: string, repo: LoanSettingRepository, options: ControllerOptions) {
        super(baseRoute, repo, options)
    }

    @Post("")
    async create(data: LoanSetting): Promise<Response> {
        try {
            let exists = await this.repository.isExists({
                $or: [
                    {
                        to: {
                           $gt: data.to
                        },
                        from: {
                          $lt: data.to
                        }
                    },
                    {
                        to: {
                           $gt: data.from
                        },
                        from: {
                          $lt: data.from
                        }
                    }
                ]
            })

            
            console.log("exists" , exists)
            if (exists) {
                return {
                    status: 400,
                    message: "",
                    data: {}
                }
            }
        } catch (error) {
            throw error
        }
        return super.create(data)
    }

    @Put("")
    async update(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string, @Body({
            schema: loanSettingSchema
        }) data: LoanSetting): Promise<Response> {
        try {
            let exists = await this.repository.isExists({
                _id: {
                    $ne: id
                },
                $or: [
                    {
                        to: {
                           $gt: data.to
                        },
                        from: {
                          $lt: data.to
                        }
                    },
                    {
                        to: {
                           $gt: data.from
                        },
                        from: {
                          $lt: data.from
                        }
                    }
                ]
            })

            console.log("exists" , exists)
            if (exists) {
                return {
                    status: 400,
                    message: "",
                    data: {}
                }
            }
        } catch (error) {
            throw error
        }

        return this.editById(id, {
            $set: data
        })
    }

    @Get("/validate")
    async validateLoanSetting(
        @Query({
            destination: "from",
            schema: BaseController.page
        }) from: number,
        @Query({
            destination: "to",
            schema: BaseController.page
        }) to: number,

        @Query({
            destination: "id",
            schema: BaseController.id.optional()
        }) id?: string,
    ) {
        try {
            let q: any = {
                $or: [
                    {
                        to: {
                           $gt: to
                        },
                        from: {
                          $lt: to
                        }
                    },
                    {
                        to: {
                           $gt: from
                        },
                        from: {
                          $lt: from
                        }
                    }
                ]
            }
            if (id != undefined) {
                q["_id"] = {
                    $ne: id
                }
            }
            return await this.checkExists(q)
        } catch (error) {
            throw error
        }
    }

    @Get("")
    findById(@Query({
        destination : "id",
        schema : BaseController.id
    })id: string | Types.ObjectId, queryInfo?: QueryInfo): Promise<Response> {
        return super.findById(id)
    }

    
    @Post("/by-amount")
    async getAmountByAmount(
        @Body({
            destination : "amount",
            schema : z.number().int().min(1)
        }) amount : number
    ){
        try {
            return this.findOne({
                from : {
                    $lte : amount
                },
                to : {
                    $gte : amount
                }
            })
        } catch (error) {
            throw error
        }
    }
}

const loanSetting = new LoanSettingController("/loan-setting", new LoanSettingRepository(), {
    insertSchema: loanSettingSchema
})

export default loanSetting