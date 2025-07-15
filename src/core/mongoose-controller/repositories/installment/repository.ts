import { ClientSession, Types } from "mongoose";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import Installment, { InstallmentModel } from "./model";
import PaymentConfigRepository from "../paymentConfig/repository";
import TransactionRepository from "../transaction/repository";

export default class InstallmentRepository extends BaseRepositoryService<Installment> {
    
    constructor(
        options?: RepositoryConfigOptions) {
        super(InstallmentModel, options)
     
    }

    // async installmentPaid(id: string | Types.ObjectId, transactionAmount: number , transactionId : string | Types.ObjectId) {
    //     try {

    //         let installment = await this.findById(id)

    //         if (installment != null) {
    //             let additionalPrice = 0
    //             let paidPrice = 0
    //             let remainedPrice = installment.finalPrice - installment.paidPrice
    //             let fullPaid = false
    //             if (transactionAmount >= remainedPrice) {
    //                 let penalty = installment.penalty
    //                 let query: any = {
    //                     $set: {
    //                         paidPrice: installment.finalPrice,
    //                         paid: true,
    //                         paidAt: new Date()
    //                     }
    //                 }
    //                 if (penalty + remainedPrice <= transactionAmount) {

    //                     query["$set"]["penalty"] = 0
    //                     query["$set"]["penaltypaid"] = true
    //                     additionalPrice = transactionAmount - (penalty + remainedPrice)

    //                 }
    //                 else {
    //                     query["$set"]["penalty"] = penalty + remainedPrice - transactionAmount
    //                 }
    //                 query["$push"] = { "transactions": transactionId }
    //                 await this.updateOne({
    //                     _id: id
    //                 }, query)
    //                 fullPaid = true
    //             }

    //             else {
    //                 let query: any = {
    //                     $set: {
    //                         paidPrice: installment.paidPrice + transactionAmount,

    //                     },
    //                     $push: {
    //                         "transactions": transactionId
    //                     }
    //                 }
    //                 await this.updateOne({
    //                     _id: id
    //                 }, query)
    //             }

    //             await this.paymentConfigRepo.installmentPaid(installment.paymentConfig as any, transactionAmount, fullPaid )
    //             return {
    //                 additionalPrice,

    //             }
    //         }
    //     } catch (error) {   
    //         throw error
    //     }
    // }

    async installmentPaid(
        payed? : number,

    ){

    }

    async canclePaymentInstallments(paymentId: string | Types.ObjectId) {
        try {
            let paymentConfig = await this.paymentConfigRepo.findOne({
                _id: paymentId
            })
            if (paymentConfig != null) {
                let installments = await this.findAll({
                    paymentConfig: paymentConfig._id,
                    iscanceled: false,
                    paid: false
                })
                for (let i = 0; i < installments.length; i++) {

                    await this.updateOne({
                        _id: installments[i]._id
                    }, {
                        $set: {
                            iscanceled: true
                        }
                    })

                    await this.transactionRepo.updateMany({
                        installmentId: installments[i]._id,
                        status: {
                            $nin: ["success", "failed", "confirmed"]
                        }
                    }, {
                        $set: {
                            status: "canceled"
                        }
                    })
                }

                await this.paymentConfigRepo.updateOne({
                    _id: paymentConfig._id
                }, {
                    $set: {
                        status: "ended"
                    }
                })



            }

        } catch (error) {
            throw error
        }
    }

    async confirmInstallments(id :string){
        try {
            await this.updateMany({
                paymentConfig : id
            } , {
                $set : {
                    status : "duringPayment"
                }
            })
        } catch (error) {
            throw error
        }
    }
    async confirmInstallment(installmentId: string, session: ClientSession) {
        try {
            return await this.updateOne({
                _id: installmentId
            }, {
                $set: {
                    status: "confirmed"
                }
            })
        } catch (error) {
            throw error
        }
    }

    async rejectInstallments(paymentConfigId: string, session: ClientSession) {
        try {
            await this.updateMany({
                paymentConfig: paymentConfigId,

            }, {
                $set: {
                    status: "rejected"
                }
            })
        } catch (error) {
            throw error
        }
    }


    async rejectInstallment(installmentId: string, rejectMessage: string, session: ClientSession) {
        try {
            return await this.updateOne({
                _id: installmentId
            }, {
                $set: {
                    status: "rejected",
                    rejectMessage
                }
            })
        } catch (error) {
            throw error
        }
    }

    async installmentUpdated(id: string) {
        try {
            await this.updateOne({
                _id: id
            }, {
                $set: {
                    isUpdated: true,
                    updateAt: new Date()
                }
            })
        } catch (error) {
            throw error
        }
    }



    async chageInstallment(
        id: string,
        transactionId: string,
        payment : string
    ) {
        try {
            await this.updateOne({
                _id: id
            }, {
                $set: {
                    status: "waitingForCancle",
                    changed : true,
                    payment
                },
                $push: {
                    transactions: {
                        $each: [transactionId],
                        $position: 0
                    }
                }
            })
        } catch (error) {
            throw error
        }
    }

    async addInstallmentPayment(id : string , payment :string){
        try {
            await this.updateOne({
                _id : id
            } , {
                payment 
            })
        } catch (error) {
            throw error
        }
    }


    // async installmentPaid(id : string ,withPenalty ?: boolean ){
    //     try {
    //         let installment = await this.findById(id)

    //         if(installment != null){
    //             if(installment.status == "paid"){
    //                 return
    //             }
    //             let status = "paid"

    //             if(installment.penalty > 0){
    //                 // status = ""
    //                 if(withPenalty == true){

    //                 }
    //             }
    //         }
            
    //     } catch (error) {
    //         throw error
    //     }
    // }

    async forgetPenalty(
        id : string
    ){
        try {
            let q : any ={
                penaltyForget : true,
                penalty : 0
            }
            let installment = await this.findById(id)
            if(installment == null){
                return
            }

            if(installment?.status == "paidWithoutPenalty"){
                q["status"] = "paidWithDelay"
            }
            await this.updateOne({
                _id : id
            }, {
                $set : q
            })

            
            
        } catch (error) {
            throw error
        }
    }

    async penaltyPaid(id : string){
        
    }

}