import gm, { ResizeOption } from "gm";
var gmCli = gm.subClass({ imageMagick: true })
import WaterMark, { WaterMarkConfig, waterMarkType } from "../mongoose-controller/repositories/waterMarkConfig/model";
import { DiskFileManager } from "./fileManager";
import RandomGenarator from "../random";
import WaterMarkRepository from "../mongoose-controller/repositories/waterMarkConfig/repository"
var text2png = require('./text2png');
import Jimp from "jimp"
import path from "path"
import { createCanvas, loadImage } from 'canvas'
import * as filters from 'instagram-filters'
import fs, { realpath } from "fs"
import logSystemError from "../errorLogger";

interface ImageProccessingOutPut {
    name: string,
    path: string
}

interface Dimension {
    x?: number,
    y?: number
}


var localImagesMap: {
    [x: string]: string
} = {}

var filterConfig: any = {
    amaro: filters.amaro,
    clarendon: filters.clarendon,
    gingham: filters.gingham,
    moon: filters.moon,
    lark: filters.lark,
    reyes: filters.reyes,
    juno: filters.juno,
    slumber: filters.slumber,
    crema: filters.crema,
    ludwig: filters.ludwig,
    aden: filters.aden,
    perpetua: filters.perpetua,
    mayfair: filters.mayfair,
    rise: filters.rise,
    hudson: filters.hudson,
    valencia: filters.valencia,
    "x-pro2": filters.xpro2,
    sierra: filters.sierra,
    willow: filters.willow,
    "lo-fi": filters.lofi,
    inkwell: filters.inkwell,
    hefe: filters.hefe,
    nashville: filters.nashville,
    stinson: filters.stinson,
    vesper: filters.vesper,
    earlybird: filters.earlybird,
    brannan: filters.brannan,
    sutro: filters.sutro,
    toaster: filters.toaster,
    walden: filters.walden,
    1977: filters.year1977,
    kelvin: filters.kelvin,
    maven: filters.maven,
    ginza: filters.ginza,
    skyline: filters.skyline,
    dogpatch: filters.dogpatch,
    brooklyn: filters.brooklyn,
    helena: filters.helena,
    ashby: filters.ashby,
    charmes: filters.charmes,
}

interface CropOptions {
    h: number,
    w: number,
    x?: number,
    y?: number
}

export default class ImageProccessesor {
    constructor() {

    }

    @logSystemError((err: Error) => {
        return {
            part: "watermark",
            error: err.message,
            isCritical: false,
            otherInfo: {
                function: "proccess"
            }
        } as unknown as any
    })
    static async proccess(baseDir: string, path: string, lable: string): Promise<ImageProccessingOutPut[]> {
        var paths: ImageProccessingOutPut[] = [];
        try {
            var p = path
            var ps: string[] = []
            ps.push(path)

            var waterMarkRepository = new WaterMarkRepository()
            var waterMarks = await waterMarkRepository.findOne({
                lable: lable
            }, {
                fromDb: true
            })
            if (waterMarks?.configs) {
                for (let i = 0; i < waterMarks?.configs.length; i++) {
                    let data = await this.waterMark(baseDir, path, waterMarks.configs[i])
                    // console.log("data", data)
                    paths.push({
                        name: "",
                        path: data
                    })
                }
            }
            await DiskFileManager.removeFiles(ps)
        }
        catch (error) {
            var pathsToDel = []
            for (let i = 0; i < paths.length; i++) {
                pathsToDel.push(paths[i].path)
            }
            try {
                await DiskFileManager.removeFiles(pathsToDel)
            } catch (err) {
                //log error
                throw err
            }
            throw error

        }
        return paths
    }

