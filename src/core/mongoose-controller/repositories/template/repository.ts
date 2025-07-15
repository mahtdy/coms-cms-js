import { FilterQuery, Types, UpdateQuery } from "mongoose";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import Template, { TemplateModel } from "./model";



export default class TemplateRepository extends BaseRepositoryService<Template> {
    constructor( options? : RepositoryConfigOptions){
        super(TemplateModel , options)
    }

    async insert(document: Template, options?: any): Promise<any> {
        try {
            const doc = await super.insert(document)
            if(doc.isDefault){
                await this.updateMany({
                    isDefault : true,
                    _id : {
                        $ne : doc._id
                    }
                }, {
                    $set : {
                        isDefault : false
                    }
                })
            }
            return doc
        } catch (error) {
            throw error
        }
    }

    async findByIdAndUpdate(id: string | Types.ObjectId, query: UpdateQuery<Template>): Promise<Template | null> {
        try {
            const res =await super.findByIdAndUpdate(id,query)
            const curentDoc = await this.findById(id)
            if(curentDoc?.isDefault){
                await this.updateMany({
                    isDefault : true,
                    _id : {
                        $ne : curentDoc._id
                    }
                }, {
                    $set : {
                        isDefault : false
                    }
                })
            }
            return res
        } catch (error) {
            throw error
        }

    }

    async findOneAndUpdate(query: FilterQuery<Template>, queryData: UpdateQuery<Template>): Promise<Template | null> {
        try {
            let res= await super.findOneAndUpdate(query,queryData)
            const curentDoc = await this.findById(res?._id)
            if(curentDoc?.isDefault){
                await this.updateMany({
                    isDefault : true,
                    _id : {
                        $ne : curentDoc._id
                    }
                }, {
                    $set : {
                        isDefault : false
                    }
                })
            }
            return res
        } catch (error) {
            throw error
        }
    }
}