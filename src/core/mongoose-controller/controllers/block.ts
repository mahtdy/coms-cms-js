import { Body, Files, Query, Res } from "../../decorators/parameters";
import { Response } from "../../controller";
import { Get, Post, Put } from "../../decorators/method";
import BaseController, { ControllerOptions } from "../controller";
import MenuRepository from "../repositories/block/menu/repository";
import Block, { DataMap } from "../repositories/block/model";
import BlockRepository from "../repositories/block/repository";
import { z } from "zod"
import ReactDOMServer from 'react-dom/server';
// import SS from "next/"
import NavbarRepository from "../repositories/block/navbar/repository";
import HambergerRepository from "../repositories/block/hamberger/repository";
import HeaderRepository from "../repositories/block/header/repository";
import Header from "../repositories/block/header/model"
import Navbar from "../repositories/block/navbar/model";
import Hamberger from "../repositories/block/hamberger/model";
import Menu from "../repositories/block/menu/model";
import React from "react";
import BlockExportRepository from "../repositories/block/blockExport/repository";



// @inheritRoutes
export class BlockController<T extends Block> extends BaseController<T> {
    blockExportRepo: BlockExportRepository
    blockType: string
    constructor(baseRoute: string, repo: BlockRepository<T>, options: ControllerOptions & {
        blockType: string
    }) {
        super(baseRoute, repo, options)
        this.blockType = options.blockType
        this.blockExportRepo = new BlockExportRepository()
    }

    // @Post("/create")
    async createTemplate(name: string, dataType: string, dataMap: any, tsx: string, files: any[], css: string, csses: any[]
    ): Promise<Response> {
        tsx = files[0].path
        css = csses[0].path
        return super.create({
            name,
            dataType,
            tsx,
            css,
            dataMap
        } as any)
    }


