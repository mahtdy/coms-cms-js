
import RedisCache from "../../redis-cache";
import { Delete, Get, Post } from "../../decorators/method";
import { Admin, Body, Files } from "../../decorators/parameters";
import BaseController from "../controller";
import Chat from "../repositories/chat/model";
import ChatRepository from "../repositories/chat/repository";
import RandomGenarator from "../../random";
import { AdminInfo } from "../auth/admin/admin-logIn";
import { Response } from "../../controller";
import { z } from "zod"
import CDN_Manager from "../../services/fileManager";
import { ArticleController } from "./article";
import path from "path"
import { Types } from "mongoose";

const cacheService = new RedisCache("socket_data")

export class ChatController extends BaseController<Chat>{


    @Delete("")
    async deleteByPhone(@Body( {destination : "phone" , schema : z.string()}) phone: string): Promise<Response> {
        try {
            await this.repository.findOneAndDelete({
                "info.userInfo.phoneNumber" : phone 
            })
            return {
                status : 200,
                data : {}
            }
        } catch (error) {
            throw error
        }
    }

    @Post("/attach")
    async attach(
        @Body({
            destination: "file",
            schema: z.string()
        }) file: string,
        @Files({
            config: {
                name: "file",
                maxCount: 5,
                size : 5000000
            },
            mapToBody: true,
            destination: "file",
            // isArray: true,
            schema: z.any().optional(),


        }) files: any
    ): Promise<Response> {
        try {
            var cdn: CDN_Manager = new CDN_Manager()
            await cdn.init(true)
            let dest = ArticleController.getUploadDestination("chat/", "y-m-d") + path.basename(file)
            // console.log("conf" , cdn.config)
            let data = await cdn.uploadWithState(file, dest)
            // console.log("dataaaa" , data)
            return {
                status: 200,
                data
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    @Get("/token")
    async getToken(
        @Admin() admin: AdminInfo
    ): Promise<Response> {
        try {
            let token = RandomGenarator.generateHashStr(32)
            await cacheService.set(token, admin._id)
            return {
                status: 200,
                data: {
                    token
                }
            }
        } catch (error) {
            throw error
        }

    }



    initApis(): void {

    }

}

const chat = new ChatController("/chat", new ChatRepository(),
    {
        // insertSchema: z.object({
        //     collectionName: z.string(),
        //     collectionSchema:  z.record(z.string(), z.object({
        //         sub: BaseController.search.optional(),
        //         visible: z.enum(["0", "1", "2"]),
        //         persianName : z.string(),
        //         canEdit : z.boolean().default(false)
        //     })),
        //     persianName: z.string(),
        //     subPart: z.string()
        // })
    })

export default chat
