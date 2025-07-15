import { z } from "zod";
import { Route } from "../application"
import { Get } from "../decorators/method";
import { Param, Query } from "../decorators/parameters";
import { Plugin } from "../plugin"
import { Response } from "../controller";
import FinanceService from "./financeService";
import Invoice from "./repositories/invoice/model";
import BaseController from "./controller";


export default class PayGateWay<T extends Invoice> extends Plugin {
    financeService: FinanceService<T>
    constructor(financeService: FinanceService<T>) {
        super()
        this.financeService = financeService
    }


    async pay(
        @Param({
            destination: "code",
            schema: z.string()
        }) code: string,
        @Query({
            destination: "paymentId",
            schema: BaseController.id.optional()
        }) paymentId ?: string
    ): Promise<Response> {
        console.log("code", code)
        try {

            let link = await this.financeService.getPaymentLink(code,paymentId)
            return {
                redirect : link

            }
        } catch (error) {
            throw error
        }
    }


    async verifyPayment() {
        try {
            // let verified
        } catch (error) {
           throw error 
        }
    }

    async init(): Promise<any> {


        return true;
    }
    serve(...args: any[]): Route[] {

        return [
            {
                execs: this.pay.bind(this),
                method: "get",
                route: "/pay/:code",
                meta: {
                    params: {
                        "1": {
                            index: "0",
                            source: "param",
                            destination: "code",
                            schema: z.string()
                        }
                    }
                }
            }
        ]
    }
}

