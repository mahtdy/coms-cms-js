import { Route } from "./application";
import Controller, { Response } from "./controller";
import LanguageRepository from "./mongoose-controller/repositories/language/repository";
import Part, { PartOptions } from "./part";
import fs from "fs"


export default class AdmimPart extends Part {
    langRepo: LanguageRepository
    langMap: {
        [key: string]: any
    }
    constructor(route: string, options: PartOptions) {
        super(route, options)
        this.langRepo = new LanguageRepository()
        this.initLanguages()
        this.langMap = {}

    }

    
    getRoutes(): Route[] {
        // console.log("part")
        return super.getRoutes()

    }

    async initLanguages() {
        let langs = await this.langRepo.findAll({})
        for (let i = 0; i < langs.length; i++) {
            let index = ""
            if (typeof langs[i]._id == "string")
                index = langs[i]._id
            else {
                index = langs[i]._id.toHexString()
            }
            // console.log(langs[i].sign , langs[i]._id)
            if (langs[i].filePath) {
                // this.langMap[langs[i]._id.toHexString()] = JSON.parse(langs[i].filePath
                fs.readFile(langs[i].filePath, (err, data) => {
                    if (err) {
                        fs.readFile("src/uploads/languages/deafult.json", (err, data) => {
                            if (!err)
                                this.langMap[index] = JSON.parse(data.toString("utf-8"))
                        })
                    }
                    else
                        this.langMap[index] = JSON.parse(data.toString("utf-8"))
                })

            }
            else {
                fs.readFile("src/uploads/languages/deafult.json", (err, data) => {
                    if (!err)
                        this.langMap[index] = JSON.parse(data.toString("utf-8"))
                })
            }

        }
    }

    serve(): Route[] {
        let routes = super.serve()
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].postExec == undefined) {
                routes[i].postExec = []
            }
            routes[i].postExec?.push({
                func: this.languagePostExec.bind(this),
                meta: {
                    params: {
                        "1": {
                            source: "session"
                        }
                    }
                }
            })
        }
        return routes
    }

    async languagePostExec(res: Response, session: any): Promise<Response> {
        if (!res.message)
            return res
        
        if(session.language && this.langMap[session.language]){
            res.message = this.langMap[session.language]?.msgs[res.message] || res.message
        }
        return res
    }
}