import { Types, UpdateQuery } from "mongoose";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import { NotificationConfigModel } from "../notificationConfig/model";
import NotificationConfigRepository from "../notificationConfig/repository";
import NotificationTemplate, { NotificationTemplateModel } from "./model";



export default class NotificationTemplateRepository extends BaseRepositoryService<NotificationTemplate>{
    configRepo: NotificationConfigRepository
    constructor(options?: RepositoryConfigOptions) {
        super(NotificationTemplateModel, options)
        this.configRepo = new NotificationConfigRepository()

    }
    async disableDefaultConfig(id: string) {
        try {
            // var template = 
            await this.updateMany({
                defaultNotificationConfig: id
            }, {
                $unset: {
                    defaultNotificationConfig: 1
                }
            })
        } catch (error) {
            throw error
        }
    }

    async insert(document: NotificationTemplate): Promise<NotificationTemplate> {
        try {

            document.isCore = false
            document.status = "waiting"
        } catch (error) {
            throw error
        }
        return super.insert(document)
    }

    // async findByIdAndUpdate(id: string | Types.ObjectId, query: UpdateQuery<NotificationTemplate>): Promise<NotificationTemplate | null> {
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