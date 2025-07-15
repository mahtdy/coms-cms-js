
import { Model } from "mongoose";
import Redirect, { RedirectModel } from "./model";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";


export default class RedirectRepository extends BaseRepositoryService<Redirect> {
    constructor(options? : RepositoryConfigOptions) {
        super(RedirectModel, options)
    }  

    async insertMany(documents: Redirect[]): Promise<Redirect[]> {
        try {
            var query = []
            for (let i = 0; i < documents.length; i++) {
                query.push({
                    from : documents[i].from,
                    to : documents[i].to
                })
            }
            var docs = await this.findAll({
                $or :query
            },{} ,[])
            var repetitive: any ={}
            for (let i = 0; i < docs.length; i++) {
                repetitive[docs[i].from +"*" + docs[i].to] = true
            }
            documents = documents.filter((doc : Redirect, i)=>{
                if( repetitive[doc.from +"*" + doc.to] ){
                    return false
                
                }
                return true
            })
        } catch (error) {
            throw error
        }
        return super.insertMany(documents)
    }


    async getRedirectBySource(source : string , sourceId?: string) {
        return this.findOne(
            {
                $or: [
                    {
                    from : source,
                    fromStatic : true
                    }, 
                    {
                        from : sourceId,
                        fromStatic:false
                    }],
                status: true
            }
        )
    }
}      
