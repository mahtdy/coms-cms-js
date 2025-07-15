import { Admin, Body, Query } from "../../decorators/parameters";
import { Delete, Get, Post } from "../../decorators/method";
import BaseController, { ControllerOptions } from "../controller";
import Invoice from "../repositories/invoice/model";
import InvoiceRepository from "../repositories/invoice/repository";
import { Response } from "../../controller";
import { z } from "zod"
import PaymentConfig from "../repositories/paymentConfig/model";
import PaymentConfigRepository, { Schedule } from "../repositories/paymentConfig/repository";
import mongoose, { Types } from "mongoose";
import TransactionRepository from "../repositories/transaction/repository";
import { AdminInfo } from "../auth/admin/admin-logIn";

export const checkConfig = z.object({
    interestRate : z.coerce.number().min(0).max(100).optional(),
    havePenalty: z.boolean().optional(),

    number: z.string(),
    saiadNumber: z.string(),
    bank: z.string(),
    branch: z.string(),
})

export const transferSchema = z.object({
    source: z.string(),
    destination: z.string(),
    code: z.string()
})
const paymentConfig = z.object({
    invoice: BaseController.id,
    type: z.enum(["multi-stage", "installment", "simple"]),
    installmentConfig: z.object({
        prePay: z.coerce.number().int().min(0).optional(),
        prePayDeadline: z.coerce.date().optional(),
        prePayCheck: checkConfig.optional(),
        formula: z.enum(["banking", "market"]).optional(),
        count: z.coerce.number().int().min(1).optional(),
        period: z.union([
            z.literal(10),
            z.literal(15),
            z.literal(20),
            z.literal(30),
            z.literal(45),
            z.literal(60),
            z.literal(90),
            z.literal(120),
            z.literal(150),
            z.literal(180),
        ]),
        interestRate: z.coerce.number().int().min(0).max(100).optional(),
        payType: z.enum(["check", "payGateWay", "other"]).optional(),
        checks: z.array(checkConfig).optional(),
        notes: z.array(z.array(z.string())),
        payStart: z.coerce.date(),
        havePenalty: z.boolean().optional(),
    }
    ).optional(),
    amount: z.coerce.number().int().min(0),
    info: z.union([z.object({
        account: BaseController.id,
        pos : BaseController.id
    }), checkConfig, transferSchema
    ]).optional(),

    deadline: z.coerce.date().optional(),
    payType: z.enum(["payGateWay", "cash", "pos", "transfer", "check"]).optional(),
})

export class InvoiceController extends BaseController<Invoice> {
    paymentConfigRepo: PaymentConfigRepository
    transactionRepo: TransactionRepository

    constructor(baseRoute: string, repo: InvoiceRepository<Invoice>, options?: ControllerOptions) {
        super(baseRoute, repo, options)
        this.paymentConfigRepo = new PaymentConfigRepository()
        this.transactionRepo = new TransactionRepository(repo)
        
    }



  

   
    @Get("")
    async findById(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string
    ): Promise<Response> {
        try {
            const invoice = await this.repository.findOne({
                _id: id
            }, {

            }, [
                {
                    path: "owner",
                    select: ["name", "family"]
                },
            ])
            if (invoice == null) {
                return {
                    status: 404,
                }
            }
            let paymentConfigs = await this.paymentConfigRepo.findAll({
                invoice: id,
                // status:{
                    
                // } "inproccess"
            }, {}, [{
                path: "transaction",
            }])
            // let installments = []
            // if (paymentConfig != undefined) {
            //     installments = await this.installmentRepo.findAll({
            //         paymentConfig: paymentConfig._id
            //     },
            //         {},
            //         [{
            //             path: "owner",
            //             select: ["name", "family"]
            //         }, {
            //             path: "transactions",
            //             select: ["type", "payType", "number", "amount", "status", "ispaid", "info"]
            //         }, {
            //             path: "notes.admin",
            //             select: ["name", "familyName", "phoneNumber", "email", "profile"]
            //         }],
            //     )

            //     return {
            //         data: {
            //             invoice,
            //             paymentConfig,
            //             installments
            //         }
            //     }

            // }

            return {
                data: {
                    invoice,
                    paymentConfigs
                }
            }
        } catch (error) {
            throw error
        }
    }

  

}


