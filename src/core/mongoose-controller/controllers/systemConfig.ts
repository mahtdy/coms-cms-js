import BaseController, { ControllerOptions } from "../controller"
import { SystemConfig } from "../repositories/system/model"
import SystemConfigRepository from "../repositories/system/repository"
import { Param , Body, Query} from "../../decorators/parameters"
import { z } from "zod"
import { Response } from "../../controller"
import { Put,Get, Post } from "../../decorators/method"

export class SystemConfigController extends BaseController<SystemConfig>{
    constructor(baseRoute: string, repo: SystemConfigRepository, options?: ControllerOptions) {
        super(baseRoute, repo, options)
    }
    

    @Get("s/:lable")
    async getConfigByLable(
        @Param({
            destination: "lable",
            schema: z.string()
        }) lable: string,
    ) {
        try {
            return await this.findMany({
                lable
            })
        }
        catch (error) {
            throw error
        }
    }

    @Get("/config-value")
    async getConfigValue(@Query({
        destination :"key",
        schema : z.string()
    }) key : string) : Promise<Response>{
        try {
            let value = await this.repository.getConfigValue(key)
            if(value == undefined){
                return {
                    status : 404
                }
            }
            return {
                status : 200,
                data: value
            }
        } catch (error) {
            throw error
        }
    }


    @Put("s/:lable")
    async updateConfig(
        @Param({
            destination: "lable",
            schema: z.string()
        }) lable: string,
        @Body({
            schema :z.array(z.object({
                key :z.string(),
                value : z.any().default({})
            }))
        }) updateData :  { key: string, value: any }[]
    ): Promise<Response> {
        var confs: SystemConfig[] = []

        for (let i = 0; i < updateData.length; i++) {
            var conf = await this.repository.findOne({ key: updateData[i].key, lable }, {
                fromDb: true
            });

            if (conf == null) {
                return {
                    status : 404,
                    message : "یافت نشد"
                }
            }

            conf.value = updateData[i].value
            try {
                await conf.validate()
            } catch (error) {
                throw error
            }
            confs.push(conf)
        }

        for (let i = 0; i < updateData.length; i++) {
            await this.repository.findByIdAndUpdate(confs[i]._id, {
                $set: {
                    value: updateData[i].value
                }
            })
        }
        return {
            status : 200,
            data : []
        }
    }

    @Post("s/:lable")
    async addSystemConfig(
        @Param({
            destination : "lable",
            schema : z.string()
        }) lable : string,
        @Body({
            schema : z.object({
                key : z.string(),
                value : z.any(),
                type : z.enum( [
                    "Number",
                    "String",
                    "Object",
                    "Time",
                    "Duretion",
                    "Boolean",
                    "Array",
                    "ObjectId"
                ]),
                enum : z.array(z.string()).optional()

            })
        }) body : any
    ) : Promise<Response> {
        body['lable'] = lable
        return this.create(body)
    }

    initApis(): void {
        // console.log("init")
        // super.initApis()
        // // this.addRoute("s/:lable","get", this.getConfigByLable.bind(this))
        // // this.addRoute("s/:lable","put", this.updateConfig.bind(this))
        // this.exclude("/systemConfig" , "delete")
    }
}

var systemConfig = new SystemConfigController("/systemConfig", new SystemConfigRepository(),{
    insertSchema : z.object({
        key : z.string(),
        value : z.any().default({}),
        lable : z.string(),
        type : z.enum([ "Number", 'String', "Object", "Time", "Duretion", "Boolean", "Array", 'ObjectId']),
        max : z.coerce.number().int().optional(),
        min : z.coerce.number().int().optional(),
        unit : z.string().optional(),
        description : z.string().optional(),
        options : z.array(z.any())
    })
})
export default systemConfig