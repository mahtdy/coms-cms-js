

import BaseController from "./controller";
import { Plugin } from "../plugin";
import { Route } from "../application";
import CacheService from "../cache";
import { Body, Query } from "../decorators/parameters";
import { z } from "zod"
import { DiskFileManager } from "../services/fileManager";
import fs from "fs"

export default class DataExporter extends Plugin {
    client: CacheService;
    constructor(client: CacheService) {
        super()
        this.client = client
    }

    async init(): Promise<any> {
        return
    }

    serve(...args: any[]): Route[] {
        var routes: Route[] = []
        routes.push({
            execs: this.exportPDF.bind(this),
            method: "post",
            route: "/export/pdf",
            meta: Reflect.getMetadata("exportPDF" + this.constructor.name, this)
        })
        routes.push({
            execs: this.exportPDFFromURL.bind(this),
            method: "post",
            route: "/export/pdf/url",
            meta: Reflect.getMetadata("exportPDFFromURL" + this.constructor.name, this)
        })
        routes.push({
            execs: this.exportCSV.bind(this),
            method: "post",
            route: "/export/csv",
            meta: Reflect.getMetadata("exportCSV" + this.constructor.name, this)
        })
        routes.push({
            execs: this.exportExcel.bind(this),
            method: "post",
            route: "/export/excel",
            meta: Reflect.getMetadata("exportExcel" + this.constructor.name, this)
        })
        return routes
    }

    async exportPDF(
        @Body({
            destination: "dataList",
            schema: z.array(z.any())
        }) dataList: any[],
        @Body({
            destination: "pdfConfig",
            schema: z.any()
        }) pdfConfig: any,
        @Query({
            destination: "fields",
            schema: z.any()
        }) fields?: string[]
    ) {
        return BaseController.doExportPDF(dataList, pdfConfig, fields)
    }

    async exportExcel(
        @Body({
            destination: "dataList",
            schema: z.array(z.any())
        }) dataList: any[],
        @Body({
            destination: "excelConfig",
            schema: z.any()
        }) excelConfig: any,
        @Query({
            destination: "fields",
            schema: z.any()
        }) fields?: string[]
    ) {

        return BaseController.doExportExcel(dataList, excelConfig, fields)
    }


    async exportCSV(
        @Body({
            destination: "dataList",
            schema: z.array(z.any())
        }) dataList: any[],
        @Body({
            destination: "csvConfig",
            schema: z.any()
        }) csvConfig: any,
        @Query({
            destination: "fields",
            schema: z.any()
        }) fields?: string[]) {
        return BaseController.doExportCSV(dataList, csvConfig, fields)
    }


    async exportPDFFromURL(
        @Body({
            destination: "url",
            schema: BaseController.url
        }) url: string
    ) {
        try {
            var file = await DiskFileManager.downloadFile(url)
            if (!file.endsWith(".html")) {
                fs.renameSync(file, file + ".html")
                file = file + ".html"
            }
            return BaseController.doExportPDFFromFile(file)
        } catch (error) {
            throw error
        }
    }
}