    static async proccessFromConfig(baseDir: string, pathh: string, configs: any[],
        customConfig?: any
    ) {
        var ps: string[] = []
        let paths: ImageProccessingOutPut[] = []
        var p = pathh

        let forWebP = []
        for (let i = 0; i < configs?.length; i++) {
            let newPath = await this.crop(baseDir, p, Object.assign(configs[i].resolotion, customConfig[configs[i].name]))

            let webP



            if (configs[i].compersionConfig.resultTypes?.includes("png")) {
                pathh = newPath
                pathh = await this.getPNG(baseDir, pathh, configs[i].compersionConfig)
                ps.push(pathh)

                await this.proccessResult(pathh, configs[i].compersionConfig)
                paths.push({
                    path: pathh,
                    name: "png" + "$" + configs[i].name
                })

                webP = pathh
            }



            if (configs[i].compersionConfig.resultTypes?.includes("jpg")) {
                pathh = newPath
                pathh = await this.getJpeg(baseDir, pathh, configs[i].compersionConfig)
                ps.push(pathh)

                await this.proccessResult(pathh, configs[i].compersionConfig)
                paths.push({
                    path: pathh,
                    name: "jpg" + "$" + configs[i].name
                })

                webP = pathh
            }


            forWebP.push(webP)
            DiskFileManager.removeFile(newPath)
        }

        for (let i = 0; i < configs?.length; i++) {

            let newPath = await this.crop(baseDir, p, Object.assign(configs[i].resolotion, customConfig[configs[i].name]))

            if (configs[i].compersionConfig.resultTypes?.includes("webp") && forWebP[i] != undefined) {

                pathh = newPath
                pathh = await this.getWebP(baseDir, forWebP[i] as string, {})
                ps.push(pathh)

                // await this.proccessResult(pathh, configs[i].compersionConfig)
                paths.push({
                    path: pathh,
                    name: "webp" + "$" + configs[i].name
                })
            }


            DiskFileManager.removeFile(newPath)
        }

        return paths
    }

    @logSystemError((err: Error) => {
        return {
            part: "watermark",
            error: err.message,
            isCritical: false,
            otherInfo: {
                function: "proccessResult"
            }
        } as unknown as any
    })
    static async proccessResult(
        p: string,
        waterMark: any
    ) {
        // return
        await new Promise(async (resolve, reject) => {
            var res = gmCli(p)
            if (waterMark.resultQuality)
                res = res.quality(waterMark.resultQuality)
            if (waterMark.resultAngle)
                res = res.rotate('#000000ff', waterMark.resultAngle)

            if (waterMark.flipVertical == true)
                res = res.flip()

            if (waterMark.flipHorizontal == true)
                res = res.flop()

            var i = undefined

            if (!p.endsWith(".webp") && waterMark.resultSize) {
                try {
                    i = await Jimp.read(p)
                    var h = Math.round((i.bitmap.height / i.bitmap.width) * waterMark.resultSize)
                    res = res.resize(50000, h)
                } catch (error) {

                }
            }

            await this.effect(p, waterMark)


            if (waterMark.filter && !p.endsWith(".png")) {
                await this.customFilter(p, waterMark.filter)
            }

            await this.border(p, waterMark)


            res.write(p, async function (err: any, stdout: any, stderr: any, command: any) {
                if (err) {
                    return reject(err)
                }
                return resolve(p)
            })
        })
    }


