
import { Body, Query } from "../../decorators/parameters";
import { Response } from "../../controller";
import BaseController from "../controller";
import VideoConfig from "../repositories/videoConfig/model";
import VideoConfigRepository from "../repositories/videoConfig/repository";
import { Get, Put } from "../../decorators/method";

import {z} from "zod"
import { QueryInfo } from "../repository";
import { Types } from "mongoose";

var waterMarkConfig = z.object({
    name: z.string().optional(),
    type: z.enum([
        "text",
        "image"
    ]).optional(),
    gravity: z.enum([
        "NorthWest",
        "North",
        "NorthEast",
        "West",
        "Center",
        "East",
        "SouthWest",
        "South",
        "SouthEast"
    ]).optional(),
    imageAddress: z.string().optional(),
    text: z.string().optional(),
    textAlign: z.enum([
        "center",
        "right",
        "left"
    ]).optional(),
    lineSpacing: z.number().positive().optional(),
    wordSpacing: z.number().positive().optional(),
    position_x: z.number().positive(),
    position_y: z.number().positive(),
    x: z.coerce.number().int().positive().optional(),
    y: z.coerce.number().int().positive().optional(),
    transparency: z.coerce.number().int().positive().max(100).min(0).optional(),
    fontSize: z.coerce.number().int().positive().min(1).optional(),
    fontColor: z.string().optional(),
    fontName: z.string().optional(),
    waterMarkSizeType: z.enum([
        "relative",
        "fixed"
    ]).optional(),
    waterMarkSize: z.number().positive().optional(),
    italic: z.boolean().optional(),
    bold: z.boolean().optional(),
    underline: z.boolean().optional(),
    shadowOffsetX: z.coerce.number().int().optional(),
    shadowOffsetY: z.coerce.number().int().optional(),
    shadowBlur: z.coerce.number().int().optional(),
    shadowColor: z.string().default("black").optional(),
    strokeWidths: z.coerce.number().int().optional(),
    strokeColor: z.string().default('black').optional(),
    angle: z.coerce.number().int().optional(),
    tile: z.coerce.number().optional(),
    diagonalLines: z.boolean().optional(),
    diagonalLinesColor: z.string().optional(),
    backgroundColor: z.string().optional(),
})

var insertSchema = z.object({
    lable: z.string(),
    configs: z.array(waterMarkConfig).optional(),
 
})

export class VideoConfigController extends BaseController<VideoConfig>{
    
    
    @Get("")
    findById(@Query({ destination: "id", schema: BaseController.id }) id: string | Types.ObjectId, queryInfo?: QueryInfo | undefined): Promise<Response> {
        return super.findById(id)
    }


    @Put("")
    async edit(
        @Query({
            destination: "id",
            schema: BaseController.id
        }) id: string,
        @Body({
            schema: insertSchema
        }) watermark: any
    ): Promise<Response> {
        return this.replaceOne({
            _id: id
        }, watermark)
    }
    
    initApis(): void {
        super.initApis()
        this.addRouteWithMeta("/video-configes/search", "get", this.search.bind(this), BaseController.searcheMeta)
        this.addRouteWithMeta("es/search/list", "get", this.getSearchList.bind(this), {})
    }

}

const videoConfig = new VideoConfigController("/video-config", new VideoConfigRepository(), {
    searchFilters: {
        lable: ["reg", "eq"]
    },
    paginationConfig: {
        fields: {
            lable: {
                en_title: "lable",
                fa_title: "برچسب",
                isOptional: false,
                sortOrderKey: false,
                type: "string"
            },
            filter: {
                en_title: "filter",
                fa_title: "فیلتر",
                isOptional: true,
                sortOrderKey: false,
                type: "string",
                isSelect: true,
                selectList: [
                    "amaro",
                    "clarendon",
                    "gingham",
                    "moon",
                    "lark",
                    "reyes",
                    "juno",
                    "slumber",
                    "crema",
                    "ludwig",
                    "aden",
                    "perpetua",
                    "mayfair",
                    "rise",
                    "hudson",
                    "valencia",
                    "x-pro2",
                    "sierra",
                    "willow",
                    "lo-fi",
                    "inkwell",
                    "hefe",
                    "nashville",
                    "stinson",
                    "vesper",
                    "earlybird",
                    "brannan",
                    "sutro",
                    "toaster",
                    "walden",
                    "1977",
                    "kelvin",
                    "maven",
                    "ginza",
                    "skyline",
                    "dogpatch",
                    "brooklyn",
                    "helena",
                    "ashby",
                    "charmes"
                ]
            }
        },
        paginationUrl: "/video-configes/search",
        searchUrl: "/video-configes/search",
        serverType: "",
        tableLabel: "video-config",
        actions: [
            {
                route: "panel/watermark/video/edit/$_id",
                type: "edit",
                api: "",
                queryName: "",
                fromData: ["_id"]
            },
            {
                route: "panel/watermark/video",
                type: "insert",
                api: "",
                queryName: "",
                text: "اضافه کردن مورد جدید"
            },

            {
                route: "panel/watermark/delete",
                type: "delete",
                api: "/video-config",
                queryName: ""
            }
        ]

    },
})

export default videoConfig