
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository"
import Chest, { ChestModel } from "./model";

export default class ChestRepository extends BaseRepositoryService<Chest>{
    constructor(options ?: RepositoryConfigOptions){
        super(ChestModel, options)
    }

    addMoney(id : string, amount : number){
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