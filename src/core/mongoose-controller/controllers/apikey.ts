import { Response } from "../../controller";
import BaseController from "../controller";
import APIKey from "../repositories/apiKey/model";
import APIKeyRepository from "../repositories/apiKey/repository";
import { z } from "zod"
import { Admin, Query, Body } from "../../decorators/parameters";
import { AdminInfo } from "../auth/admin/admin-logIn";
import { Put } from "../../decorators/method";



export class APIKeyController extends BaseController<APIKey>{
    create(data: APIKey, @Admin() adminInfo: AdminInfo): Promise<Response> {
        data.creator = adminInfo._id
        return super.create(data)
    }

    @Put("")
    async update(@Query({
        destination: "id",
        schema: BaseController.id
    }) id: string, @Body({
        schema: z.object({
            title: z.string(),
            expire: z.coerce.date().optional(),
            status: z.boolean(),
            email: BaseController.email.optional(),
            phone: BaseController.phone.optional(),
            ips: z.array(BaseController.ip).default([])
        })
    }) data: any): Promise<Response> {
        return super.editById(id, {
            $set: data
        }, {
            ok: true
        })
    }


    @Put("/permission/messaging")
    async changeMessagingPermission(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Body({
            schema: z.object({
                partition: z.string(),
                type: z.enum(["any", "semi"]),
                permissionData: z.any().default({})
            })
        }) data: any,
    ): Promise<Response> {
      
        if(await this.repository.isExists({
            _id: id , 
            "permission.partition" : data.partition
        })){
            return super.editOne({
                _id: id,
                "permission.partition" : data.partition
            }, {
                $set: {
                    "permission.$": data
                  }
            })
        }

        return  super.editOne({
            _id: id
        }, {
            $push: {
                "permission": data
              }
        })
       
    }




}

var apikey = new APIKeyController("/apikey", new APIKeyRepository({

}), {
    insertSchema: z.object({
        title: z.string(),
        expire: z.coerce.date().optional(),
        status: z.boolean(),
        email: BaseController.email.optional(),
        phone: BaseController.phone.optional(),
        ips: z.array(BaseController.ip).default([])
    }),
})

export default apikey