    static async refresh(baseDir: string, filepath: string, config: any): Promise<any> {
        var paths: ImageProccessingOutPut[] = [];
        try {
            if (config.configs) {
                var p = filepath
                for (let i = 0; i < config.configs.length; i++) {
                    let ex = p
                    p = await this.waterMark(baseDir, p, config.configs[i])
                    if (ex != filepath) {
                        DiskFileManager.removeFile(ex)
                    }
                    if (config.configs[i].diagonalLines) {

                        let ib = await Jimp.read(p)

                        var res = gmCli(p)
                        res = res.stroke(config.configs[i].diagonalLinesColor || "black", 4)

                        res = res.drawLine(0, 0, ib.bitmap.width, ib.bitmap.height)
                        res = res.drawLine(0, ib.bitmap.height, ib.bitmap.width, 0)

                        await new Promise((resolve, reject) => {
                            res.write(p, async function (err: any, stdout: any, stderr: any, command: any) {
                                if (err) {
                                    return reject(err)
                                }
                                return resolve(p)
                            })
                        })
                    }
                }
            }
            else {
                var respath = `${baseDir}${RandomGenarator.generateHash()}_output${path.extname(filepath)}`;
                var res = gmCli(filepath)
                await new Promise((resolve, reject) => {
                    res.write(respath, function (err: any, stdout: any, stderr: any, command: any) {
                        if (err) {
                            return reject(err)
                        }
                        resolve(respath)
                    })
                })
                p = respath
            }

            await this.proccessResult(p, config)
            return p
        }

        catch (error) {
            var pathsToDel = []
            for (let i = 0; i < paths.length; i++) {
                pathsToDel.push(paths[i].path)
            }
            try {
                await DiskFileManager.removeFiles(pathsToDel)
            } catch (err) {
                throw err
            }
            throw error

        }
    }

    static async apply(baseDir: string, path: string, config: string): Promise<any> {
        var paths: ImageProccessingOutPut[] = [];
        try {
            var p = path
            var ps: string[] = []
            ps.push(path)
            if (path.endsWith("png")) {
                path = await this.getPNG(baseDir, path, config)

                await this.proccessResult(path, config)
                paths.push({
                    path,
                    name: "png"
                })
            }


            else if (path.endsWith("jpg")) {
                path = p
                path = await this.getJpeg(baseDir, path, config)
                await this.proccessResult(path, config)
                paths.push({
                    path,
                    name: "jpg"
                })
            }
            await DiskFileManager.wirteStream(p, fs.createReadStream(path, {}))
            await DiskFileManager.removeFile(path)
        }
        catch (error) {
            var pathsToDel = []
            for (let i = 0; i < paths.length; i++) {
                pathsToDel.push(paths[i].path)
            }
            try {
                await DiskFileManager.removeFiles(pathsToDel)
            } catch (err) {
                //log error
                throw err
            }
            throw error

        }
        // return paths
    }

    @logSystemError((err: Error) => {
        return {
            part: "watermark",
            error: err.message,
            isCritical: false,
            otherInfo: {
                function: "getWebP"
            }
        } as unknown as any
    })
    private static async getWebP(baseDir: string, path: string, waterMark: any): Promise<any> {
        var respath = `${baseDir}${RandomGenarator.generateHash()}_output.webp`;
        try {

            var p = await this.waterMark(baseDir, path, waterMark)

            await new Promise((resolve, reject) => {
                var res = gmCli(p)

                res.write(respath, async function (err: any, stdout: any, stderr: any, command: any) {
                    if (err) {
                        return reject(err)
                    }
                    return resolve(respath)
                })
            })
            return respath
        } catch (error) {
            throw error
        }
    }


    private static async getJPGOnly(baseDir: string, path: string): Promise<string> {
        var respath = `${path.replace(".webp", "")}.jpg`;
        try {


            await new Promise((resolve, reject) => {
                var res = gmCli(path)

                res.write(respath, async function (err: any, stdout: any, stderr: any, command: any) {
                    if (err) {
                        return reject(err)
                    }
                    return resolve(respath)
                })
            })
            return respath
        } catch (error) {
            throw error
        }
    }
    static async getDimensions(path: string) {
        return new Promise<gm.Dimensions>((resolve, reject) => {
            gmCli(path).size((err, dimensions) => {
                if (err)
                    reject(err)
                resolve(dimensions)
            })
        })
    }
    static async crop(baseDir: string, p: string, options: CropOptions) {
        try {
            let respath = `${baseDir}${RandomGenarator.generateHash()}.${path.extname(p)}`;
            var res = gmCli(p)
            let dimensions = await this.getDimensions(p)

            let heightRate = dimensions.height / options.h
            let widthRate = dimensions.width / options.w
            let target = {
                h: options.h,
                w: options.w
            }
            if (widthRate > heightRate) {
                target.h = dimensions.height
                target.w = Math.floor(target.w * (heightRate))
            }
            else {
                target.w = dimensions.width
                target.h = Math.floor(target.h * (widthRate))
            }
            if (options.x != undefined && options.y != undefined)
                res = res.crop(target.w, target.h, options.x, options.y)
            else
                res = res.crop(target.w, target.h, Math.floor((dimensions.width - target.w) / 2), Math.floor((dimensions.height - target.h) / 2))

            res.resize(options.w, options.h)

            return new Promise<string>((resolve, reject) => {
                res.write(respath, async function (err: any, stdout: any, stderr: any, command: any) {
                    if (err) {
                        console.log("err", respath)
                        return reject(err)
                    }
                    return resolve(respath)
                })
            })

        } catch (error) {
            throw error
        }
    }

