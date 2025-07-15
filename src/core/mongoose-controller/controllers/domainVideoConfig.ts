import { z } from "zod";
import BaseController, { ControllerOptions } from "../controller";
import DomainVideoConfig from "../repositories/domainVideoConfig/model";
import DomainVideoConfigRepository from "../repositories/domainVideoConfig/repository";
import { Delete, Get, Put } from "../../decorators/method";
import { Body, Query } from "../../decorators/parameters";
import { Response } from "../../controller";
import { FilterQuery } from "mongoose";
import { QueryInfo } from "../repository";
import DomainRepository from "../repositories/domain/repository";
import LanguageRepository from "../repositories/language/repository";


export class DomainVideoController extends BaseController<DomainVideoConfig> {
    domainRepo: DomainRepository
    languageRepo: LanguageRepository
    constructor(baseRoute: string, repo: DomainVideoConfigRepository, options?: ControllerOptions) {
        super(baseRoute, repo, options)
        this.domainRepo = new DomainRepository()
        this.languageRepo = new LanguageRepository()
    }

    @Put("")
    async updateDomainVideoConfig(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Body({
            schema: z.object({
                "upload-path": z.object({
                    fileManager: BaseController.id,
                    path: z.string(),

                }),
                "editor-upload-size": z.object({
                    unit: z.enum(["MB", "GB"]),
                    value: z.coerce.number().positive()
                }),
                "download-size": z.object({
                    unit: z.enum(["MB", "GB"]),
                    value: z.coerce.number().positive()
                }),
                "upload-size": z.object({
                    unit: z.enum(["MB", "GB"]),
                    value: z.coerce.number().positive()
                }),
                "save-path": z.object({
                    fileManager: BaseController.id,
                    path: z.string(),
                }),
                "quality-persent": z.coerce.number().positive(),
                "save-paths": z.array(z.object({
                    fileManager: BaseController.id,
                    path: z.string(),
                    quality: z.string()
                })),
                "save-main-source": z.boolean(),
                "video-result-Suffixs": z.array(z.string()),
                "valid-Suffix": z.array(z.string()),
                "save-quality": z.array(z.string()),
                "auto-save-quality": z.boolean(),
                "watermark": z.boolean().default(false),
                "watermark-config" : z.string().optional()
            }),
        }) data: any
    ): Promise<Response> {
        try {

            return await this.editOne({
                _id: id
            }, {
                $set: {
                    ...data
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

    @Get("/validate/cdn")
    async validateCDN(
        @Query({
            destination: "cdn",
            schema: BaseController.id
        }) cdn: string,
        @Query({
            destination: "domain",
            schema: z.string()
        }) domain: string
    ): Promise<Response> {
        try {
            return {
                data: await this.domainRepo.isExists({
                    _id: domain,
                    $or: [{
                        cdns: cdn
                    } , {
                        localCDN : cdn
                    }]
                })
            }
        } catch (error) {
            throw error
        }
    }


    async paginate(page: number, limit: number, query?: FilterQuery<DomainVideoConfig>, options?: QueryInfo, ...params: [...any]): Promise<Response> {
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
            "editor-upload-size": {
                "unit": "GB",
                "value": 1
            },
            "download-size": {
                "unit": "GB",
                "value": 1
            },
            "upload-size": {
                "unit": "GB",
                "value": 1
            },
            "save-path": {
                "fileManager": "",
                "path": ""
            },
            "quality-persent": 80,
            "save-paths": [],

            "save-main-source": false,
            "video-result-Suffixs": [],
            "valid-Suffix": [], "save-quality": [],
            "auto-save-quality": false,
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

const domainVideoConfig = new DomainVideoController("/domainVideoConfig", new DomainVideoConfigRepository({
    population: [{
        source: "domain"
    }]
}), {
    insertSchema: z.object({
        "upload-path": z.object({
            fileManager: BaseController.id,
            path: z.string(),

        }),
        "editor-upload-size": z.object({
            unit: z.enum(["MB", "GB"]),
            value: z.coerce.number().positive()
        }),
        "download-size": z.object({
            unit: z.enum(["MB", "GB"]),
            value: z.coerce.number().positive()
        }),
        "upload-size": z.object({
            unit: z.enum(["MB", "GB"]),
            value: z.coerce.number().positive()
        }),
        "save-path": z.object({
            fileManager: BaseController.id,
            path: z.string(),
        }),
        "quality-persent": z.coerce.number().positive(),
        "save-paths": z.array(z.object({
            fileManager: BaseController.id,
            path: z.string(),
            quality: z.string()
        })),
        "save-main-source": z.boolean(),
        "video-result-Suffixs": z.array(z.string()),
        "valid-Suffix": z.array(z.string()),
        "save-quality": z.array(z.string()),
        "auto-save-quality": z.boolean(),
        "watermark": z.boolean().default(false),
        "watermark-config" : z.string().optional(),
        domain: BaseController.id
    })
})

export default domainVideoConfig