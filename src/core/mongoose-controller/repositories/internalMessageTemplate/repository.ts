import { Types, UpdateQuery } from "mongoose";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import InternalMessageConfigRepository from "../notificationConfig/repository";
import InternalMessageTemplate, { InternalMessageTemplateModel } from "./model";



export default class InternalMessageTemplateRepository extends BaseRepositoryService<InternalMessageTemplate>{
    constructor(options?: RepositoryConfigOptions) {
        super(InternalMessageTemplateModel, options)
        this.configRepo = new InternalMessageConfigRepository()

    }

    async insert(document: InternalMessageTemplate): Promise<InternalMessageTemplate> {
        try {

            document.isCore = false
            // document.status = "waiting"
        } catch (error) {
            throw error
        }
        return super.insert(document)
    }

    // async findByIdAndUpdate(id: string | Types.ObjectId, query: UpdateQuery<InternalMessageTemplate>): Promise<InternalMessageTemplate | null> {
    //     try {
    //         var template = await this.findById(id)

    //         var res = await this.findByIdAndUpdate(id, query)

    //         var templateAfter = await this.findById(id)
           
            
    //         return res
    //     } catch (error) {
    //         throw error
    //     }


    // }

    async deleteById(id: string | Types.ObjectId): Promise<any> {
        if (await this.isExists({
            _id: id,
            isCore: true
        })) {
            throw new Error("قالب اصلی قابل حذف نیست ")
        }
        return super.deleteById(id)
    }


    async confirmTemplate(id: string | Types.ObjectId): Promise<any> {
        try {
            
            return this.updateOne({
                _id : id
            }, {
                $set : {
                    status :"active"
                }
            })
        } catch (error) {
            throw error
        }

    }

    async rejectedTemplate(id: string | Types.ObjectId): Promise<any> {
        return this.updateOne({
            _id : id
        }, {
            $set : {
                status : "inactive"
            }
        })
    }
}