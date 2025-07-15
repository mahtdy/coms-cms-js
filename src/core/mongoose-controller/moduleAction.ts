import Controller, { Response } from "../controller";
import { Get, Post } from "../decorators/method";
import { Body, Query } from "../decorators/parameters";
import { z } from "zod"
import BaseController from "./controller";

interface ModuleAction {
    name: string,
    showTitle: string,
    type: "boolean" | "list" | "autoComplate",
    value: any,
    options?: string[],
    related?: string | string[],
    optionRelated?: {
        option: string,
        related: string
    },
    autoComplate?: string

}

export class ModuleActionController extends Controller {
    actions: {
        [x: string]: ModuleAction[]
    }
    constructor(baseRoute: string, moduleConfig: {
        [x: string]: ModuleAction[]
    }) {
        super(baseRoute)
        this.actions = moduleConfig
    }

    @Get("")
    getActions(
        @Query({
            destination: "subPart",
            schema: z.string()
        }) subPart: string,
        @Query({
            destination : "role",
            schema : BaseController.id
        }) role : string
    ): Response {
        var data = this.actions[subPart]
        console.log(data)
        if (data)
            return {
                status: 200,
                data
            }
        return {
            status: 404
        }
    }

    // @Post("")
    // setActions(
    //     // @Body({

    //     // }) actions : any,
    //     // @Body()
    // ){

    // }

}

const moduleAction = new ModuleActionController("/mudole/actions", {
    content: [
        {
            name: "insert",
            type: "boolean",
            showTitle: "درج محتوا",
            value: false
        },
        {
            name: "delete",
            type: "boolean",
            showTitle: "حذف محتوا",
            value: false
        },
        {
            name: "update",
            type: "boolean",
            showTitle: "آپدیت محتوا",
            value: false
        },
        {
            name: "manageSeo",
            type: "boolean",
            showTitle: "مدیریت محتوا",
            related: "insert",
            value: false
        },
        {
            name: "questionManage",
            type: "boolean",
            showTitle: "مدیریت پرسش و پاسخ",
            related: "insert",
            value: false
        },
        {
            name: "contentType",
            type: "list",
            options: ["مقاله", "ویدیویی", "گالری", "پادکست", "جامع", "همه"],
            showTitle: "نوع محتوا",
            value: []
        },
        {
            name: "manageSub",
            showTitle: "مدیریت زیر نویس",
            type: "boolean",
            value: false,
            optionRelated: {
                option: "ویدیویی",
                related: "contentType"
            }
        },
        {
            name: "publish",
            type: "boolean",
            showTitle: "انتشار محتوا",
            value: false
        },
        {
            name: "exportPDF",
            type: "boolean",
            showTitle: "خروجی pdf",
            value: false
        },
        {
            name: "exportExcel",
            type: "boolean",
            showTitle: "خروجی excel",
            value: false
        },
        {
            name: "exportCSV",
            type: "boolean",
            showTitle: "خروجی csv",
            value: false
        },
        {
            name: "datatableManage",
            type: "boolean",
            showTitle: "شخصی سازی ستون",
            value: false
        },
        {
            name: "linkManage",
            type: "boolean",
            showTitle: "مدیریت لینک سازی",
            value: false
        },
        {
            name: "analyseContent",
            type: "boolean",
            showTitle: "تحلیل محتوا",
            value: false
        },
        {
            name: "manageTemplate",
            type: "boolean",
            showTitle: "مدیریت قالب",
            value: false
        },
        {
            name: "manageLanguage",
            type: "autoComplate",
            autoComplate: "",
            showTitle: "محدود کردن زبان",
            value: []
        },
        {
            name: "manageCategory",
            type: "autoComplate",
            autoComplate: "",
            showTitle: "محدود کردن دسته‌بندی",
            value: []
        },
    ]
})

export default moduleAction