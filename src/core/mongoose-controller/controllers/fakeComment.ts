import { Body, Query } from "../../decorators/parameters";
import { Delete, Post, Put } from "../../decorators/method";
import BaseController, { ControllerOptions } from "../controller";
import FakeComment from "../repositories/fakeComment/model";
import FakeCommentRepository from "../repositories/fakeComment/repository";
import z from "zod"
import { Response } from "../../controller";
import { Types } from "mongoose";

export const insertSchema = z.object({
    pageType: z.string(),
    page : BaseController.id,
    status : z.enum(["waiting" , "confirmed" , "rejected"]).default("waiting"),
    text: z.string(),
    userInfo: z.any(),
    publishAt: z.coerce.date(),
    cycle: BaseController.id.optional(),

    replyAdmin: BaseController.id.optional(),
    replyText: z.string().optional(),
    replyPublishAt: z.coerce.date().optional(),
    replyCycle: BaseController.id.optional(),

    info: z.any()
})


export class FakeCommentController extends BaseController<FakeComment>{
    constructor(baseRoute : string ,repo : FakeCommentRepository, options?: ControllerOptions){
        super(baseRoute,repo, options)
        
    }


        

    @Put("")
    async updateOne(
        @Query({
            destination : "id",
            schema : BaseController.id
        }) id : string,
        @Body({
            schema : z.object({
                
            })
        }) body : any
    ){

    }
    
    

    async create(data: FakeComment, ...params: any[]): Promise<Response> {
        return super.create(data)
    } 

    delete(id: string | Types.ObjectId, ...params: any[]): Promise<Response> {
        return super.delete(id)
    }

    





    @Post("/confirm")
    async confirmFakeComment(
        @Query({
            destination : "id",
            schema : BaseController.id
        }) id : string
    ){

    }

    @Post("/reject")
    async rejectFakeComment(
        @Query({
            destination : "id",
            schema : BaseController.id
        }) id : string
    ){

    }


    initApis(): void {
            super.initApis()
    }


    
}

const fakeComment = new FakeCommentController("/manual-comment" , new FakeCommentRepository(),{
    insertSchema 
})

export default fakeComment