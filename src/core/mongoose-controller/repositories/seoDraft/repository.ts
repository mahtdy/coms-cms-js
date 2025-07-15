import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import SeoDraft, { SeoDraftModel } from "./model";



export default class SeoDraftRepository extends BaseRepositoryService<SeoDraft>{
    constructor(options?: RepositoryConfigOptions) {
        super(SeoDraftModel)
    }


    async upsert(doc: any) {
        try {
            var query: any = {
                id: doc.id,
                type: doc.type,
                language: doc.language
            }
            if (doc.type == "category") {
                query['categoryLable'] = doc.categoryLable
            }

            const current = await this.findOne(query)
            if (current != null)
                await this.replace({
                    _id: current._id
                }, doc
                )
            else
                await this.insert(doc ,{
                    validateBeforeSave : false
            })
        } catch (error) {
            throw error
        }
    }
}