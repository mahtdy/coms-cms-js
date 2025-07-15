import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import PublishQueue, { PublishQueueModel } from "./model";



export default class PublishQueueRepository extends BaseRepositoryService<PublishQueue>{
    constructor(options ?: RepositoryConfigOptions){
        super(PublishQueueModel,options)
    }


    async deleteCategoryFromList(category : string , language : string ,type: string) {
        // await this.
        await this.updateMany({
            language ,
            type,
            categories : category
        }, {
            $pull:{ 
                categories : category
            }
        })
        let toPublishArticles = await this.findAll({
            $where: "this.categories.length == 0"
        }) 
    }
}