
import { Model } from "mongoose";
import LinkTag, { LinkTagModel } from "./model";
import RandomGenarator from "../../../random"
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";


export default class LinkTagRepository extends BaseRepositoryService<LinkTag> {
    constructor(options? : RepositoryConfigOptions) {
        super(LinkTagModel,options)
    }
    async insert(document: LinkTag): Promise<LinkTag> {
        // await
        document.tag = await this.getValidTag()
        return super.insert(document)
    }

    async getValidTag(): Promise<string> {
        try {
            var tag ="/tag_"+ RandomGenarator.getUniqueId()
            var isExists = await this.isExists({
                tag
            })
            if (isExists) {
               return await this.getValidTag()
            }
            return tag
        } catch (error) {
            throw error
        }
    }

    async getLinkByTag(tag : string){
        try {
            return this.findOne({
                tag
            })
        } catch (error) {
            throw error
        }
    }

    async getLinksByTags(tags: string[]){
        try {
            return this.findAll({
                tag : {
                    $in : tags
                }
            })
        } catch (error) {
            throw error
        }
    }

    async changeTagLink(tag : string, link : string){
        try {
            return await this.findOneAndUpdate({
                 tag
            },{
                $set : {
                    link
                }
            })
        } catch (error) {
            throw error
        }
    }

}      
