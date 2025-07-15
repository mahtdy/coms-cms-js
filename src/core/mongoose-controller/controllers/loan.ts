import { Response } from "../../controller";
import { Get } from "../../decorators/method";
import { AdminInfo } from "../auth/admin/admin-logIn";
import BaseController, { ControllerOptions } from "../controller";
import PaymentConfig from "../repositories/paymentConfig/model";
import PaymentConfigRepository from "../repositories/paymentConfig/repository";



export class LoanController extends BaseController<PaymentConfig>{
    constructor(baseRoute: string, repo: PaymentConfigRepository, options?: ControllerOptions) {
        super(baseRoute, repo, options)
        this.population = [
            {
                path: "owner",
                select : ["name" , "family"]
            }
        ]
    }
    

    @Get("/loan/pagination/config")
    async getPaginationConfig() {

        try {
            // this.p
            return {
                data: this.paginationConfig
            }
        } catch (error) {
            throw error
        }
    }


    async searchHelper(queryParam?: any): Promise<any> {

        let q=await super.searchHelper(queryParam)
        q["payFor"] = "chargeAccount"
        q["type"] = "installment"

        return q
    }

    // pagin

    // public async search(page: number, limit: number, reqQuery: any, admin?: any, ...params: [...any]) {
    //     try {


    //         var query = await this.searchHelper(reqQuery)
    //         // console.log("fuck" , query)
    //         if (reqQuery["_id$ne"]) {
    //             query["_id"] = {
    //                 $ne: reqQuery["_id$ne"]
    //             }
    //         }

    //         if (this.collectionName != undefined || this.isAdminPaginate) {
    //             return this.adminPaginate(page, limit, admin as AdminInfo, query, {
    //                 sort: this.getSort(reqQuery)
    //             })
    //         }
    //         return await this.paginate(page, limit, query, {
    //             sort: this.getSort(reqQuery)
    //         })

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    initApis() {
        this.addRouteWithMeta("/loans", "get", this.search.bind(this), Object.assign(BaseController.searcheMeta, { absolute: false }))
        // super.initApis()
    }
}

const loan = new LoanController("/finance/payment/config", new PaymentConfigRepository({
    population : [
        {
            path: "owner",
            select : ["name" , "family"]
        }
    ]
}), {
    apiDoc: {
        tags: ["/api/admin/finance"]
    },
    paginationConfig: {
        fields: {
      

            "owner" : {
                fa_title : "وام گیرنده",
                en_title : "owner",
                isOptional: false,
                sortOrderKey: false,
                type: "string",
                object_value: ["name", "family"],
                target_func: "v1",
            },
            
            amount: {
                en_title: "amount",
                fa_title: "مبلغ وام",
                isOptional: false,
                sortOrderKey: true,
                type: "number",

            },

            hasLateness: {
                en_title: "hasLateness",
                fa_title: "تاخیر دارد؟",
                isOptional: false,
                sortOrderKey: true,
                type: "boolean",

            },
         
            "installmentConfig.count": {
                fa_title: "تعداد اقساط",
                en_title: "installmentConfig.count",
                type: "string",
                object_value: ["count"],
                isOptional: false,
                sortOrderKey: false
            },  
            "installmentConfig.paidCount": {
                fa_title: "تعداد پرداخت",
                en_title: "installmentConfig.paidCount",
                type: "string",
                object_value: ["paidCount"],
                isOptional: false,
                sortOrderKey: false
            },
            "installmentConfig.formula": {
                fa_title: "نوع سود",
                en_title: "installmentConfig.formula",

                type: "string",
                object_value: ["formula"],
                translator :{
                    "banking" : "بانکی", 
                    "market" : "بازاری"
                },
                target_func : "v2",
                isOptional: false,
                sortOrderKey: false
            },
            "installmentConfig.interestRate": {
                fa_title: "نرخ سود",
                en_title: "installmentConfig.interestRate",
                type: "number",
                object_value: ["interestRate"],
                isOptional: false,
                sortOrderKey: false
            },
            "installmentConfig.payStart": {
                fa_title: "زمان شروع",
                en_title: "installmentConfig.payStart",
                type: "date",
                object_value: ["payStart"],
                isOptional: false,
                sortOrderKey: false
            },
            "installmentConfig.nextStep": {
                fa_title: "وضعیت",
                en_title: "installmentConfig.nextStep",
                type: "string",
                object_value: ["nextStep"],
                isOptional: false,
                translator :{
                    "documentSubmission" : "در انتظار ثبت مدارک", 
                    "initialApproval" : "در انتظار تایید اولیه", 
                    "checks" : "در انتظار ثبت چک", 
                    "guarantors" : "در انتظار ضامنین", 
                    "finalApproval" : "در انتظار تایید نهایی",
                    "rejected" : "رد شده",
                    "completed" : "تکمیل شده",
                },
                target_func : "v2",
                sortOrderKey: false
            },
        },
    
        paginationUrl: "/finance/payment/config/loans",
        searchUrl: "/finance/payment/config/loans",
        serverType: "",
        tableLabel: "loan",
        actions: [
            {
                route: "/panel/financial/loan/info/$_id",
                type: "edit",
                api: "",
                queryName: "",
                fromData: ["_id"]
            },

        ]



    },
    searchFilters: {
        // title: ["reg", "eq"],
        
    }
})

export default loan