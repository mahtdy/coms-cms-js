import { ClientSession } from "mongoose";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import BankAccount, { BankAccountModel } from "./model";



export default class BankAccountRepository extends BaseRepositoryService<BankAccount> {
    constructor(options?: RepositoryConfigOptions) {
        super(BankAccountModel, options)
    }

    addMoney(id : string, amount : number , session : ClientSession){
        return this.findByIdAndUpdate(id, {
            $inc : {
                inventory : amount
            },
            $set : {
                canDelete : false
            }
        }, {
            new : true
        })
    }
}