    @logSystemError((err: Error) => {
        return {
            part: "watermark",
            error: err.message,
            isCritical: false,
            otherInfo: {
                function: "getPNG"
            }
        } as unknown as any
    })
    private static async getPNG(baseDir: string, path: string, waterMark: any): Promise<any> {
        var respath = `${baseDir}${RandomGenarator.generateHash()}_output.png`;
        try {

            var p = await this.waterMark(baseDir, path, waterMark)

            await new Promise((resolve, reject) => {
                var res = gmCli(p)

                res.write(respath, async function (err: any, stdout: any, stderr: any, command: any) {
                    if (err) {
                        return reject(err)
                    }
                    return resolve(respath)
                })
            })
            return respath
        }
        catch (error) {
            throw error
        }
    }

    @logSystemError((err: Error) => {
        return {
            part: "watermark",
            error: err.message,
            isCritical: false,
            otherInfo: {
                function: "getJpeg"
            }
        } as unknown as any
    })
    private static async getJpeg(baseDir: string, path: string, waterMark: any): Promise<any> {
        var respath = `${baseDir}${RandomGenarator.generateHash()}_output.jpg`;
        try {

            var p = await this.waterMark(baseDir, path, waterMark)
            await new Promise((resolve, reject) => {
                var res = gmCli(p)

                res.write(respath, async function (err: any, stdout: any, stderr: any, command: any) {
                    if (err) {
                        return reject(err)
                    }
                    return resolve(respath)
                })
            })
            return respath
        }
        catch (error) {
            throw error
        }
    }

    @logSystemError((err: Error) => {
        return {
            part: "watermark",
            error: err.message,
            isCritical: false,
            otherInfo: {
                function: "resize"
            }
        } as unknown as any
    })
    static async resize(baseDir: string, path: string, extName: string = "png", x: number = 150, y: number = 150, options?: ResizeOption): Promise<any> {
        var respath = `${baseDir}${RandomGenarator.generateHash()}_resize_output.${extName}`;
        return new Promise((resolve, reject) => {
            gmCli(path)
                .quality(100)
                .resize(x, y, options)
                .write(respath, function (err: any, stdout: any, stderr: any, command: any) {
                    if (err) {
                        return reject(err)
                    }
                    return resolve(respath)
                })
        })
    }


