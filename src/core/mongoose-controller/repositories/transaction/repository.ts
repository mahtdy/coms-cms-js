import { ClientSession } from "mongoose";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import Invoice from "../invoice/model";
import InvoiceRepository from "../invoice/repository";
import Transaction, { TransactionModel } from "./model";
import { ChangeCheckPlaceData, EditCashData, EditCheckData, EditPOSData, EditTransferData } from "../../financeController";


export default class TransactionRepository extends BaseRepositoryService<Transaction> {

    constructor(options?: RepositoryConfigOptions) {
        super(TransactionModel, options)

    }


    async confirmTransaction(id: string) {
        try {
            // await this.findById(id)
            let transaction = await this.findByIdAndUpdate(id, {
                status: "success",
                paidAt: new Date(),
                ispaid: true
            })

        } catch (error) {
            throw error
        }
    }

    async rejectTransaction(id: string) {
        try {
            // let transaction = await this.findById(id)
            let transaction = await this.findByIdAndUpdate(id, {
                $set: {
                    status: "rejected",
                }
            })

        } catch (error) {
            throw error
        }
    }

    async rejectPaymentAllTransaction(
        paymentConfigId : string,
        session : ClientSession
    ){
        try {
            await this.updateMany({
                // status: "waiting"
                paymentConfig: paymentConfigId,
            }, {
                $set: {
                    status: "rejected",
                }
            })
        } catch (error) {
            throw error
        }
    }


    async cancelTransaction(id:  string){
        try {
            // let transaction = await this.findById(id)
            let transaction = await this.findByIdAndUpdate(id, {
                $set: {
                    status: "canceled",
                }
            })

        } catch (error) {
            throw error
        }
    }


    /////////////////////////// check //////////////////////////
    async acceptCheck(id: string, session: ClientSession) {
        try {
            return await this.findByIdAndUpdate(id, {
                $set: {
                    status: "confirmed",
                }
            }, {
                // session ,
                runValidators: true
            })
            // let transaction = await this.findById(id)
        } catch (error) {
            throw error
        }
    }

    async rejectCheck(id: string, session: ClientSession) {
        try {
            return await this.findByIdAndUpdate(id, {
                $set: {
                    status: "rejected",
                }
            }, {
                // session ,
                runValidators: true
            })
            // let transaction = await this.findById(id)
        } catch (error) {
            throw error
        }
    }

    async editCheck(id: string, data: EditCheckData, session: ClientSession) {
        try {
            // let transaction = await this.findById(id)
            let transaction = await this.findByIdAndUpdate(id, {
                $set: {
                    amount: data.amount,
                    deadline: data.deadline,
                    "info.number": data.number,
                    "info.saiadNumber": data.saiadNumber,
                    "info.bank": data.bank,
                    "info.branch": data.branch,
                }
            }, {
                runValidators: true,
                // session,

            })
        } catch (error) {
            throw error
        }
    }


    async updateInstallment(id: string, data: EditCheckData, session: ClientSession) {
        try {
            // let transaction = await this.findById(id)
            let transaction = await this.findByIdAndUpdate(id, {
                $set: {
                    "info.number": data.number,
                    "info.saiadNumber": data.saiadNumber,
                    "info.bank": data.bank,
                    "info.branch": data.branch,
                }
            }, {
                runValidators: true,
                // session,

            })
        } catch (error) {
            throw error
        }
    }

    async changeCheckPlace(id : string ,data : ChangeCheckPlaceData , session : ClientSession) {
        try {
            let q : any = {
                $set : {
                    placeType : data.placeType
                }
            }
            if (data.placeType == "in-bank"){
                q["$set"]["bankInfo"] = data.bankInfo
                q["$set"]["bankAccount"]= data.bankInfo?.account
                q["$unset"] = {
                    spendInfo : 1,
                    chest : 1,
                    dein : 1
                }
            }
            else if(data.placeType == "spend"){
                q["$set"]["spendInfo"] = data.spendInfo
                q["$unset"] = {
                    bankInfo : 1,
                    bankAccount : 1,
                    chest : 1,
                    dein : 1
                }
            }
            
            else if(data.placeType == "in-chest"){
                q["$set"]["chest"] = data.chestId
                q["$unset"] = {
                    bankInfo : 1,
                    bankAccount : 1,
                    spendInfo : 1,
                    dein : 1
                }
            }

            else if(data.placeType == "dein"){
                q["$set"]["dein"] = data.dein
                q["$set"]["bankAccount"]= data.dein?.account
                q["$unset"] = {
                    bankInfo : 1,
                    spendInfo : 1,
                    chest : 1
                }
            } 
            await this.findByIdAndUpdate(id,q)
        } catch (error) {
            throw error
        }
    }


