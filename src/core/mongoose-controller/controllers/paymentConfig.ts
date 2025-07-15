import { Body } from "../../decorators/parameters";
import { Get, Post } from "../../decorators/method";
import BaseController, { ControllerOptions } from "../controller";
import Invoice from "../repositories/invoice/model";
import InvoiceRepository from "../repositories/invoice/repository";
import PaymentConfig from "../repositories/paymentConfig/model";
import PaymentConfigRepository from "../repositories/paymentConfig/repository";
import PaymentConfigPreTextRepository from "../repositories/paymentConfigPreText/repository"




export default class PaymentConfigController extends BaseController<PaymentConfig> {
    invoiceRepo : InvoiceRepository<Invoice >
    paymentConfigPreTextRepo : PaymentConfigPreTextRepository
    constructor(baseRoute: string, repo: PaymentConfigRepository , invoiceRepo : InvoiceRepository<Invoice>, options?: ControllerOptions) {
        super(baseRoute, repo, options)
        this.invoiceRepo = invoiceRepo
        this.paymentConfigPreTextRepo = new PaymentConfigPreTextRepository()
    }

    


    @Post("/check/edit")
    async editCheck(@Body({

    }) data: any) {
        
    }


    async searchHelper(queryParam?: any): Promise<any> {
        let q = await super.searchHelper(queryParam)
        if (queryParam["type$ne"]) {
            q["type"] = { $ne: queryParam["type$ne"] }
        }
        return q
    }


    // paginate(page: number, limit: number, query?: FilterQuery<PaymentConfig>, options?: QueryInfo | undefined, ...params: any[]): Promise<Response> {
    //     if(options == undefined){
    //         options = {}
    //     }
    //     if( options.population == undefined){
    //         options["population"] = []
    //     }
    //     options["population"].push({
    //         path : "invoice",
    //         select : ["tax"]
    //     })
    //     // console.log("paginate" ,options)
    //     return super.paginate(page, limit, query, options)
    // }

    // adminPaginate(page: number, limit: number, adminInfo: AdminInfo, query?: FilterQuery<PaymentConfig>, options?: QueryInfo | undefined, ...params: any[]): Promise<Response> {
    //     if(options == undefined){
    //         options = {}
    //     }
    //     if( options.population == undefined){
    //         options["population"] = []
    //     }
    //     options["population"]?.push({
    //         path : "invoice",
    //         select : ["tax"]
    //     })
    //     // console.log("adminPaginate")
    //     return super.adminPaginate(page, limit, adminInfo, query, options)
    // }

    
    initApis(): void {
        super.initApis()
        this.addRouteWithMeta("es/search", "get", this.search.bind(this), BaseController.searcheMeta)
        this.addRoute("es/search/list", "get", this.getSearchList.bind(this))
    }
 
    
}