    static async resizeAndRename(baseDir: string, imagePath: string, options: {
        x: number,
        q: number,
        suffixs: string[],
        mobile: boolean,
        watermark: any
    }): Promise<any> {
        let img = await DiskFileManager.downloadFile(imagePath)


        if (img.endsWith(".webp")) {
            let delImg = img
            img = await this.getJPGOnly("src/uploads/tmp/", img)

            try {
                await DiskFileManager.removeFile(delImg)
            } catch (error) {

            }
        }

        let delImg = img




        let resolution = await this.getDimensions(img)


        let y = Math.floor((resolution.height * options.x) / resolution.width)


        let baseName = path.basename(img)

        let names = baseName.split(".")

        if (options.mobile) {
            names[names.length - 2] = `${names[names.length - 2]}-mb-${options.x}x${y}`
        }
        else {
            names[names.length - 2] = `${names[names.length - 2]}-${options.x}x${y}`
        }

        let results: string[] = []


        for (let j = 0; j < options.suffixs.length; j++) {

            names[names.length - 1] = options.suffixs[j]
            let respath = `${baseDir}/${names.join(".")}`


            let i = img
            for (let z = 0; options.watermark != null && options.watermark != undefined && options.watermark.configs != undefined && z < options.watermark.configs.length; z++) {
                let ext = i
                i = await this.waterMark("temp/", i, { ...options.watermark.configs[z] })
            }

            if (options.watermark != null && options.watermark != undefined) {
                await this.proccessResult(i, options.watermark)
            }


            respath = respath.replace("//", "/")



            await new Promise((resolve, reject) => {
                gmCli(i)
                    .quality(options.q)
                    .resize(options.x)
                    .write(respath, function (err: any, stdout: any, stderr: any, command: any) {

                        if (err) {

                            return reject(err)
                        }
                        return resolve(respath)
                    })
            })


            results.push(respath)

            try {
                await DiskFileManager.removeFile(i)
            } catch (error) {

            }
        }

        try {
            await DiskFileManager.removeFile(delImg)
        } catch (error) {

        }


        return results
    }

    @logSystemError((err: Error) => {
        return {
            part: "watermark",
            error: err.message,
            isCritical: false,
            otherInfo: {
                function: "waterMark"
            }
        } as unknown as any
    })
    private static async waterMark(baseDir: string, path: string, waterMark: any): Promise<any> {
        if (waterMark.type == waterMarkType.image) {
            try {
                return await this.makeWaterMarkImage(baseDir, path, waterMark)
            } catch (error) {
                throw error
            }
        }

        else {
            if (waterMark.imageAddress != undefined && waterMark.imageAddress != null) {
                try {
                    return await this.makeWaterMarkImage(baseDir, path, waterMark)
                } catch (error) {
                    throw error
                }
            }
            else {
                try {
                    return await this.makeWaterMarkText(baseDir, path, waterMark)
                } catch (error) {
                    throw error
                }
            }

        }
    }


    @logSystemError((err: Error) => {
        return {
            part: "watermark",
            error: err.message,
            isCritical: false,
            otherInfo: {
                function: "makeWaterMarkText"
            }
        } as unknown as any
    })
    static async makeWaterMarkText(baseDir: string, path: string, waterMark: WaterMarkConfig) {
        try {
            if (!waterMark.text)
                return path
            var tempName = `temp_${Date.now()}.png`
            var italic = waterMark.italic ? "italic " : ""
            var bold = waterMark.bold ? "bold " : ""
            var underline = waterMark.underline ? "underline " : ""


            var font = waterMark.fontName as string
            let fonts = font?.split("/")
            font = fonts[fonts?.length - 1].split(".")[0]

            await DiskFileManager.writeFile(`src/uploads/${tempName}`, text2png(waterMark.text,
                {

                    backgroundColor: waterMark.backgroundColor,
                    strokeWidth: waterMark.strokeWidths,
                    strokeColor: waterMark.strokeColor,
                    shadowColor: waterMark.shadowColor,
                    shadowBlur: waterMark.shadowBlur,
                    shadowOffsetX: waterMark.shadowOffsetX,
                    shadowOffsetY: waterMark.shadowOffsetY,
                    underline: waterMark.underline,
                    color: waterMark.fontColor,
                    font: `${italic}${bold} ${underline}${waterMark.fontSize}px ${font}`,
                    fontSize: waterMark.fontSize,
                    padding: 8,
                    localFontPath: `src/fonts${waterMark.fontName}`,
                    localFontName: `${font}`,
                    textAlign: waterMark.textAlign,
                    lineSpacing: waterMark.lineSpacing,
                    wordSpacing: waterMark.wordSpacing,

                }))
            if (waterMark.angle) {
                await new Promise((resolve, reject) => {
                    gm(`src/uploads/${tempName}`)
                        .rotate("transparent", waterMark.angle as number)
                        .write(`src/uploads/${tempName}`, function (err, stdout, stderr, command) {
                            if (err) {
                                return reject(err)
                            }
                            return resolve(`src/uploads/${tempName}`)
                        })
                })
            }

            var wmPath = await this.transparency(waterMark, `src/uploads/${tempName}`)
            var respath = await this.makeWaterMark(baseDir, path, wmPath, Object.assign({
                gravity: waterMark.gravity,
                position_x: waterMark.position_x,
                position_y: waterMark.position_y,
                x: 0,
                y: 0
            }, JSON.parse(JSON.stringify(waterMark))))
            await DiskFileManager.removeFiles([
                wmPath,
            ])
            return respath
        } catch (error) {
            throw error
        }
    }

