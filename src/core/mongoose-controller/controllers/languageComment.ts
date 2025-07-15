import { FilterQuery, Types } from "mongoose";
import { Response } from "../../controller";
import BaseController, { ControllerOptions } from "../controller";
import LanguageCommentConfig from "../repositories/languageComment/model";
import LanguageCommentRepository from "../repositories/languageComment/repository";
import z from 'zod'
import { QueryInfo } from "../repository";
import { Get, Put } from "../../decorators/method";
import { Body, Query } from "../../decorators/parameters";
import LanguageRepository from "../repositories/language/repository";
import DomainRepository from "../repositories/domain/repository";


export class LanguageCommentConfigController extends BaseController<LanguageCommentConfig> {
    languageRepo: LanguageRepository
    domainRepo: DomainRepository
    constructor(baseRoute: string, repo: LanguageCommentRepository, options?: ControllerOptions) {
        super(baseRoute, repo, options)
        this.languageRepo = new LanguageRepository()
        this.domainRepo = new DomainRepository()
    }

    @Put("")
    async updateLanguageCommentConfig(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Body({
            schema: z.object({
                "ungegistered-user-comment": z.boolean(),
                "min-comment-delay": z.coerce.number().int().positive(),
                "min-comment-delay-unit": z.enum(["minute", "second", "hour"]),
                "max-comment-character": z.coerce.number().int().positive(),
                "max-comment-show-limit": z.coerce.number().int().positive(),
                "template": z.string(),
                "captcha": z.boolean(),
                // captchaInfo: 
                "captcha-type": z.enum(["google", "cload", "system"]),
                "comment-reply": z.boolean(),
                "comment-rate": z.boolean(),
                "comment-submit-without-confirm": z.boolean(),
                "comment-show-sort": z.enum(["oldest", "latest"]),
                "comment-policy": z.string(),
                "validate-phone": z.boolean().optional(),
                "show-auto-signup": z.boolean().optional(),
                "email": z.boolean().optional(),
                "atach": z.boolean().optional(),
                "allowd-file-types": z.array(z.string()).default([]),
                "atach-size": z.coerce.number().positive().optional(),
                "atach-size-unit": z.enum(["MB", "KB"]).optional(),
                "atach-count": z.coerce.number().positive().optional(),
                "upload-path": z.object({
                    fileManager: BaseController.id,
                    path: z.string()
                }).optional(),


                "like-type": z.enum(["like-dislike", "like"]).default("like"),
                
                //editor
                "editor": z.boolean().optional(),
                "external-link-type": z.enum(["follow", "nofollow"]).optional(),
                "editor-upload-path": z.object({
                    fileManager: BaseController.id,
                    path: z.string()
                }).optional(),
                "editor-upload-types": z.array(z.string()).optional(),
                "editor-upload-size": z.coerce.number().int().positive(),
                "editor-upload-unit": z.enum(["MB", "KB"]).optional(),
                "image-width": z.coerce.number().int().min(300).max(500).optional()
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
    async findById(@Query({
        destination: "id",
        schema: BaseController.id
    }) id: string | Types.ObjectId, queryInfo?: QueryInfo | undefined): Promise<Response> {
        return super.findOne({
            _id: id
        }, {
            population: [{
                path: "language"
            }]
        })
    }


    @Get("/domain")
    async getLanguageDomain(
        @Query({
            destination: "language",
            schema: BaseController.id
        }) language: string
    ): Promise<Response> {
        try {
            let lang = await this.languageRepo.findById(language);
            if (lang == null) {
                return {
                    status: 404
                }
            }
            if (lang.domain) {
                return {
                    data: await this.domainRepo.findById(lang.domain as string)
                }
            }
            return {
                data: await this.domainRepo.findOne({
                    isDefault: true
                })
            }
        } catch (error) {
            throw error
        }

    }

    @Get("/domain/check")
    async checkLanguageDomain(
        @Query({
            destination: "language",
            schema: BaseController.id
        }) language: string)
        : Promise<Response> {
        try {
            let lang = await this.languageRepo.findById(language);
            if (lang == null) {
                return {
                    status: 404
                }
            }
            let domain
            if (lang.domain) {
                domain = await this.domainRepo.findById(lang.domain as string)
            }
            else {
                domain = await this.domainRepo.findOne({
                    isDefault: true
                })
            }

            return {
                data: domain?.cptchaInfo != undefined
            }
        } catch (error) {
            throw error
        }
    }

    async paginate(page: number, limit: number = 100, query?: FilterQuery<LanguageCommentConfig>, options?: QueryInfo, ...params: [...any]): Promise<Response> {
        // console.log("paginate")
        // let domains = []
        let langIds = []
        try {
            let langs = await this.languageRepo.findAll({
                status: true
            })
            for (let i = 0; i < langs.length; i++) {
                langIds.push(langs[i]._id)
            }
        } catch (error) {
            throw error
        }
        let res = await super.paginate(page, limit, {
            language: {
                $in: langIds
            }
        }, {
            population: [{
                path: "language"
            }]
        })
        let data = res.data

        let notExistsLangs = []
        try {
            for (let j = 0; j < langIds.length; j++) {
                let exists = false
                for (let i = 0; i < data.list.length; i++) {
                    if (data.list[i].language != null && data.list[i].language._id?.toHexString() == langIds[j].toHexString()) {
                        // console.log("domain ", data.list[i].domain._id)
                        exists = true
                        break
                    }
                }
                if (!exists) {
                    notExistsLangs.push(langIds[j])
                }

            }
        } catch (error) {
            console.log(error)
        }
        let sample: any = {
            "ungegistered-user-comment": true,
            "min-comment-delay": 1,
            "min-comment-delay-unit": "minute",
            "max-comment-character": 1,
            "max-comment-show-limit": 1,
            "template": "string",
            "captcha": true,
            "captcha-type": "system",
            "comment-reply": true,
            "comment-rate": true,
            "comment-submit-without-confirm": true,
            "comment-show-sort": "oldest",
            "comment-policy": "string",

            "validate-phone": true,
            "show-auto-signup": true,
            "email": true,
            "atach": true,
            "allowd-file-types": [],
            "atach-size": 50,
            "atach-size-unit": "KB",
            "atach-count": 2,
            "upload-path": {
                fileManager: "08f1af38fcd0df71852f15af",
                path: "test/"
            },
            "like-type": "like",


            "editor": true,
            "external-link-type": "nofollow",
            "editor-upload-types": [],
            "editor-upload-unit": "KB",
            "editor-upload-size": 500,
            "editor-upload-path": {
                fileManager: "08f1af38fcd0df71852f15af",
                path: "test/"
            },
            "image-width": 350
        }
        let nonexislist: any[] = JSON.parse(JSON.stringify(await this.languageRepo.findAll(
            {
                _id: {
                    $in: notExistsLangs
                }
            }
        )))
        for (let i = 0; i < nonexislist.length; i++) {
            nonexislist[i] = Object.assign(nonexislist[i], sample)

        }
        res.data["notExistsDomains"] = nonexislist
        return res
    }

}



const languageComment = new LanguageCommentConfigController("/languageCommentConfig", new LanguageCommentRepository(), {
    population: [{
        path: "language"
    }],
    insertSchema: z.object({
        "ungegistered-user-comment": z.boolean(),
        "min-comment-delay": z.coerce.number().int().positive(),
        "min-comment-delay-unit": z.enum(["minute", "second", "hour"]),
        "max-comment-character": z.coerce.number().int().positive(),
        "max-comment-show-limit": z.coerce.number().int().positive(),
        "template": z.string(),
        "captcha": z.boolean(),
        "captcha-type": z.enum(["google", "cload", "system"]),
        "comment-reply": z.boolean(),
        "comment-rate": z.boolean(),
        "comment-submit-without-confirm": z.boolean(),
        "comment-show-sort": z.enum(["oldest", "latest"]),
        "comment-policy": z.string(),
        language: BaseController.id,


        "validate-phone": z.boolean().optional(),
        "show-auto-signup": z.boolean().optional(),
        "email": z.boolean().optional(),
        "atach": z.boolean().optional(),
        "allowd-file-types": z.array(z.string()).default([]),
        "atach-size": z.coerce.number().positive().optional(),
        "atach-size-unit": z.enum(["MB", "KB"]).optional(),
        "atach-count": z.coerce.number().positive().optional(),
        "upload-path": z.object({
            fileManager: BaseController.id,
            path: z.string()
        }).optional(),

        "like-type": z.enum(["like-dislike", "like"]).default("like"),

        //editor
        "editor": z.boolean().optional(),
        "external-link-type": z.enum(["follow", "nofollow"]).optional(),
        "editor-upload-path": z.object({
            fileManager: BaseController.id,
            path: z.string()
        }).optional(),
        "editor-upload-types": z.array(z.string()).optional(),
        "editor-upload-size": z.coerce.number().int().positive(),
        "editor-upload-unit": z.enum(["MB", "KB"]).optional(),
        "image-width": z.coerce.number().int().min(300).max(500).optional()
    })
})

languageComment.loginRequired = true

export default languageComment