    async checkPassed(id : string){
        try {
            await this.updateOne({
                _id : id
            } , {
                $set : {
                    status : "success",
                    paidAt : new Date(),
                    ispaid: true
                }
            })
        } catch (error) {
            throw error
        }
    }

    //////////////////////////  check //////////////////////////    


    ///////////////////////// cash //////////////////////////



    async acceptCash(id: string,
        type: string,
        idd: string ,
        session : ClientSession
    ) {
        try {
            let query : any = {
                status: "success",
                paidAt: new Date(),
                ispaid: true,
            }
            
            if(type == "bank"){
                query["bankAccount"] = idd
            }
            else{
                query["chest"] = idd
            }

            await this.findByIdAndUpdate(id, {
                $set: query
            })

        } catch (error) {
            throw error
        }
    }

    async rejectCash(id: string) {
        try {
            // let transaction = await this.findById(id)
            let transaction = await this.findByIdAndUpdate(id, {
                $set: {
                    status: "rejected",
                }
            })

        } catch (error) {
            throw error
        }
    }

    async editCash(id: string, data: EditCashData, session: ClientSession) {
        try {
            // let transaction = await this.findById(id)
            let transaction = await this.findByIdAndUpdate(id, {
                $set: {
                    amount: data.amount,
                    deadline: data.deadline,
                }
            }, {
                runValidators: true,
                // session,
            })
        } catch (error) {
            throw error
        }
    }
    ///////////////////////// cash //////////////////////////


    /////////////////////////  pos //////////////////////////
    async acceptPOS(id: string ,session : ClientSession) {
        try {
            // let transaction = await this.findById(id)
            let transaction = await this.findByIdAndUpdate(id, {
                $set: {
                    status: "success",
                    paidAt: new Date(),
                    ispaid: true
                }
            })

        } catch (error) {
            throw error
        }
    }

    async rejectPOS(id: string) {
        try {
            // let transaction = await this.findById(id)
            let transaction = await this.findByIdAndUpdate(id, {
                $set: {
                    status: "rejected",
                }
            })

        } catch (error) {
            throw error
        }
    }

    async editPOS(id: string, data: EditPOSData, session: ClientSession) {
        try {
            let transaction = await this.findByIdAndUpdate(id, {
                $set: {
                    amount: data.amount,
                    deadline: data.deadline,
                    "info.pos": data.pos,
                    "info.account": data.bank
                }
            }, {
                runValidators: true,
                // session,
            })
        } catch (error) {
            throw error
        }
    }
    /////////////////////////  pos //////////////////////////


    /////////////////////////  transfer //////////////////////////
    async acceptTransfer(id: string ,session :ClientSession) {
        try {
            // let transaction = await this.findById(id)
            let transaction = await this.findByIdAndUpdate(id, {
                $set: {
                    status: "success",
                    paidAt: new Date(),
                    ispaid: true
                }
            })

        } catch (error) {
            throw error
        }
    }

    async rejectTransfer(id: string) {
        try {
            // let transaction = await this.findById(id)
            let transaction = await this.findByIdAndUpdate(id, {
                $set: {
                    status: "rejected",
                }
            })

        } catch (error) {
            throw error
        }
    }

    async editTransfer(id: string , data : EditTransferData , session : ClientSession) {
    
        try {
            let transaction = await this.findByIdAndUpdate(id, {
                $set: {
                    amount: data.amount,
                    deadline: data.deadline,
                    "info.destination": data.destination,
                    "info.source": data.source,
                    "info.code": data.code
                }
            }, {
                runValidators: true,
                // session,
            })
        } catch (error) {
            throw error
        }
    }
    /////////////////////////  transfer //////////////////////////


}