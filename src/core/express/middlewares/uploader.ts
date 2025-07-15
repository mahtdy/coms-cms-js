import multer, { MulterError } from "multer"
import { Request, Response, NextFunction, RequestHandler } from "express"
import path from "path"
import CDN_Manager, { CDN_File_Path } from "../../services/fileManager";
// import path from "path"
declare module 'express' {
    export interface Request {
        [k: string]: any;
        rawBody?: string,
        jsonBody?: object
    }
    export interface Response {
        [k: string]: any;
    }
}

export type fileType =
    "jpg" |
    "jpeg" |
    "webp" |
    "zip" |
    "pdf" |
    "json" |
    "png" |
    "mp3" |
    "m4a" |
    "wav" |
    "mp4" |
    "csv" |
    "xlsx"


interface UploadConfig {
    name: string,
    types?: string[] | string,
    size?: number,
    maxCount: number,
    rename?: boolean,
    dest?: string
}

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

async function execute(execution: RequestHandler) {
    return (req: Request, res: Response, next: NextFunction) => {
        execution(req, res, next)
    };
}


export default function upload(config: UploadConfig[]) {

    return (req: Request, res: Response, next: NextFunction) => {
        // console.log("ccc",config)
        // console.log("file",config)
        // console.log("body",req.files)
        // if(req.files == undefined){
        //     console.log("body" ,req.body)
        //     return multer().any()(req,res,next)
        // }
        // console.log("ddd" , req.files)

        var uploader = multer({
            fileFilter: function (req: Request, file, cb) {
                const index = config.findIndex((elem) => {
                    return file.fieldname == elem.name
                })
                // for (let i = 0; i < config.length; i++) {
                //     console.log("file12",file)
                if (config[index].types) {
                    var ext = path.extname(file.originalname);
                    if (config[index].types?.includes(ext.substr(1))) {
                        cb(null, true)
                    }
                    else {
                        req.fileValidationErr = new MulterError("LIMIT_UNEXPECTED_FILE")
                        return cb(null, false)
                        // throw new M
                        // cb()
                        // return false
                        // throw 
                    }
                }
                else {
                    cb(null, true)
                }
                // }

            },
            storage: multer.diskStorage({
                filename: function (req: Request, file, cb) {
                    var name = config[0].rename ? Date.now() + path.extname(file.originalname) : file.originalname
                    cb(null, name)
                },
                destination: function (req, file, cb) {
                    cb(null, config[0].dest || "src/uploads/")
                },

            }),
            limits: {
                fileSize: config[0].size || 50000000000000,

            }


        })
        uploader.fields(config)(req, res, function (error: any) {
            if (error != undefined) {
                next(error)
                // next()
                return
            }
            if (req.fileValidationErr) {
                next(req.fileValidationErr)
                return
            }
            next()
            return
        })

    }
}

export function mapUploadsToBody(name: string | string[], toSplitName?: string) {

    return (req: Request, res: Response, next: NextFunction) => {

        if (req.files == undefined) {
            // console.log("body" ,req.body)
            next()
            return
        }
        if (typeof name == "string") {
            if (req.files != undefined && req.files[name]?.length > 0) {
                // console.log(req.files[name][0])
                req.body[name] = req.files[name][0].path

            }
            if (toSplitName != undefined && req.body[toSplitName] != undefined) {
                req.body[toSplitName] = req.body[toSplitName].split(",")
            }
            next()
            return
        }
        else {
            for (let i = 0; i < name.length; i++) {
                if (req.files != undefined && req.files[name[i]] != undefined && req.files[name[i]]?.length > 0) {
                    req.body[name[i]] = req.files[name[i]][0].path
                }
                if (toSplitName != undefined && req.body[toSplitName] != undefined) {
                    req.body[toSplitName] = req.body[toSplitName].split(",")
                }
            }
            next()
            return
        }

    };

}



interface CDNOptions {
    path?: string | Function,
    server?: string,
    customServer?: {
        type: "objectStorage" | "ftp",
        config: any,
        hostUrl: string,
        id: string
    } | Function,
    uploadWithState?: boolean
}
export function moveFilesToCDN(name: string | string[], options?: CDNOptions) {

    return async (req: Request, res: Response, next: NextFunction) => {

        if (req.files) {
            var cdn
            if (options?.customServer) {
                cdn = new CDN_Manager()
                if (typeof options.customServer == "function") {
                    // console.log(await options.customServer())
                    cdn.initFromConfig(await options.customServer())
                }
                else
                    cdn.initFromConfig(options.customServer)
            }
            else {
                options?.server ? cdn = new CDN_Manager(options?.server) : cdn = new CDN_Manager()
            }

            req.cdn_conf = cdn.getConfig()


            let cdnPath = ""
            if (options?.path != undefined) {
                if (typeof options.path == "string") {
                    cdnPath = options.path
                }
                else {
                    try {
                        cdnPath = await options.path()
                    } catch (error) {

                    }
                }
            }

            if (typeof name == "string") {
                try {
                    if (req.files != undefined && req.files[name] != undefined && req.files[name].length > 0) {
                        
                        if (req.files[name].length == 1) {
                            var destinationPath = req.files[name][0].path.split("/")
                            if (options?.uploadWithState) {
                                req.body[name] = await cdn.uploadWithState(req.files[name][0].path,
                                    cdnPath + destinationPath[destinationPath.length - 1])
                            }
                            else {
                                req.body[name] = await cdn.upload(req.files[name][0].path,
                                    cdnPath + destinationPath[destinationPath.length - 1])
                            }
                        }
                        else {
                            var urls = []
                            for (let i = 0; i < req.files[name].length; i++) {
                                var destinationPath = req.files[name][i].path.split("/")
                                req.destinationPath = cdnPath + destinationPath[destinationPath.length - 1]
                                if (options?.uploadWithState) {
                                    let f = await cdn.uploadWithState(req.files[name][i].path,
                                        cdnPath + destinationPath[destinationPath.length - 1])
                                    urls.push(f)
                                }
                                else {
                                    let f = await cdn.upload(req.files[name][i].path,
                                        cdnPath + destinationPath[destinationPath.length - 1])
                                    urls.push(f)
                                }
                            }
                            req.body[name] = urls

                        }
                        // console.log(req.body)
                    }
                    next()
                    return
                } catch (error) {
                    next(error)
                    return
                }
            }
            else {
                var paths: CDN_File_Path[] = []
                var pathsToDelete: string[] = []
                for (let i = 0; i < name.length; i++) {
                    if (req.files != undefined && req.files[name[i]] != undefined && req.files[name[i]].length > 0) {
                        var destinationPath = req.files[name[i]][0].path.split("/")
                        req.destinationPath = cdnPath + destinationPath[destinationPath.length - 1]
                        if (options?.uploadWithState) {
                            req.body[name[i]] = await cdn.uploadWithState(req.files[name[i]][0].path, cdnPath + destinationPath[destinationPath.length - 1])
                        }
                        else {
                            req.body[name[i]] = await cdn.upload(req.files[name[i]][0].path, cdnPath + destinationPath[destinationPath.length - 1])
                        }


                    }

                }
                next()
                return
            }
        }
        next()
        return



    };

}
