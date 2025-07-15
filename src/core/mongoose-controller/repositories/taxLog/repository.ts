import { ClientSession } from "mongoose";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository"
import TaxLog, { TaxLogModel } from "./model";
import { Session } from "inspector";

export default class TaxLogRepository extends BaseRepositoryService<TaxLog>{
    constructor(options?: RepositoryConfigOptions) {
        super(TaxLogModel, options)
    }

    async increaseTax(invoice: string, taxAmount: number ,session : ClientSession) {

        let isExist = await this.isExists({
            invoice,
            type: "increase",

        })
        if(isExist) {
            return     
        }
        let log = await this.insert({
            invoice,
            amount : taxAmount,
            type: "increase",
            date: new Date()
        } as TaxLog)
        return
    }

    async decreaseTax(invoice: string, taxAmount: number , ClientSession: Session) {
        let isExist = await this.isExists({
            invoice,
            type: "decrease"
        })
        if(isExist) {
            return     
        }
        let log = await this.insert({
            invoice,
            type: "decrease",
            amount : taxAmount,
            date: new Date()
        } as TaxLog)
        return
    }
}