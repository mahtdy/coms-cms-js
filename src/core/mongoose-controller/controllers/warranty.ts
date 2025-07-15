import ConfigService from "../../services/config";
import { Body, Files, POST, Query } from "../../decorators/parameters";
import BaseController, { ControllerOptions } from "../controller";
import FileManagerConfigRepository from "../repositories/fileManagerConfig/repository";
import Warranty, { Warrantor } from "../repositories/warranty/model";
import WarrantyRepository from "../repositories/warranty/repository";
import { Response } from "../../controller";
import { z } from "zod"
import { Delete, Get, Post, Put } from "../../../core/decorators/method";
import { addressSchema } from "../repositories/address/model";
import PaymentConfigRepository from "../repositories/paymentConfig/repository";
import LoanTemplateRepository from "../repositories/loanTemplate/repository";
import { Types } from "mongoose";
import LoanSettingRepository from "../repositories/loanSetting/repository";
import { AdminInfo } from "../auth/admin/admin-logIn";

import SmsMessager from "../../messaging/smsMessager";
import RandomGenarator from "../../random";
import EmailMessager from "../../messaging/emailMessager";

export class WarrantyController extends BaseController<Warranty> {
    paymentRepo: PaymentConfigRepository
    loanTemplateRepo: LoanTemplateRepository
    loanSettingRepo: LoanSettingRepository
    constructor(baseRoute: string, repo: WarrantyRepository, paymentRepo: PaymentConfigRepository, options?: ControllerOptions) {
        super(baseRoute, repo, options)
        this.paymentRepo = paymentRepo
        this.loanTemplateRepo = new LoanTemplateRepository()
        this.loanSettingRepo = new LoanSettingRepository()
        this.population = [
            {
                path: "warrantor.address"
            },
            {
                path: "warrantor.workAddrress"
            },
            {
                path: "paymentConfig"
            },
            {
                path: "deedAddress"
            }
        ]
    }



    // @Post("")
    async create(
        data: Warranty,
        @Body({
            destination: "attachements"
        }) file?: string,
        @Files({
            config: {
                name: "attachement",
                maxCount: 5,
                types: ["jpg", "pdf", "png", "zip"],
                dest: "src/uploads/waranty/",
                rename: true
            },
            schema: z.any().optional(),
            destination: "attachement",
            isArray: true,
            mapToBody: true,
            isOptional: true
        }) files?: any,): Promise<Response> {

        console.log(data, file)
        if (file != undefined) {
            // data.attachement = file.replace(ConfigService.getConfig("staticRoute") ,ConfigService.getConfig("staticFileRoute") )
        }
        console.log(data)
        return super.create(data)
    }

