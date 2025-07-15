import { FilterQuery, Types } from "mongoose";
import { Response } from "../../controller";
import BaseController, { ControllerOptions } from "../controller";
import POS_Device from "../repositories/posDevice/model";
import POS_DeviceRepository from "../repositories/posDevice/repository";
import { z } from "zod";
import { QueryInfo } from "../repository";
import { Get, Put } from "../../decorators/method";
import { Body, Query } from "../../decorators/parameters";



export class POS_DeviceController extends BaseController<POS_Device> {
    constructor(path: string, repository: POS_DeviceRepository, options?: ControllerOptions) {
        super(path, repository, options)
    }

    @Get("")
    findById(
        @Query({ destination: "id", schema: BaseController.id })
        id: string | Types.ObjectId, queryInfo?: QueryInfo): Promise<Response> {
        return super.findOne({
            _id: id
        }, {

            population: [{
                path: "bankAccount"
            }]
        } )
        
    }

    

    @Put("")
    async edit(
        @Query({ destination: "id", schema: BaseController.id })
        id: string,
        @Body({
            schema: z.object({
                title: z.string().optional(),
                enabled: z.boolean().optional(),
                bankAccount: BaseController.id.optional(),
                // other fields...
            })
        }) posDeviceData: POS_Device
    ) {
        return await this.editById(id, posDeviceData, {
            ok: true
        })
    }


    async delete(id: Types.ObjectId | string, ...params: [...any]): Promise<Response> {
        try {
            let posDevice = await this.repository.findById(id)
            if (posDevice?.canDelete == false) {
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
    paginate(page: number, limit: number, query?: FilterQuery<POS_Device>, options?: QueryInfo, ...params: [...any]): Promise<Response> {
        return super.paginate(page, limit, query, {
            population: [{
                path: "bankAccount",
                select: ["title" , "bank"]
            }]
        },)
    }

    

    initApis(): void {
        super.initApis()
        this.addRouteWithMeta("/search", "get", this.search.bind(this), BaseController.searcheMeta)
        this.addRoute("es/search/list" ,"get" , this.getSearchList.bind(this))
    }



}

const posDevice = new POS_DeviceController("/pos-device", new POS_DeviceRepository(), {
    insertSchema: z.object({
        title: z.string(),
        serialNumber: z.string(),
        enabled : z.boolean().default(true),
        bankAccount : BaseController.id,

    }),
    searchFilters: {
        title: ["reg", "eq"],
        enabled : ["eq"],
        bankAccount : ["eq"],
        _id: ["eq", "list"]
    },
    population: [{
        path: "bankAccount",
        // select: ["title" , "bank"]
    }]

})

export default posDevice

