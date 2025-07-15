import { z } from "zod";
import BaseController, { ControllerOptions } from "../controller";
import DomainImageConfig from "../repositories/domainImageConfig/model";
import DomainImageConfigRepository from "../repositories/domainImageConfig/repository";
import { Delete, Get, Put } from "../../decorators/method";
import { Body, Query } from "../../decorators/parameters";
import { Response } from "../../controller";
import { FilterQuery } from "mongoose";
import { QueryInfo } from "../repository";
import DomainRepository from "../repositories/domain/repository";
import LanguageRepository from "../repositories/language/repository";




export class DomainImageController extends BaseController<DomainImageConfig> {
    domainRepo: DomainRepository
    languageRepo: LanguageRepository
    constructor(baseRoute: string, repo: DomainImageConfigRepository, options?: ControllerOptions) {
        super(baseRoute, repo, options)
        this.domainRepo = new DomainRepository()
        this.languageRepo = new LanguageRepository()
    }


    @Put("")
    async updateDomainImageConfig(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Body({
            schema: z.object({
                "upload-path": z.object({
                    fileManager: BaseController.id,
                    path: z.string()
                }),
                "valid-Suffix": z.array(z.string()),
                "image-result-Suffixs": z.array(z.string()),
                "nonConvert-Suffixs": z.array(z.string()),
                "image-addressing" : z.string(),
                "convert-main": z.boolean(),
                "compress-main": z.boolean(),
                "compress-quality" : z.coerce.number().int().min(0).max(100),
                "make-phone-image" : z.boolean().default(false),
                "phone-width": z.coerce.number().int().min(300).max(500),
                "watermark-main": z.boolean().default(false),
                "main-watermark-config" :z.string().optional() ,
                watermark: z.boolean().default(false),
                "watermark-config" : z.string().optional()
            }),
        }) data: any
    ): Promise<Response> {
        try {
            return await this.editById(id, {
                $set: {
                   ... data
                }
            })
        } catch (error) { 
            throw error
        }

    }

    @Get("")
    async getById(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string
    ): Promise<Response> {
        try {
            return await this.findById(id, {
                population: [{
                    path: "domain"
                }]
            })
        } catch (error) {
            throw error
        }

    }

    async paginate(page: number, limit: number, query?: FilterQuery<DomainImageConfig>, options?: QueryInfo, ...params: [...any]): Promise<Response> {
        // console.log("paginate")
        let domains = []
        try {
            let defualtDomain = await this.domainRepo.findOne({ isDefault: true })
            let domainLang = await this.languageRepo.findAll({
                domain: {
                    $exists: true
                }
            })
            domains.push(defualtDomain?._id)
            for (let i = 0; i < domainLang.length; i++) {
                domains.push(domainLang[i].domain)
            }
        } catch (error) {
            throw error
        }
      
        let res = await super.paginate(page, limit, {
            domain: {
                $in: domains
            }
        }, {
            population: [{
                path: "domain"
            }]
        })
        let data = res.data

        let notExistsDomains = []
        try {
            for (let j = 0; j < domains.length; j++) {
                let exists = false
                for (let i = 0; i < data.list.length; i++) {
                    if (data.list[i].domain != null && data.list[i].domain._id?.toHexString() == domains[j].toHexString()) {
                        // console.log("domain ", data.list[i].domain._id)
                        exists = true
                        break
                    }
                }
                if (!exists) {
                    notExistsDomains.push(domains[j])
                }

            }
        } catch (error) {
            console.log(error)
        }
        let sample :any= {
            "upload-path": {
                "fileManager": "",
                "path": ""
            },
            "valid-Suffix": [],
            "image-result-Suffixs": [],
            "nonConvert-Suffixs": [],
            "image-addressing": "",
            "convert-main": false,
            "compress-main": false,
            "make-phone-image" : true,
            "phone-width": 300,
            "compress-quality" : 80,
            "watermark-main": false,
            "main-watermark-config" :"",
            "watermark": false,
            "watermark-config" : ""

        }
        let nonexislist: any[] = JSON.parse(JSON.stringify(await this.domainRepo.findAll(
            {
                _id: {
                    $in: notExistsDomains
                }
            }
        )))
        for (let i = 0; i < nonexislist.length; i++) {
           nonexislist[i] = Object.assign(nonexislist[i],sample)
            
        }
        res.data["notExistsDomains"] = nonexislist
        return res

    }

}

const domainImageConfig = new DomainImageController("/domainImageConfig", new DomainImageConfigRepository({
    population : [{
        source : "domain"
    }]
}), {
    insertSchema: z.object({
        "upload-path": z.object({
            fileManager: BaseController.id,
            path: z.string()
        }),
        "valid-Suffix": z.array(z.string()),
        "image-result-Suffixs": z.array(z.string()),
        "nonConvert-Suffixs": z.array(z.string()),
        "image-addressing" : z.string(),
        "convert-main": z.boolean(),
        "compress-main": z.boolean(),
        "compress-quality" : z.coerce.number().int().min(0).max(100).default(80),
        "make-phone-image" : z.boolean().default(false),
        "phone-width": z.coerce.number().int().min(300).max(500).optional(),
        domain: BaseController.id,
        "watermark-main": z.boolean().default(false),
        "main-watermark-config" :z.string().optional() ,
        "watermark": z.boolean().default(false),
        "watermark-config" : z.string().optional()
    })
})

export default domainImageConfig