    // @Post("/export")
    async exportJSX(
        @Body({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Body({
            destination: "config",
            schema: BaseController.search
        })
        config: any
    ): Promise<Response> {
        try {
            return {
                status: 200,
                data: await this.repository.exportJSX(id, config)
            }
        } catch (error) {
            throw error
        }
    }


    async getForm(id: string
    ): Promise<Response> {
        try {
            let block = await this.repository.findById(id)
            if (block == null) {
                return {
                    status: 404
                }
            }
            console.log(block)
            return {
                data: block.dataMap
            }
        } catch (error) {
            throw error
        }
    }


    // html = `<link rel="stylesheet" href="https://files.heyseo.ir/style/globals.css">` + `<link rel="stylesheet" href="https://files.heyseo.ir/style/temp.css">` + `<link rel="stylesheet" href="https://files.heyseo.ir/style/1704027179242.css">` + jsxBuffer




    // res.type('html');

    // jsxBuffer.pipe(res);

    // @Get("/check")
    async checkData(id: string): Promise<Response> {
        try {
            var exported = await this.repository.getExported(id)
            if (exported == null) {
                return {
                    status: 400,
                    data: []
                }
            }

            const Com = require(exported.file.replace("src/", "../../../").replace(".jsx", ""))
            const Component = Com.default

            // ReactDOMServer.renderToStaticMarkup(<Component data={ exported.json } />)


            var html = ReactDOMServer.renderToString(React.createElement(Component, { data: exported.json }), {

            })
            // var html = ReactDOMServer.renderToStaticMarkup(Com.default(exported.json), {

            // })
            return {
                // sent: 
                data: html,
                html: true

            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }


    initApis(): void {
        // this.addRouteWithMeta("/create", "post", this.createTemplate.bind(this), {
        //     "1": {
        //         index: 0,
        //         source: "body",
        //         schema: this.insertSchema,
        //         parseJson :true
        //     }
        // })
        this.addRouteWithMeta("/create", "post", this.createTemplate.bind(this), {
            "1": {
                destination: "name",
                schema: z.string(),
                index: 0,
                source: "body"
            },
            "2": {
                destination: "dataType",
                schema: z.enum(["static",
                    "dynamic"]),
                index: 1,
                source: "body"
            },
            "3": {
                destination: "dataMap",
                schema: z.array(BaseController.search),
                parseJson: true,
                index: 2,
                source: "body"
            },
            "5": {
                destination: "file",
                index: 3,
                source: "body",
            },
            "4": {
                destination: "file",
                schema: z.any().optional(),
                config: {
                    maxCount: 1,
                    rename: true,
                    dest: "src/uploads/frontend/",
                    name: "file",
                    types: ["tsx", "jsx"]
                },
                mapToBody: true,
                index: 4,
                source: "files"
            },
            "7": {
                destination: "css",
                index: 5,
                source: "body"
            },
            "6": {
                destination: "css",
                schema: z.any().optional(),
                config: {
                    maxCount: 1,
                    rename: true,
                    dest: "src/uploads/frontend/",
                    name: "css",
                    types: ["css"]
                },
                mapToBody: true,
                index: 6,
                source: "files"
            },
        }
        )
        this.addRouteWithMeta("/export", "post", this.exportJSX.bind(this), {
            "1": {
                destination: "id",
                schema: BaseController.id,
                index: 0,
                source: "body"
            },
            "2": {
                destination: "config",
                schema: BaseController.search,
                index: 1,
                source: "body"
            }
        })
        this.addRouteWithMeta("/check", "get", this.checkData.bind(this), {
            "1": {
                destination: "id",
                schema: BaseController.id,
                index: 0,
                source: "query"
            }
        })

        this.addRouteWithMeta("/form", "get", this.getForm.bind(this), {
            "1": {
                destination: "id",
                schema: BaseController.id,
                index: 0,
                source: "query"
            }
        })
        this.addRouteWithMeta("es/", "get", this.paginate.bind(this), BaseController.paginateMeta)
    }

}


const blockSchema = z.object({
    name: z.string(),
    dataType: z.enum(["static",
        "dynamic"]),
    dataMap: z.array(z.any()),
})

class HeaderController extends BlockController<Header> { }
export const header = new HeaderController("/block/header", new HeaderRepository(), {
    insertSchema: blockSchema.omit({}),
    blockType: "header"
})


class NavbarController extends BlockController<Navbar> { }
export const nav = new NavbarController("/block/navbar", new NavbarRepository(), {
    insertSchema: blockSchema.omit({}),
    blockType: "navbar"
})

class HambergerController extends BlockController<Hamberger> { }
export const hamberger = new HambergerController("/block/hamberger", new HambergerRepository(), {
    insertSchema: blockSchema.omit({}),
    blockType: "hamberger"
})


// @inheritRoutes
class MenuController extends BlockController<Menu> { }
export const menu = new MenuController("/block/menu", new MenuRepository(), {
    insertSchema: blockSchema.omit({}).merge(
        z.object({
            type: z.enum(["mega", "waterfall"])
        })
    ),
    blockType: "menu"
})


let navbarData: DataMap =
{
    "title": "لیست منوها",
    "key": "list",
    "type": "array",
    "arrayType": "object",
    "dataFrom": "static",
    "object": [
        {
            "title": "text",
            "key": "عنوان",
            "type": "text",
            "required": true,
            dataFrom: "static"

        },

        {
            "title": "link",
            "key": "لینک",
            "type": "link",
            "required": false,
            dataFrom: "static"

        },


    ],
    children:
        [
            {
                "title": "زیرمنو",
                "key": "subMenu",
                "type": "component",
                "componentType": "menu",
                "required": false,
                "dataFrom": "static"
            }
        ],
    required: true
}


let abshariData: DataMap = {
    "title": "لیست منوها",
    "key": "list",
    "type": "array",
    "arrayType": "object",
    "dataFrom": "static",
    "object": [
        {
            "title": "عنوان",
            "key": "text",
            "type": "text",
            "required": true,
            dataFrom: "static"
        },

        {
            "title": "لینک",
            "key": "link",
            "type": "link",
            "required": false,
            dataFrom: "static"

        },

        {
            "title": "آیکون",
            type: "mixed",
            mixedTypes: ["img", "svg"],
            dataFrom: "static",
            key: "icon",
            required: true,
            imageConfig: {
                width: 20,
                height: 20,
                validTypes: ["jpg", "png", "webp"]
            }

        }
    ],
    children:
        [{
            "title": "زیرمنو",

            "key": "subMenu",
            "type": "component",
            "componentType": "menu",
            "componentSubType": "abshari",
            "required": false,
            "dataFrom": "static"
        }],
    required: true
}
