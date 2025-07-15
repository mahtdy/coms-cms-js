import { Body, Query } from "../../decorators/parameters";
import { Put } from "../../decorators/method";
import BaseController from "../controller";
import TemplateConfig from "../repositories/templateConfig/model";
import TemplateConfigRepository from "../repositories/templateConfig/repository";
import {z} from "zod"



export class TemplateConfigController extends BaseController<TemplateConfig>{


    @Put("/image-config",{

    })
    async updateConfig(
        @Query({
            destination : "id",
            schema : BaseController.id
        }) id : string,
        @Body({
            schema : z.array(z.object({
                name : z.string(),
                resolotion: z.object({
                    h : z.coerce.number().positive().default(150),
                    w :  z.coerce.number().positive().default(150),
                }),
                compersionConfig : z.any()
            }))
        }) imageConfig : any
    ){
        return this.editById(id,{
            $set : {
                imageConfig 
            }
        })
    }
}

const templateConfig = new TemplateConfigController("/template-config", new TemplateConfigRepository(),{
    insertSchema : z.object({
        template : BaseController.id,
        language : BaseController.id.optional(),
        type: z.enum(["general" , "gallery" , "video" , "podcast" , "category_faq" , "increamental"]),
        imageConfig : z.array(z.object({
            name : z.string(),
            resolotion: z.object({
                h : z.coerce.number().positive().default(150),
                w :  z.coerce.number().positive().default(150),
            }),
            compersionConfig : z.any()
        }))
    })
})

export default templateConfig