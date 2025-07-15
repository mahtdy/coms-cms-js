import { Body } from "../../decorators/parameters";
import { Response } from "../../controller";
import { Get, Post } from "../../decorators/method";
import BaseController, { ControllerOptions } from "../controller";
import Transaction from "../repositories/transaction/model";
import TransactionRepository from "../repositories/transaction/repository";
import { z } from "zod"
import InvoiceRepository from "../repositories/invoice/repository";
import Invoice from "../repositories/invoice/model";


export default class TransactionController extends BaseController<Transaction> {
    invoiceRepo: InvoiceRepository<Invoice>
    constructor(baseRoute: string, repo: TransactionRepository, invoiceRepo: InvoiceRepository<Invoice>, options?: ControllerOptions) {
        super(baseRoute, repo, options)
        this.invoiceRepo = invoiceRepo
    }


    @Post("/confirm")
    async confirmTransaction(
        @Body({
            schema: z.object({ id: BaseController.id })
        }) data: { id: string }
    ): Promise<Response> {
        try {
            let transaction = await this.repository.findById(data.id)
            if (transaction == null) {
                return {
                    status: 404
                }
            }
            if (transaction.status == "success" || transaction.status == "confirmed") {
                return {
                    status: 400,
                    message: "این تراکنش قبلا تایید شده است"
                }
            }
            if (transaction.status == "failed" || transaction.status == "canceled" || transaction.status == "rejected") {
                return {
                    status: 400,
                    message: "این تراکنش قبلا رد شده است"
                }
            }
            await this.repository.confirmTransaction(data.id)
            if (transaction?.invoice != undefined) {
                await this.invoiceRepo.transactionPaid(transaction.invoice, transaction)
            }
            return {
                status: 200
            }
        } catch (error) {
            throw error
        }
    }

    @Post("/reject")
    async rejectTransaction(
        @Body({
            schema: z.object({ id: BaseController.id })
        }) data: { id: string }
    ): Promise<Response> {
        try {
            let transaction = await this.repository.findById(data.id)
            if (transaction == null) {
                return {
                    status: 404
                }
            }
            if (transaction.status == "success" || transaction.status == "confirmed") {
                return {
                    status: 400,
                    message: "این تراکنش قبلا تایید شده است"
                }
            }
            if (transaction.status == "failed" || transaction.status == "canceled" || transaction.status == "rejected") {
                return {
                    status: 400,
                    message: "این تراکنش قبلا رد شده است"
                }
            }
            await this.repository.rejectTransaction(data.id)



            return {
                status: 200
            }
        } catch (error) {
            throw error
        }
    }

    @Post("/check/accept")
    async acceptCheck(
        @Body({
            schema: BaseController.id.optional(),
            destination: "id"
        }) id: string
    ): Promise<Response> {
        try {
            let transaction = await this.repository.findOne({
                _id: id
            }, {}, [{
                path: "owner"
            }])

            if (transaction == null) {
                return {
                    status: 404,
                    message: "این تراکنش وجود ندارد"
                }
            }
            if (transaction.status == "rejected") {
                return {
                    status: 400,
                    message: "این تراکنش قبلا رد شده است"
                }
            }
            if (transaction.status == "canceled") {
                return {
                    status: 400,
                    message: "این تراکنش قبلا لغو شده است"
                }
            }
            if (transaction.status == "confirmed") {
                return {
                    status: 400,
                    message: "این تراکنش قبلا تایید شده است"
                }
            }
            if (transaction.status == "success") {
                return {
                    status: 400,
                    message: "این تراکنش قبلا تایید شده است"
                }
            }

            await this.doAcceptCheck(id)

            await this.notifyCheckAccept(id)

            return {
                status: 200
            }
        } catch (error) {
            throw error
        }
    }


    @Post("/check/change")
    async changeCheck(
        @Body({
            schema: BaseController.id.optional(),
            destination: "id"
        }) id: string
    ): Promise<Response> {
        return {

        }
    }

    @Post("/check/change/confirm")
    async changeCheckConfirm(

    ) {

    }



    @Post("/check/accept/many")
    async acceptManyCheck(
        @Body({
            schema: z.array(BaseController.id),
            destination: "ids"
        }) ids: string[]
    ): Promise<Response> {
        try {
            let isExists = await this.repository.isExists({
                id: {
                    $in: ids
                },
                $or: [
                    {
                        status: {
                            $ne: "waiting"
                        }
                    },
                    {
                        payType: {
                            $ne: "check"
                        }
                    }

                ]
            })
            if (isExists) {
                return {
                    status: 400,
                    message: "تعدادی از تراکنش  قابل تایید نیستند"
                }
            }

            let count = await this.repository.getcount({
                _id:
                {
                    $in: ids
                },
            })
            if (count != ids.length) {
                return {
                    status: 400,
                    message: "تعدادی از تراکنش  قابل تایید نیستند"
                }
            }
            for (let i = 0; i < ids.length; i++) {
                await this.doAcceptCheck(ids[i])
            }
            await this.notifyChecksAccept(ids)
            // await this.notifyCheckAccept(id)

            return {
                status: 200,
                data: {}
            }
        } catch (error) {
            throw error
        }
    }



    @Post("/check/reject")
    async rejectCheck(
        @Body({
            schema: BaseController.id.optional(),
            destination: "id"
        }) id: string
    ): Promise<Response> {
        return {

        }
    }


    @Get("/myfinanc1/api/docs", {
        absolute: true,
        loginRequired: false
    })
    async confirmPayPort(): Promise<Response> {
        try {

        } catch (error) {

        }
        return {
            status: 200
        }
    }


    async doAcceptCheck(id: string) {
        try {
            let check = await this.repository.acceptCheck(id)

            if (check?.invoice) {
                let invoice = await this.invoiceRepo.findByIdAndUpdate(check.invoice, {
                    $inc: {
                        unrefinedPrice: check.amount,
                        waitForConfirmPrice: -check.amount
                    }
                })

            }

            await this.notifyCheckAccept(id)
        } catch (error) {
            throw error
        }
    }

    async notifyCheckAccept(id: string) {
        try {
            // await this.repository.notifyAcceptCheck(id)

        } catch (error) {
            throw error
        }
    }

    async notifyChecksAccept(ids: string[]) {
        try {
            // await this.repository.notifyAcceptCheck(id)
        } catch (error) {
            throw error
        }
    }
    



    initApis(): void {
        super.initApis()
        this.addRouteWithMeta("es/search", "get", this.search.bind(this), BaseController.searcheMeta)
        this.addRoute("es/search/list", "get", this.getSearchList.bind(this))
    }
}
