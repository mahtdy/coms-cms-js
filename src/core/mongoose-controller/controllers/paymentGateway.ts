import { Body, Query } from "../../decorators/parameters";
import { Get, Put } from "../../decorators/method";
import BaseController, { ControllerOptions } from "../controller";
import PaymentGateway from "../repositories/paymentGateway/model";
import PaymentGatewayRepository from "../repositories/paymentGateway/repository";
import { FilterQuery, Types } from "mongoose";
import { QueryInfo } from "../repository";
import { Response } from "../../controller";
import { z } from "zod"

const payportConfig = {
    meli : {
        name : "ملی",
        fields : [
            {
                name : "کلید api",
                fieldName : "key"
            },
            {
                name : "شناسه پایانه",
                fieldName : "terminalId"
            },
            {
                name : "شناسه تجاری",
                fieldName : "merchantId"
            }
        ]
    },
    parsian : {
        name : "پارسیان",
        fields : [
            {
                name : "کلید ورود",
                fieldName : "pin"
            },
           
        ]
    },
    zarinpal : {
        name : "زرین پال",
        fields : [
            {
                name : "شناسه تجاری",
                fieldName : "merchantId"
            },
            {
                name : "کلید ورودی",
                fieldName : "accessToken"
            }
           
        ]
    },

}


export  class PaymentGatewayController extends BaseController<PaymentGateway> {
    constructor(baseRoute: string, repo: PaymentGatewayRepository, options?: ControllerOptions) {
        super(baseRoute, repo, options)
        this.population = [{
            path: "bankAccount"
        }]
    }

    @Get("")
    async findById(
        @Query({ destination: "id", schema: BaseController.id })
        id: string | Types.ObjectId, queryInfo?: QueryInfo): Promise<Response> {
        return super.findOne({
            _id: id
        }, {
            population: [{
                path: "bankAccount"
            }]
        })
    }

    @Get("/config")
    getConfigField() : Response{
        return {
            status : 200,
            data : payportConfig
        }
    }


    @Put("")
    async edit(
        @Query({ destination: "id", schema: BaseController.id })
        id: string,
        @Body({
            schema: z.object({
                title: z.string().optional(),
                isActive: z.boolean().optional(),
                isRegistered: z.boolean().optional(),
                bankAccount: BaseController.id.optional(),
                config: z.any().optional(),
            })
        }) paymentGateway: PaymentGateway
    ) {
        return await this.editById(id, {
            $set : paymentGateway
        }, {
            ok: true
        })
    }

    async delete(id: Types.ObjectId | string, ...params: [...any]): Promise<Response> {
        try {
            let paymentGateway = await this.repository.findById(id)
            if (paymentGateway?.canDelete == false) {
                return {
                    status: 400,
                    message: "حذف امکان پذیر نمی باشد"
                }
            }
        } catch (error) {
            throw error
        }
        return super.delete(id)
    }


    paginate(page: number, limit: number, query?: FilterQuery<PaymentGateway>, options?: QueryInfo, ...params: [...any]): Promise<Response> {
        return super.paginate(page, limit, query, {
            population: [{
                path: "bankAccount",
                select: ["title", "bank"]
            }]
        })
    }

    initApis(): void {
        super.initApis()

        this.addRouteWithMeta("/search", "get", this.search.bind(this), BaseController.searcheMeta)
        this.addRoute("es/search/list", "get", this.getSearchList.bind(this))
    }

}

const paymentGateway = new PaymentGatewayController("/payment-gateway", new PaymentGatewayRepository(), {
    insertSchema: z.object({
        title: z.string(),
        // name: z.string(),
        type: z.enum([
            "melat",
            "saderat",
            "meli",
            "eghtesad-novin",
            "saman",
            "ap",
            "parsian",
            "pasargad",
            "id-pay",
            "zarinpal",
            "pay",
            "nextpay"
        ]),
        isActive: z.boolean().default(true),
        isRegistered: z.boolean().default(true),
        bankAccount: BaseController.id.optional(),
        canDelete: z.boolean().default(true),
        config: z.any().optional(),
    })
})



export default paymentGateway