    static async makeWatermarks(img: string, waterMarks: any[], baseDir?: string) {
        let temp = img
        let result
        let deleteList = []
        for (let i = 0; i < waterMarks.length; i++) {

            result = await this.waterMark(baseDir || "src/uploads/", temp, { ...waterMarks[i] })
            deleteList.push(temp)
            temp = result

        }

        for (let i = 0; i < deleteList.length; i++) {
            try {
                await DiskFileManager.removeFile(deleteList[i])
            } catch (error) {

            }
        }

        return result || img
    }

    @logSystemError((err: Error) => {
        return {
            part: "watermark",
            error: err.message,
            isCritical: false,
            otherInfo: {
                function: "makeWaterMarkImage"
            }
        } as unknown as any
    })
    static async makeWaterMarkImage(baseDir: string, p: string, waterMark: any) {
        var wmDimensions = await this.calculateWaterMarkDimentions(p, waterMark.imageAddress as string
            , waterMark.waterMarkSizeType == "relative", waterMark.waterMarkSize as number)
        if (waterMark.imageAddress.startsWith("http")) {
            waterMark.imageAddress = await DiskFileManager.downloadFile(waterMark.imageAddress, "src/uploads/tmp/")
        }

        var wpath = await this.resize(baseDir, waterMark.imageAddress, "png", wmDimensions.x || waterMark.x, wmDimensions.y || waterMark.y, "!")
        DiskFileManager.removeFile(waterMark.imageAddress)



        await new Promise((resolve, reject) => {
            gm(wpath as string)
                .rotate("transparent", waterMark.angle).
                write(wpath, function (err, stdout, stderr, command) {
                    if (err) {
                        return reject(err)
                    }
                    return resolve(waterMark.imageAddress as string)
                })
        })
        // }

        var wmPath = await this.transparency(waterMark, wpath)
        delete waterMark['x']
        delete waterMark['y']


        var respath = await this.makeWaterMark(baseDir, p,
            wmPath, Object.assign({
                position_x: waterMark.position_x,
                position_y: waterMark.position_y,
                x: 0,
                y: 0
            }, JSON.parse(JSON.stringify(waterMark))))
        await DiskFileManager.removeFiles([
            wmPath,
            // p
        ])


        return respath
    }

    @logSystemError((err: Error) => {
        return {
            part: "watermark",
            error: err.message,
            isCritical: false,
            otherInfo: {
                function: "makeConfig"
            }
        } as unknown as any
    })
    static async makeConfig(baseDir: string, p: string, waterMark: any) {
        await this.effect(p, waterMark)
        return p
    }


    @logSystemError((err: Error) => {
        return {
            part: "watermark",
            error: err.message,
            isCritical: false,
            otherInfo: {
                function: "transparency"
            }
        } as unknown as any
    })
    static async transparency(waterMark: WaterMarkConfig, path: string): Promise<string> {
        if (waterMark.transparency == undefined) {
            return path
        }
        var image = await Jimp.read(path)
        var paths = path.split(".")
        paths = paths.slice(0, paths.length)
        path = paths.join('.') + ".png"
        return new Promise((resolve, reject) => {
            image.opacity(waterMark.transparency as number * 0.01)
                .write(path, function (err) {
                    if (err) {
                        return reject(err)
                    }
                    return resolve(path)
                });
        })
    }

