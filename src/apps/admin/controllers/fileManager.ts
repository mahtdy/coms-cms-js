import {FileManager} from "../../../core/mongoose-controller/controllers/fileManager";
import {Request,Response, NextFunction } from "express";
import { AdminInfo } from "../../../core/mongoose-controller/auth/admin/admin-logIn";
import upload from "../../../core/express/middlewares/uploader";

var fileManager = new FileManager("/fileManager")

declare module 'express' {
    export interface Request {
        session: any;
        files: {
            [k: string]: any;
        },
        rawBody?: string,
        jsonBody?: object
    }
}
fileManager.verifyUpload = async function(req: Request, res: Response, next: NextFunction): Promise<Response | undefined>  {
    try {
        var admin : AdminInfo = req.session['admin']
        var fileManager = req.session["fileManager"]

        let directory = req.query.directory

        if(fileManager == undefined){
            next(new Error("file manger not found"))
            return
        }
        var config = await this.fileManagerPermission.findOne({
            admin: admin._id,
            cdn: fileManager._id,
            // pathsPermission
        })
        if (admin.isSuperAdmin) {
            // console.log(req.body)
            var exec = upload([
                {
                    name: "file",
                    maxCount: 10,
                    size: parseInt((100.5 * 1048576).toString(), 10),
                    // types: ["pdf"]
                }
            ])
            exec(req, res, next)
            return
        }
        if (config == null) {
            var exec = upload([
                {
                    name: "file",
                    maxCount: 10,
                    size: parseInt((100.5 * 1048576).toString(), 10),
                    // types: ["pdf"]
                }
            ])
            exec(req, res, next)
            return
        }
        
        var exec = upload([
            {
                name: "file",
                maxCount: 10,
                size: parseInt((config.size * 1048576).toString(), 10),
                types: config.uploadTypes
                // types: ["pdf"]
            }
        ])
        exec(req, res, next)
        return


    } catch (error) {
        next(error)
        return
    }
} 
fileManager.addRoute("/upload" , "post" , fileManager.upload.bind(fileManager), {
    preExecs : fileManager.getCheckAccsess("upload"),
    middlewares : [fileManager.verifyUpload.bind(fileManager)],
    // contentType : "multipart/form-data"
} )

// console.log("query",fileManager.getPathQuery("conetet/test/1/2/" , "view")['$or'])

export default fileManager