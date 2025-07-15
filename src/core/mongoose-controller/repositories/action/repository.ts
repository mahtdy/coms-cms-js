import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import Action, { ActionModel } from "./model";



export default class ActionRepository extends BaseRepositoryService<Action>{
    constructor(options ?: RepositoryConfigOptions){
        super(ActionModel,options)
    }

    async getSorted(){
        return this.collection.aggregate([
            {
                $group:{
                    _id : "$partName",
                    persianName : {
                        $first : "$partPersion"
                    },
                    sub : {
                        $addToSet : {
                            subPartName : "$subPartName",
                            subPartPersion : "$subPartPersion"
                        }
                    }
                }
            }
        ]).exec()
        // var parts= await this.distinct("partName")
        // for (let i = 0; i < parts.length; i++) {
        //     var subParts 
            
        // }
    }
}