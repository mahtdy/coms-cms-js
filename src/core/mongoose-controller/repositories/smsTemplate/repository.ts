
import SmsTemplate, { SmsTemplateModel } from "./model";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import { Types, UpdateQuery } from "mongoose";
import SmsConfigRepository from "../smsConfig/repository";
import SmsMessager from "../../../messaging/smsMessager";


export default class SmsTemplateRepository extends BaseRepositoryService<SmsTemplate> {
    configRepo: SmsConfigRepository
    constructor(options?: RepositoryConfigOptions) {
        super(SmsTemplateModel, options)
        this.configRepo = new SmsConfigRepository()

    }
    async disableDefaultConfig(id: string) {
        try {
            // var template = 
            await this.updateMany({
                defaultSmsConfig: id
            }, {
                $unset: {
                    defaultSmsConfig: 1
                }
            })
        } catch (error) {
            throw error
        }
    }

    async insert(document: SmsTemplate): Promise<SmsTemplate> {
        try {

            document.isCore = false
            if (document.sendOTP) {
                document.id = await SmsMessager.addTemplate({
                    template: document,
                    text: document.text
                })
            }
            if (document.defaultSmsConfig) {
                var otp = await this.configRepo.getOTP()
                if (otp?._id == document.defaultSmsConfig) {
                    document.id = await SmsMessager.addTemplate({
                        template: document,
                        text: document.text
                    })
                }
            }
            document.status = "waiting"
        } catch (error) {
            throw error
        }
        return super.insert(document)
    }

    async findByIdAndUpdate(id: string | Types.ObjectId, query: UpdateQuery<SmsTemplate>): Promise<SmsTemplate | null> {
        try {
            var template = await this.findById(id)

            var res = await super.findByIdAndUpdate(id, query)
            var templateAfter = await this.findById(id)

            if (templateAfter?.sendOTP) {
                if (templateAfter?.id) {
                    if (template?.text != templateAfter.text)
                        await SmsMessager.editTemplate({
                            template: templateAfter,
                            text: templateAfter.text
                        })
                }
                else {
                    var tid = await SmsMessager.addTemplate({
                        template: templateAfter,
                        text: templateAfter.text
                    })
                    await this.updateOne({
                        _id: id
                    }, {
                        $set: {
                            id: tid
                        }
                    })
                }

            }

            var otp = await this.configRepo.getOTP()
            if (templateAfter?.defaultSmsConfig && templateAfter?.defaultSmsConfig != otp?._id) {
                if (templateAfter?.id) {
                    if (template?.text != templateAfter.text)
                        await SmsMessager.editTemplate({
                            template: templateAfter,
                            text: templateAfter.text
                        })
                }
                else {
                    var tid = await SmsMessager.addTemplate({
                        template: templateAfter,
                        text: templateAfter.text
                    })
                    await this.updateOne({
                        _id: id
                    }, {
                        $set: {
                            id: tid
                        }
                    })
                }
            }
            return res
        } catch (error) {
            throw error
        }


    }

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

            var template = await this.findById(id)
            let status
            if (template?.sendOTP) {
                status = await SmsMessager.getTemplateStatus(template?.id || 0)
            }
            if (template?.defaultSmsConfig) {
                var otp = await this.configRepo.getOTP()
                if (otp?._id == template.defaultSmsConfig) {
                    status = await SmsMessager.getTemplateStatus(template?.id || 0)
                }
            }
            if (status !== undefined && status !== 1) {
                throw new Error("این الگو را نمی توان تایید کرد")
            }
            return this.updateOne({
                _id: id
            }, {
                $set: {
                    status: "active"
                }
            })
        } catch (error) {
            throw error
        }

    }

    async rejectedTemplate(id: string | Types.ObjectId): Promise<any> {
        return this.updateOne({
            _id: id
        }, {
            $set: {
                status: "inactive"
            }
        })
    }



}