    @logSystemError((err: Error) => {
        return {
            part: "watermark",
            error: err.message,
            isCritical: false,
            otherInfo: {
                function: "transparencyAndResize"
            }
        } as unknown as any
    })
    static async transparencyAndResize(waterMark: WaterMarkConfig, path: string, dimension: Dimension): Promise<string> {
        if (waterMark.transparency == undefined) {
            return path
        }
        var image = await Jimp.read(path)
        var paths = path.split(".")
        paths = paths.slice(0, paths.length)
        path = paths.join('') + ".png"
        return new Promise((resolve, reject) => {
            image.opacity(waterMark.transparency as number * 0.01)
                .resize(dimension.x || 0, dimension.y || 0)
                .write(path, function (err) {
                    if (err) {
                        return reject(err)
                    }
                    return resolve(path)
                });
        })
    }


    @logSystemError((err: Error) => {
        return {
            part: "watermark",
            error: err.message,
            isCritical: false,
            otherInfo: {
                function: "calculateWaterMarkDimentions"
            }
        } as unknown as any
    })
    private static async calculateWaterMarkDimentions(imgPath: string, waterMarkPath: string, isPercent: Boolean, value: number): Promise<Dimension> {
        if (isPercent) {
            return new Promise((resolve, reject) => {
                gmCli(imgPath)
                    .size(function (err, dimensions) {
                        if (err) {
                            return reject(err)
                        }
                        gmCli(waterMarkPath)
                            .size(function (err, wmDimensions) {
                                if (err) {
                                    return reject(err)
                                }
                                var resWidth = Math.round(value * dimensions.width)
                                var resHight = Math.round((resWidth / wmDimensions.width) * wmDimensions.height)
                                return resolve({
                                    x: resWidth,
                                    y: resHight
                                })
                            })
                    })
            })
        }

        else {
            return {
                x: 0,
                y: 0
            }
        }

    }

    @logSystemError((err: Error) => {
        return {
            part: "watermark",
            error: err.message,
            isCritical: false,
            otherInfo: {
                function: "makeWaterMark"
            }
        } as unknown as any
    })
    static async makeWaterMark(baseDir: string
        , p: string, waterMarkPath: string, config: any) {

        var respath = `${baseDir}${RandomGenarator.generateHash()}_waterMark_output${path.extname(p)}`;

        if (config.tile) {
            var image = await Jimp.read(p)
            let wm_img = await loadImage(waterMarkPath)
            var res = gmCli(p)
            for (let i = 0; i < image.bitmap.width; i += config.tile + wm_img.width) {
                for (let j = 0; j < image.bitmap.height; j += config.tile + wm_img.height) {
                    res = res.draw(`image Over ${i},${j},${config.x},${config.y} "${waterMarkPath}"`)
                }
            }
            var pp = await new Promise((resolve, reject) => {
                res.write(respath, function (err: any, stdout: any, stderr: any, command: any) {

                    if (err) {
                        return reject(err)
                        console.log(err)
                    }
                    resolve(respath)
                });
            })
        }
        else {
            let dimension = await this.getDimensions(p)
            config.position_x = config.position_x * dimension.width
            config.position_y = config.position_y * dimension.height

            var pp = await new Promise((resolve, reject) => {
                var res = gmCli(p)
                    .draw(`image Over ${config.position_x || 0},${config.position_y || 0},${config.x || 0},${config.y || 0} "${waterMarkPath}"`)

                res.write(respath, function (err: any, stdout: any, stderr: any, command: any) {

                    if (err) {
                        return reject(err)
                        console.log(err)
                    }
                    resolve(respath)
                });
            })
        }
        return pp
    }

    @logSystemError((err: Error) => {
        return {
            part: "watermark",
            error: err.message,
            isCritical: false,
            otherInfo: {
                function: "tileWaterMark"
            }
        } as unknown as any
    })
    static async tileWaterMark(
        p: string, waterMarkPath: string,
        x: number, y: number, image: any
    ) {

    }

