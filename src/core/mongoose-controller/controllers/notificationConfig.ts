import { Response } from "../../controller";
import BaseController from "../controller";
import NotificationConfig from "../repositories/notificationConfig/model";
import NotificationConfigRepository from "../repositories/notificationConfig/repository";
import { z } from "zod"
import { Body, Query } from "../../decorators/parameters";
import { Put } from "../../decorators/method";
import { UpdateQuery } from "mongoose";



export class NotificationConfigController extends BaseController<NotificationConfig>{


    async create(data: NotificationConfig): Promise<Response> {
        try {
            var resp = await super.create(data)
            if (resp.status == 200 && data.isDefault) {
                await this.repository.updateOne({
                    isDefault: true,
                    _id: {
                        $ne: resp.data?._id
                    }
                }, {
                    $set: {
                        isDefault: false
                    }
                })
            }
        } catch (error) {
            throw error
        }
        return resp
    }

    @Put("")
    async editById(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Body({
            schema : z.object({
                isDefault : z.boolean().optional(),
                config : BaseController.search.optional(),
                title: z.string().optional(),
            })
        }) data : any
        
        ): Promise<Response> {
        try {
            var resp = await super.editById(id, {
                $set: data
            } as UpdateQuery<NotificationConfig>)
            if (resp?.status == 200 && data.isDefault) {
                await this.repository.updateOne({
                    isDefault: true,
                    _id: {
                        $ne: id
                    }
                }, {
                    $set: {
                        isDefault: false
                    }
                })
            }
        } catch (error) {
            throw error
        }
        return resp
    }

}

var notificationConfig = new NotificationConfigController("/notification/config", new NotificationConfigRepository({

}), {
    insertSchema: z.object({
        config: BaseController.search,
        title: z.string(),
        isDefault: z.boolean().default(false)
    })
})

export default notificationConfig