import DataTableConfigRepository from "../repositories/dataTableConfig/repository";
import BaseController, { ControllerOptions } from "../controller";
import DataTableConfig from "../repositories/dataTableConfig/model";
import { Response } from "../../controller";
import { AdminInfo } from "../auth/admin/admin-logIn";
import { Admin, Query } from "../../decorators/parameters";
import { z } from "zod";
import CacheService from "../../cache";

export class DataTableConfigController extends BaseController<DataTableConfig>{
    constructor(baseRoute: string, repo: DataTableConfigRepository, options?: ControllerOptions) {
        super(baseRoute, repo, options)
    }
    public doPaginate(
        @Query({
            destination: "page",
            schema: BaseController.page
        })
        page: number,
        @Query({
            destination: "limit",
            schema: BaseController.limit
        }) limit: number,
        @Query({
           
        }) reqQuery : any,
        @Admin() admin: AdminInfo,
        @Query({
            destination: "dataTable",
            schema: z.string().optional()
        }) dataTable?: string,
        
        ): Promise<Response> {

        return this.paginate(page, limit, {
            admin: admin._id,
            dataTable
        }, {
            sort: this.getSort(reqQuery)
        })
    }


    create(data: DataTableConfig, @Admin() admin: AdminInfo): Promise<Response> {
        data.admin = admin._id
        return super.create(data)
    }

    async replace(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        data: DataTableConfig,
        @Admin() admin
            : AdminInfo
    ): Promise<Response> {
        data.admin = admin._id
        return super.replaceOne({
            admin: admin._id,
            _id: id
        }, data, { ok: true })
    }

    initApis(): void {
        this.addRouteWithMeta("", "post", this.create.bind(this), {
            "1": {
                index: 0,
                source: "body",
                schema: this.insertSchema
            }
        })
        this.addRouteWithMeta("", "put", this.replace.bind(this), {
            "1": {
                index: 1,
                source: "body",
                schema: this.insertSchema
            }
        }) ,
        this.addRouteWithMeta("", "delete", this.delete.bind(this), {
            "1": {
                index: 0,
                source: "query",
                schema: BaseController.id,
                destination : "id"
            }
        })
        this.addRoute("es", "get", this.doPaginate.bind(this))
        // this.addRouteWithMeta("", "delete", this.delete.bind(this), {
        //     "1": {
        //         index: 0,
        //         source: "query",
        //         destination: "id",
        //         schema: BaseController.id
        //     },
        // })
    }


}

var dataTableConfig = new DataTableConfigController("/dataTableConfig", new DataTableConfigRepository({
    cacheService : new CacheService("dataTableConfig")
}),{
    insertSchema: z.object({
        lable: z.string(),
        dataTable : z.string(),
        config : z.any().default({}),
    })
})

export default dataTableConfig