    @logSystemError((err: Error) => {
        return {
            part: "watermark",
            error: err.message,
            isCritical: false,
            otherInfo: {
                function: "effect"
            }
        } as unknown as any
    })
    static async effect(p: string, config: any) {
        try {
            if (config.filter) {
                await this.customFilter(p, config.filter)
            }

            else {
                if (p.includes(".webp")) {
                    return
                }
                var image = await Jimp.read(p)
                if (config.contrast) {
                    image = await new Promise((resolve, reject) => {
                        image.contrast(config.contrast, function (err) {
                            resolve(image)
                        })
                    })

                }
                if (config.brightness) {
                    image = await new Promise((resolve, reject) => {
                        image.brightness(config.brightness, function (err) {
                            resolve(image)
                        })
                    })

                }
                if (config.grayscale == true) {
                    image = await new Promise((resolve, reject) => {
                        image.grayscale(function (err) {
                            resolve(image)
                        })
                    })

                }
                if (config.sepia == true) {
                    image = await new Promise((resolve, reject) => {
                        image.sepia(function (err) {
                            resolve(image)
                        })
                    })
                }

                await new Promise((resolve, reject) => {
                    image.write(p, function (err) {
                        resolve(image)
                    })
                })

            }

        } catch (error) {
            throw error
        }
    }

    @logSystemError((err: Error) => {
        return {
            part: "watermark",
            error: err.message,
            isCritical: false,
            otherInfo: {
                function: "customFilter"
            }
        } as unknown as any
    })
    static async customFilter(p: string, filter: string) {
        var canvas = createCanvas(0, 0);
        var ctx = canvas.getContext("2d");

        var image = await loadImage(p)
        canvas.width = image.width
        canvas.height = image.height

        ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight)

        var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

        var operation = filterConfig[filter]
        var filteredPixels = operation()(pixels);

        ctx.putImageData(filteredPixels, 0, 0);

        await DiskFileManager.wirteStream(p, canvas.createJPEGStream())

    }

    @logSystemError((err: Error) => {
        return {
            part: "watermark",
            error: err.message,
            isCritical: false,
            otherInfo: {
                function: "border"
            }
        } as unknown as any
    })
    static async border(p: string, config: any) {
        return new Promise(async (resolve, reject) => {
            var image = await Jimp.read(p)
            var image_gm = gm(p)
                .fill(config.borderColor || 'white')
            // .stroke("#6C68FF", 1)

            if (config.borderLeft) {
                image_gm = image_gm.drawRectangle(0, 0, config.borderLeft, image.bitmap.height)
            }

            if (config.borderRight) {
                image_gm = image_gm.drawRectangle(image.bitmap.width - config.borderRight, 0, image.bitmap.width, image.bitmap.height)
            }

            if (config.borderTop) {
                image_gm = image_gm.drawRectangle(0, 0, image.bitmap.width, config.borderTop)
            }

            if (config.borderBotton) {
                image_gm = image_gm.drawRectangle(0, image.bitmap.height - config.borderBotton, image.bitmap.width, image.bitmap.height)
            }
            image_gm.write(p, function (err, stdout, stderr, command) {
                resolve(p)
            })
        })
    }


}

async function makeSamples() {
    var res = gmCli("src/uploads/filters/original.jpg")

    res = res.resize(50000, 178)

    var paths: string[] = []

    res.write("src/uploads/filters/original.jpg", async function (err: any, stdout: any, stderr: any, command: any) {
        for (const key in filterConfig) {
            fs.copyFileSync("src/uploads/filters/original.jpg", `src/uploads/filters/${key}.jpg`)
            await ImageProccessesor.customFilter(`src/uploads/filters/${key}.jpg`, key)
            paths.push(`2.187.100.179:5000/uploads/filters/${key}.jpg`)

        }
        fs.writeFileSync(`src/uploads/filters.json`, JSON.stringify(paths))
    })

}


// makeSamples()