    @Post("/warrantor/info")
    async addWarantorInfo(
        @Body({
            schema: z.object({
                nameAndFamily: z.string(),
                email: BaseController.email.optional(),
                phone: BaseController.phone,
                address: addressSchema.optional(),

                telephone: z.string(),

                fatherName: z.string(),
                birthCertificateNumber: z.string().regex(/^[0-9]*$/),
                gender: z.enum(["male", "female", "other"]),

                nationalCode: z.string().regex(/^[0-9]*$/),
                workAddrress: addressSchema.optional(),
                workTelephone: z.string(),
                jobTitle: z.string()
            }),
            destination: "data"
        }) warrantor: Warrantor,
        @Body({
            destination: "id",
            schema: BaseController.id
        }) id: string
    ): Promise<Response> {
        try {
            return {
                status: 200,
                data: await this.repository.addWarrantor(warrantor, id)
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }



    @Get("")
    async getWarrantyById(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string
    ): Promise<Response> {
        try {
            return await this.findOne({
                _id: id
            }, {
                population: [
                    {
                        path: "warrantor.address"
                    },
                    {
                        path: "warrantor.workAddrress"
                    }
                ]
            })

        } catch (error) {
            throw error
        }
    }

    @Put("/warrantor/info")
    async editWarranty(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Body({
            schema: z.object({
                nameAndFamily: z.string(),
                email: BaseController.email.optional(),
                phone: BaseController.phone,
                address: addressSchema.optional(),
                telephone: z.string(),

                fatherName: z.string(),
                birthCertificateNumber: z.string().regex(/^[0-9]*$/),
                gender: z.enum(["male", "female", "other"]),

                nationalCode: z.string().regex(/^[0-9]*$/),
                workAddrress: addressSchema.optional(),
                workTelephone: z.string(),
                jobTitle: z.string()


            }),
            destination: "data"
        }) warrantor: Warrantor,
    ): Promise<Response> {
        try {
            return {
                status: 200,
                data: await this.repository.editWarrantor(id, warrantor)
            }
        } catch (error) {
            throw error
        }
    }


    @Post("/attachments", {
        contentType: "multipart/form-data"
    })
    async addAttachments(
        @Body({
            destination: "id",
            schema: BaseController.id
        }) id: string,

        @Body({
            destination: "name",
            schema: z.enum(["birthCertificate", "nationalCard", "jobQualifications", "residenceInfo", "financeInfo", "sanaInfo", "otherInfo"])
        }) name: string,

        @Body({
            destination: "attachement"
        }) attachement: string[],

        @Files({
            config: {
                name: "attachement",
                maxCount: 5,
                types: ["jpg", "png", "webp", "jpeg"],
                dest: "src/uploads/waranty/",
                rename: true,

            },
            schema: z.any().optional(),
            destination: "attachement",
            isArray: true,
            mapToBody: true,
            isOptional: true,
            moveFilesToCDN: {
                name: "attachement",
                config: {
                    path: "loan/",
                },
            },
        }) files?: any,

    ): Promise<Response> {
        try {
            const warranty = await this.repository.findById(id);

            if (warranty == null) {
                return {
                    status: 404
                }
            }

            if (warranty.attachments == undefined) {
                warranty.attachments = {}
            }


            let a = warranty.attachments[name]

            if (a) {
                warranty.attachments[name].push({
                    url: attachement
                })
            } else {
                warranty.attachments[name] = [{ url: attachement }]
            }



            await this.repository.updateOne({
                _id: id
            }, {
                $set: warranty
            })
            return {
                status: 200,
                data: attachement
            }


        } catch (error) {
            throw error
        }
    }

    @Post("/attachments/remove")
    async deleteAttachments(
        @Body({
            destination: "id",
            schema: BaseController.id
        }) id: string,

        @Body({
            destination: "name",
            schema: z.enum(["birthCertificate", "nationalCard", "jobQualifications", "residenceInfo", "financeInfo", "sanaInfo", "otherInfo"])
        }) name: string,

        @Body({
            destination: "link",
            schema: z.string()
        }) link: string,
    ): Promise<Response> {
        try {
            const warranty = await this.repository.findById(id);

            if (warranty == null) {
                return {
                    status: 404
                }
            }


            if (warranty.attachments == undefined) {
                warranty.attachments = {}
            }

            let attachment = warranty.attachments[name]

            if (attachment) {
                warranty.attachments[name] = warranty.attachments[name].filter((item: any) => item.url !== link)
            }

            return await this.editById(id, {
                $set: warranty
            }, warranty.attachments)

        } catch (error) {
            throw error
        }

    }

    @Post("")
    async addWarranty(
        @Body({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Body({
            destination: "data",
            schema: z.object({
                type: z.enum(["deed", "personal"]),
                personalType: z.enum(["check", "promissory"]).optional(),
                info: z.any(),
                deedAddress: BaseController.address.optional()
            }),
            parseJson: true
        }) data: any,

    ): Promise<Response> {
        try {
            return {
                status: 200,
                data: await this.repository.addWarranty(id, data)
            }
        } catch (error) {
            throw error
        }
    }

    @Post("/deed/attachment")
    async addDeedAttachment(
        @Body({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Body({
            destination: "attachement"
        }) attachement: any,

        @Files({
            config: {
                name: "attachement",
                maxCount: 5,
                types: ["jpg", "png", "webp", "jpeg"],
                dest: "src/uploads/waranty/",
                rename: true,

            },
            schema: z.any().optional(),
            destination: "attachement",
            isArray: true,
            mapToBody: true,
            isOptional: true,
            moveFilesToCDN: {
                name: "attachement",
                config: {
                    path: "loan/",
                },
            },
        }) files?: any,
    ) {
        try {

            let data: any = {}
            let deed = []
            if (typeof attachement == "string") {
                if (attachement != "")
                    deed.push({
                        url: attachement
                    })
            }
            else {
                for (let i = 0; i < attachement.length; i++) {
                    deed.push({
                        url: attachement[i]
                    })
                }

            }




            return this.editById(id, {
                $push: {
                    deed: {
                        $each: deed
                    }
                }
            }, attachement)
        } catch (error) {
            throw error
        }
    }

    @Post("/deed/attachment/remove")
    async removeDeedAttachment(
        @Body({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Body({
            destination: "link",
            schema: z.string()
        }) link: string,

    ) {
        try {
            const warranty = await this.repository.findById(id);

            if (warranty == null) {
                return {
                    status: 404
                }
            }


            if (warranty.attachments == undefined) {
                warranty.attachments = {}
            }

            let attachment = warranty.deed

            if (attachment) {
                warranty.deed = warranty.deed.filter((item: any) => item.url !== link)
            }


            return await this.editById(id, {
                $set: warranty
            }, warranty.deed)
        } catch (error) {
            throw error
        }
    }


    @Post("/home-office/attachment")
    async addHomeOfficeAttachment(
        @Body({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Body({
            destination: "attachement"
        }) attachement: any,

        @Files({
            config: {
                name: "attachement",
                maxCount: 5,
                types: ["jpg", "png", "webp", "jpeg"],
                dest: "src/uploads/waranty/",
                rename: true,

            },
            schema: z.any().optional(),
            destination: "attachement",
            isArray: true,
            mapToBody: true,
            isOptional: true,
            moveFilesToCDN: {
                name: "attachement",
                config: {
                    path: "loan/",
                },
            },
        }) files?: any,
    ) {
        try {

            let data: any = {}
            let homeOffices = []
            if (typeof attachement == "string") {
                if (attachement != "")
                    homeOffices.push({
                        url: attachement
                    })
            }
            else {
                for (let i = 0; i < attachement.length; i++) {
                    homeOffices.push({
                        url: attachement[i]
                    })
                }

            }




            return this.editById(id, {
                $push: {
                    homeOffice: {
                        $each: homeOffices
                    }
                }
            }, attachement)
        } catch (error) {
            throw error
        }
    }

    @Post("/home-office/attachment/remove")
    async removeHomeOfficeAttachment(
        @Body({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Body({
            destination: "link",
            schema: z.string()
        }) link: string,

    ) {
        try {
            const warranty = await this.repository.findById(id);

            if (warranty == null) {
                return {
                    status: 404
                }
            }


            if (warranty.attachments == undefined) {
                warranty.attachments = {}
            }

            let attachment = warranty.homeOffice

            if (attachment) {
                warranty.homeOffice = warranty.homeOffice.filter((item: any) => item.url !== link)
            }


            return await this.editById(id, {
                $set: warranty
            }, warranty.deed)
        } catch (error) {
            throw error
        }
    }

    @Post("/confirm/by-payment")
    async confirmAttchments(
        @Body({
            destination: "id",
            schema: BaseController.id
        }) id: string
    ): Promise<Response> {
        try {
            let waranties = await this.repository.findAll({
                paymentConfig: id
            })
            for (let i = 0; i < waranties.length; i++) {
                let warranty = waranties[i]
                if (warranty == null) {
                    return {
                        status: 404
                    }
                }
                let attachements = warranty.attachments || {}

                if (!warranty.isOwn) {
                    let array = ["birthCertificate", "nationalCard", "jobQualifications", "residenceInfo"]
                    for (let i = 0; i < array.length; i++) {
                        let files = attachements[array[i]]
                        if (files == undefined || files.length == 0) {
                            return {
                                status: 400,
                                message: "مدارک تکمیل نشده است"
                            }
                        }
                    }
                }
            }

            let config = await this.getWarrantyConfig(id)

            let s = config.personalCount
            for (let i = 0; i < waranties.length; i++) {
            
                if (waranties[i].type == "personal"
                    && waranties[i].info != undefined
                    && waranties[i].confirmed
                    && waranties[i].info.amount != undefined
                    && waranties[i].info.amount >= config.personal
                ) {
                    s -= 1
                }
            }
            if (s >= 1) {
                return {
                    status: 400,
                    message: `تعداد ضامنین شخصی کافی نمی‌باشد. تعداد مورد نیاز:${config.personalCount} عدد`
                }
            }

            if (config.deedEnable) {
                let haveDeed = false
                let allDeed = config.deed
                for (let i = 0; i < waranties.length; i++) {
                    if (waranties[i].type == "deed" && waranties[i].deed != undefined && waranties[i].confirmed && waranties[i].info?.deedamount != undefined) {
                        allDeed -= waranties[i].info?.deedamount
                        if (allDeed <= 0) {
                            haveDeed = true
                            break
                        }
                    }
                }
                if (!haveDeed) {

                    return {
                        status: 400,
                        message: "ضمانت ملکی درج نشده یا فایل مربوط ب ضمانت ضمیمه نشده است"
                    }
                }
            }

            await this.paymentRepo.confirmWarranty(id)

            return {
                status: 200,
                data: {}
            }
        } catch (error) {
            throw error
        }

    }

    @Delete("")
    async deleteWarranty(@Query({
        destination: "id",
        schema: BaseController.id
    }) id: string) {
        return this.delete(id)
    }

    @Get("/by-payment")
    async getWarrantiesByPayment(@Query({
        destination: "id",
        schema: BaseController.id
    }) id: string) {
        try {
            return await this.paginate(1, 100, {
                paymentConfig: id
            }, {
                population: [{
                    path: "warrantor.address"
                }, {
                    path: "warrantor.workAddrress"
                }]
            })
        } catch (error) {
            throw error
        }
    }

    @Post("/validate")
    async validate(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Query({
            destination: "type",
            schema: z.enum(["phone", "email"])
        }) inputType: string,
        @Query({
            destination: "input",
            schema: z.string()
        }) input: string,
        @Query({
            destination: "notExistsId",
            schema: BaseController.id.optional()
        }) notExistsId: string
    ) {
        try {
            let q: any = {
                paymentConfig: id,
            }

            if (inputType == "phone") {
                q["warrantor.phone"] = input
            }

            else {
                q["warrantor.email"] = input
            }

            if (notExistsId != undefined) {
                q["_id"] = {
                    $ne: notExistsId
                }
            }


            return this.checkExists(q)

        } catch (error) {
            throw error
        }
    }


    @Post("/price")
    async addPrice(
        @Body({
            schema : z.object({
                "id" : BaseController.id,
                "amount" : z.coerce.number().min(0).optional()
            })
        }) data : any
    ) : Promise<Response>{
        try {
            let warranty = await this.repository.findById(data.id)
            if(warranty == null){
                return {
                    status : 404,
                    message : "not found"
                }
            }


            return await this.editById(data.id, {
                $set: {
                    amount : data.amount
                }
            })
        } catch (error) {
            throw error
        }
    }

    @Post("/confirm")
    async confirmWarranty(
        @Body({
            schema: z.object({
                "isInMortgage": z.boolean().optional(),
                "id": BaseController.id
            }).optional()
        }) data: any
    ): Promise<Response> {
        try {
            let id = data.id
            let warranty = await this.repository.findById(id)
            if (warranty == null) {
                return {
                    status: 404,
                    message: "not found"
                }
            }
            let attachements = warranty.attachments || {}
            if (!warranty.isOwn) {
                let array = ["birthCertificate", "nationalCard", "jobQualifications", "residenceInfo"]
                for (let i = 0; i < array.length; i++) {
                    let files = attachements[array[i]]
                    if (files == undefined || files.length == 0) {
                        return {
                            status: 400,
                            message: "مدارک تکمیل نشده است"
                        }
                    }
                }
            }

            if (warranty.info == undefined) {
                return {
                    status: 400,
                    message: "مدارک تکمیل نشده است"
                }
            }



            let q: any = warranty.type == "deed" ? data : {}
            q["confirmed"] = true
            q["isReject"] = false


            return await this.editById(id, {
                $set: q
            })
        } catch (error) {
            throw error
        }
    }

    @Post("/reject")
    async rejectWarranty(
        @Body({
            schema: z.object({
                id: BaseController.id.optional(),
                rejectMessage: z.string()
            })
        }) data: any
    ): Promise<Response> {
        try {
            return {
                data: await this.repository.rejectWarranty(
                    data.id,
                    data.rejectMessage
                ),
                status: 200
            }
        } catch (error) {
            throw error
        }
    }

    @Post("/verify/phone/request")
    async requestVerifyPhone(
        @Body({
            destination : "id",
            schema : BaseController.id
        }) id: string
    ): Promise<Response>{
        try {
            let warrantor = await this.repository.findById(id)
            if(warrantor == null){
                return {
                    status : 404,
                    message : "not found"
                }
            }

            if(warrantor.warrantor.phoneVirified){
                return {
                    status : 400,
                    message : "این ضامن قبلا تایید شده است"
                }
            }

            let random = RandomGenarator.randomNumber()

            await SmsMessager.send({
                parameters : {
                    verificationCode : random
                },
                receptor : warrantor.warrantor.phone,
                template : "warrantorVerificationCode"
            })
            return this.editById(id , {
                $set :{
                    "warrantor.phoneCode" : random
                }
            } ,{

            })
        } catch (error) {
            throw error
        }
    }

    @Post("/verify/email/request")
    async requestVerifyEmail(
        @Body({
            destination : "id",
            schema : BaseController.id
        }) id: string
    ){
        try {
            let warrantor = await this.repository.findById(id)
            if(warrantor == null){
                return {
                    status : 404,
                    message : "not found"
                }
            }

            if(warrantor.warrantor.emailVirified){
                return {
                    status : 400,
                    message : "این ضامن قبلا تایید شده است"
                }
            }

            let random = RandomGenarator.randomNumber()

            await EmailMessager.send({
                parameters : {
                    verificationCode : random
                },
                receptor : warrantor.warrantor.email,
                template : "warrantorVerificationCode"
            })
            return this.editById(id , {
                $set :{
                    "warrantor.emailCode" : random
                }
            } ,{

            })
        } catch (error) {
            throw error
        }
    
    }

    @Post("/verify/phone")
    async verifyPhone(
        @Body({
            destination : "id",
            schema : BaseController.id
        })id : string,
        @Body({
            destination : "code",
            schema : BaseController.random
        }) code : number
    ): Promise<Response>{
        try {
            let warrantor = await this.repository.findById(id)
            if(warrantor == null){
                return {
                    status : 404,
                    message : "not found"
                }
            }

            if(warrantor.warrantor.phoneVirified){
                return {
                    status : 400,
                    message : "این ضامن قبلا تایید شده است"
                }
            }


            if(code != warrantor.warrantor.phoneCode){
                return {
                    status : 400,
                    message : "کد وارد شده اشتباه است"
                }
            }
            
            return this.editById(id , {
                $set :{
                    "warrantor.phoneVirified" : true
                }
            } ,{

            })
        } catch (error) {
            throw error
        }
    }

    @Post("/verify/email")
    async verifyEmail(
        @Body({
            destination : "id",
            schema : BaseController.id
        })id : string,
        @Body({
            destination : "code",
            schema : BaseController.random
        }) code : number
    ){
 try {
            let warrantor = await this.repository.findById(id)
            if(warrantor == null){
                return {
                    status : 404,
                    message : "not found"
                }
            }

            if(warrantor.warrantor.emailVirified){
                return {
                    status : 400,
                    message : "این ضامن قبلا تایید شده است"
                }
            }


            if(code != warrantor.warrantor.emailCode){
                return {
                    status : 400,
                    message : "کد وارد شده اشتباه است"
                }
            }
            
            return this.editById(id , {
                $set :{
                    "warrantor.emailVirified" : true
                }
            } ,{
                
            })
        } catch (error) {
            throw error
        }
    }

    async getWarrantyConfig(id: string) {
        try {
            let loan = await this.paymentRepo.findOne({
                _id: id,
                installmentConfig: {
                    $exists: true
                }
            })
            if (loan == null) {
                throw new Error("وام یافت نشد")
            }
            if (loan.installmentConfig?.loanTemplate) {
                let loanTemplate = await this.loanTemplateRepo.findById(loan.installmentConfig?.loanTemplate)

                if (loanTemplate == null) {
                    throw new Error("طرح وام یافت نشد")
                }
                let loanPeriod = undefined

                for (let i = 0; i < loanTemplate.periodes.length; i++) {
                    if (loanTemplate.periodes[i]._id.toHexString() == (loan.installmentConfig.loanPeriod as Types.ObjectId).toHexString()) {
                        loanPeriod = loanTemplate.periodes[i]
                        break
                    }
                }

                if (loanPeriod == undefined) {
                    throw new Error("دوره طرح وام مشخص نشده است")
                }

                let deed = Math.floor(loan.amount * (1 + (loanPeriod.warranty.deed.min / 100)))
                let deedEnable = loanPeriod.warranty.deed.enabled

                let personal = Math.floor(loan.amount * (1 + (loanPeriod.warranty.personal.min / 100)))
                let personalCount = loanPeriod.warranty.personal.guarantorsCount

                return {
                    deed,
                    deedEnable,
                    personal,
                    personalCount
                }


            }

            else {
                let loanSetting = await this.loanSettingRepo.findOne({
                    from: {
                        $lte: loan.amount
                    },
                    to: {
                        $gte: loan.amount
                    }
                })
                if (loanSetting == null) {
                    throw new Error("تنظیمات وام یافت نشد")
                }

                let deed = Math.floor(loan.amount * (1 + (loanSetting.deed.min / 100)))
                let deedEnable = loanSetting.deed.enabled

                let personal = Math.floor(loan.amount * (1 + (loanSetting.personal.min / 100)))
                let personalCount = loanSetting.personal.guarantorsCount

                return {
                    deed,
                    deedEnable,
                    personal,
                    personalCount
                }

            }
        } catch (error) {
            throw error
        }
    }

    async searchHelper(queryParam?: any): Promise<any> {

        let q = await super.searchHelper(queryParam)
        if (q["type"] == undefined) {
            q["type"] = {
                "$exists": true
            }
        }

        return q
    }

    public async search(page: number, limit: number, reqQuery: any, admin?: any, ...params: [...any]) {
        var query = await this.searchHelper(reqQuery)
        // console.log("fuck" , query)
        if (reqQuery["_id$ne"]) {
            query["_id"] = {
                $ne: reqQuery["_id$ne"]
            }
        }

        if (this.collectionName != undefined || this.isAdminPaginate) {
            return this.adminPaginate(page, limit, admin as AdminInfo, query, {
                sort: this.getSort(reqQuery),
                population: this.population
            })
        }
        return await this.paginate(page, limit, query, {
            sort: this.getSort(reqQuery),
            population: this.population
        })
    }

    initApis(): void {
        this.addRouteWithMeta("/search", "get", this.search.bind(this), Object.assign(BaseController.searcheMeta, { absolute: false }))
    }
}


const warranty = new WarrantyController("/warranty", new WarrantyRepository(),
    new PaymentConfigRepository(),
    {
        // insertSchema : z.object({
        //     type : z.enum(["deed" , "personal"]),
        //     attachement : z.array(z.string()),
        //     paymentConfig : BaseController.id.optional(),
        //     personalType : z.enum(["check" , "promissory"]).optional(),
        //     info : z.any()
        // }).omit({
        //     "attachement": true
        // }),
        // paginationConfig : {
        //     fields : {
        //         personalType : {
        //             en_title : "personalType", 
        //             fa_title : "",
        //             isOptional : true,
        //             sortOrderKey : true,
        //             type : "string",
        //             translator : {
        //                 "check" : "",
        //                 "promissory" : ""
        //             }
        //         },
        //         type : {
        //             en_title : "",
        //             fa_title : "",
        //             isOptional : true,
        //             sortOrderKey : true,
        //             type : "string",
        //             translator : {
        //                 "deed" : "",
        //                 "personal" : ""
        //             },
        //         },
        //         "info.number" :{
        //             en_title : "info.number" 
        //         },

        //     },
        //     paginationUrl : "",
        //     searchUrl : "",
        //     serverType : "",
        //     tableLabel : "warranty",

        // }
        searchFilters: {
            paymentConfig: ["eq", "list"],
            personalType: ["eq", "list"],
            type: ["eq", "list"]
        }

    })


export default warranty