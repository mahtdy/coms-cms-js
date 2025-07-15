
import { Admin, Body, Files, Query } from "../../decorators/parameters";
import { Response } from "../../controller";
import BaseController, { ControllerOptions } from "../controller";
import Redirect from "../repositories/redirect/model";
import RedirectRepository from "../repositories/redirect/repository"
import readXlsxFile from "read-excel-file/node";
import csv from "csv-parser"
import fs from "fs"
import { Get, Post } from "../../decorators/method";
import { styles } from "../style"
import { z } from "zod"
import { AdminInfo } from "../auth/admin/admin-logIn";
import { get } from "lodash";
import ContentRepository from "../repositories/content/repository";


var excelConfig = {
    type: {
        displayName: "Type",
        headerStyle: styles.headerOdd,
        cellStyle: styles.cellOdd,
        width: 120,
    },
    from: {
        displayName: "From",
        headerStyle: styles.headerEven,
        cellFormat: function (value: any, row: any) {
            return decodeURI(value)
        },
        cellStyle: styles.cellEven,
        width: 400,
    },
    to: {
        displayName: "To",
        headerStyle: styles.headerOdd,
        cellStyle: styles.cellOdd,
        cellFormat: function (value: any, row: any) {
            return decodeURI(value)
        },
        width: 120,
    },
    code: {
        displayName: "Code",
        headerStyle: styles.headerEven,
        cellStyle: styles.cellEven,
        width: 120,
    },
    isAutomatic: {
        displayName: "Is Automatic",
        headerStyle: styles.headerOdd,
        cellStyle: styles.cellOdd,
        width: 120,
    },
    external: {
        displayName: "Is External",
        headerStyle: styles.headerOdd,
        cellStyle: styles.cellOdd,
        width: 120,
    }
}

var csvConfig = {
    fields: ["type", "from", "to", "code", "isAutomatic", "external"],
    fieldNames: ["Type", "From", "To", "Code", "Is Automatic", "Is External"]
}

var pdfConfig = {
    path: "src/core/mongoose-controller/pdf.ejs",
    options: {
        "height": "90.25in",
        "width": "45.5in",
        "header": {
            "height": "20mm"
        },
        "footer": {
            "height": "20mm",
        },
        "childProcessOptions": {
            env: {
                OPENSSL_CONF: "/dev/null",
            },
        }
    },
    titles: ["Type", "From", "To", "Code", "Is Automatic", "Is External"],
    dataMap: ["type", "from", "to", "code", "isAutomatic", "external"]
}


export class RedirectController extends BaseController<Redirect> {
    contentRepo: ContentRepository
    constructor(baseRoute: string, repo: RedirectRepository, options: ControllerOptions) {
        super(baseRoute, repo, options)
        this.contentRepo = new ContentRepository()
    }

    @Post("s/import/exel")
    async importExcel(
        @Files({
            config: {
                name: "file",
                maxCount: 1,
                size: parseInt((1 * 1048576).toString(), 10),
                types: ["xlsx", "xls"]
            },
            mapToBody: true,
            destination: "file"
        }) files: any,
        @Body({
            destination: "file"
        }) file: string
    ): Promise<Response> {
        try {
            var rows = await readXlsxFile(file)
            var redirects: any[] = []
            for (let i = 1; i < rows.length; i++) {
                redirects.push({
                    from: rows[i][1],
                    to: rows[i][2],
                    code: rows[i][3],
                    external: rows[i][4],
                })
            }
        } catch (error) {
            throw error
        }
        return this.doImport(redirects)
    }

    @Post("s/import/csv")
    async importCSV(
        @Files({
            config: {
                name: "file",
                maxCount: 1,
                size: parseInt((1 * 1048576).toString(), 10),
                types: ["csv"]
            },
            destination: "file",
            mapToBody: true
        }) files: any,
        @Body({
            destination: "file"
        }) file: string
    ): Promise<Response> {
        try {
            var redirects: any = await new Promise((resolve, reject) => {
                let results: any[] = []
                fs.createReadStream(file, {
                    encoding: "utf8"
                })
                    .pipe(csv())
                    .on("data", (data) => {
                        results.push(data)
                    })
                    .on("end", () => {
                        return resolve(results)
                    });
            })
        } catch (error) {
            throw error
        }
        return await this.doImport(redirects)
    }

    @Get("s/export/csv")
    exportCSV(@Query({}) query: any, @Admin() admin: AdminInfo): Promise<Response> {
        return super.exportCSV(query, admin)
    }

    @Get("s/export/exel")
    exportExcel(@Query({}) query: any, @Admin() admin: AdminInfo): Promise<Response> {
        return super.exportExcel(query, admin)
    }

    @Get("s/export/pdf")
    exportPDF(@Query({}) query: any, @Admin() admin: AdminInfo): Promise<Response> {
        return super.exportPDF(query, admin)
    }

    // @Log
    public async doImport(redirects: any[]): Promise<Response> {
        try {
            var inserted = await this.repository.insertMany(redirects)
        } catch (error) {
            throw error
        }

        var repetitive: any = {}
        for (let i = 0; i < inserted.length; i++) {
            repetitive[inserted[i].from + "*" + inserted[i].to] = true
        }

        var notInserted = redirects.filter((elem: any, i: number) => {
            return repetitive[elem.from + "*" + elem.to] != true
        })

        return {
            status: 200,
            data: {
                inserted,
                notInserted
            }
        }
    }

    async insertManyFromUrl(urls: string[], redirect: any): Promise<Response> {
        var redirects: any[] = []
        for (let i = 0; i < urls.length; i++) {
            redirects.push(
                Object.assign(redirect, {
                    from: urls[i]
                })
            )
        }
        return await this.doImport(redirects)
    }

    @Get("/exists")
    async checkRedirectExists(
        @Query({
            destination: "url",
            schema: z.string()
        }) url: string
    ): Promise<Response> {

        try {
            let c = await this.contentRepo.findOne({
                url
            })
            var r = await this.repository.findOne({
                $or: [
                    {
                        from: c?._id
                    },
                    {
                        from : url
                    }
                ],
                status: true
            })
            console.log("r" , r)
            return {
                data: r
            }
        } catch (error) {
            throw error
        }
    }
}


var redirect = new RedirectController("/redirect", new RedirectRepository(), {
    insertSchema: z.object({
        type: z.enum(["regex", "1To1", "auto", "oldToNew"]).default("1To1"),
        from: z.string(),
        to: z.string(),
        regexConfig: z.any().optional(),
        external: z.boolean().default(false),
        code: z.enum(["301", "302", "303", "304", "307", "308"]),
        fromStatic: z.boolean().optional().default(false),
        toStatic: z.boolean().optional().default(false),
        domain: BaseController.id.optional()
    }),
    csvConfig,
    excelConfig,
    pdfConfig
})

export default redirect