import Application, { PostExec, PreExecs, Route } from "./application";
import express, { Express, NextFunction, Request, Response as ExpressResponse} from 'express';
import { Response } from "./controller";
import { RouteMeta } from "./decorators/parameters";
import { logAction } from "./express/logger";
import upload, { mapUploadsToBody, moveFilesToCDN } from "./express/middlewares/uploader";

import UserAuthenticator from "./mongoose-controller/auth/user/userAuthenticator"
import { ContentPart } from "./part/content";
import http from "http";




const dataParser: any = {
    "body": function (req: Request, res: ExpressResponse, next: NextFunction, destination?: string) {
        return destination != undefined ? req.body[destination] : req.body
    },
    "files": function (req: Request, res: ExpressResponse, next: NextFunction, destination?: string) {
        var ff = req.files as any
        return destination != undefined ? ff[destination] : {}
    },
    "query": function (req: Request, res: ExpressResponse, next: NextFunction, destination?: string) {

        return destination != undefined && destination != "params" ? req.query[destination] : req.query
    },
    "param": function (req: Request, res: ExpressResponse, next: NextFunction, destination?: string) {
        return destination != undefined ? req.params[destination] : req.params
    },
    "req": function (req: Request, res: ExpressResponse, next: NextFunction, destination?: string) {
        return req
    },
    "res": function (req: Request, res: ExpressResponse, next: NextFunction, destination?: string) {
        return res
    },
    "next": function (req: Request, res: ExpressResponse, next: NextFunction, destination?: string) {
        return next
    },
    "session": function (req: Request, res: ExpressResponse, next: NextFunction, destination?: string) {
        return req.session
    },
    "ip": function (req: Request, res: ExpressResponse, next: NextFunction, destination?: string) {
        return req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress
    },
    "admin": function (req: Request, res: ExpressResponse, next: NextFunction, destination?: string) {
        var ss = req.session as any
        return ss.admin
    },
    "user": function (req: Request, res: ExpressResponse, next: NextFunction, required?: boolean) {
        var token = req.header("auth-token");
        var userAuthenticator = new UserAuthenticator()
        try {
            var verify = userAuthenticator.isAuthenticate(token || "");
            if (typeof verify == typeof "") {

            }
            return verify
        } catch (error) {
            if (required == false)
                return undefined
            throw error
        }
    },
    "header": function (req: Request, res: ExpressResponse, next: NextFunction, destination?: string) {

        return req.header(destination || "");
    },
    "fromReq": function (req: Request, res: ExpressResponse, next: NextFunction, destination?: string) {
        return req[destination || ""]
    },
}



export default class ExpressApplication extends Application {
    private static instance: ExpressApplication;
    app: Express
    constructor() {
        super()
        this.app = express()
        let contentPart = ContentPart.setInstance(this)
    }

    public static getInstance(): ExpressApplication {
        if (!ExpressApplication.instance) {
            ExpressApplication.instance = new ExpressApplication();
        }
        return ExpressApplication.instance;
    }

    async bootstarp(port: number): Promise<any> {
        try {
            await this.preServe()
            this.serve()
            // this.app.listen(port, "0.0.0.0")
            console.log("runned")
            var httpServer = http.createServer(this.app);
            console.log(`listening on port ${port}`)
            httpServer.listen(port, () => {
                // connectionQueue()
            })
            return httpServer
        } catch (error) {
            console.log("errror", error)

        }
    }

    serve() {
        for (let i = 0; i < this.parts.length; i++) {
            let routes = this.parts[i].serve()

            for (let j = 0; j < routes.length; j++) {
                if (routes[j].meta?.files) {
                    let files = routes[j].meta?.files
                    let filesToup: any[] = []
                    for (let z = 0; z < files.length; z++) {
                        if (files[z].skip) {
                            continue
                        }
                        filesToup.push(files[z])
                    }
                    if (filesToup.length > 0) {
                        this.app.post(routes[j].route, upload(filesToup))
                    }
                    for (let z = 0; z < files.length; z++) {
                        if (files[z].skip) {
                            continue
                        }
                        if (files[z].mapToBody) {
                            this.app.use(routes[j].route, mapUploadsToBody(files[z].name))
                        }

                        if (files[z].moveFilesToCDN) {
                            this.app.use(routes[j].route, moveFilesToCDN(files[z].name, files[z].moveFilesToCDN.config))
                        }
                    }
                }
                if (routes[j].middlewares != undefined) {
                    this.app.use(routes[j].route, routes[j].middlewares || [])
                }


                // if(routes[j].route == "/user/ticket/message" && routes[j].method =="post"){
                //     console.log(routes[j].meta)
                // }

                var handler = new RequestHandler(routes[j].execs, routes[j].meta?.params, routes[j].preExecs, routes[i].postExec)
                var func = handler.handle(routes[j].execs, routes[j].meta?.params, routes[j].preExecs)

                switch (routes[j].method) {
                    case "post":
                        this.app.post(routes[j].route, func as any)
                        break;

                    case "get":
                        this.app.get(routes[j].route, func as any)
                        break;

                    case "delete":
                        this.app.delete(routes[j].route, func as any)
                        break;

                    case "put":
                        this.app.put(routes[j].route, func as any)
                        break;


                    default:
                        break;
                }

            }
        }

        this.servePlugins()

    }

    servePlugins() {
        for (let i = 0; i < this.plugins.length; i++) {
            let routes = this.plugins[i].serve()
            for (let j = 0; j < routes.length; j++) {



                if (routes[j].meta?.files) {
                    let files = routes[j].meta?.files
                    for (let z = 0; z < files.length; z++) {
                        if (files[z].skip) {
                            continue
                        }
                        this.app.use(routes[j].route, upload([
                            files[z]
                        ]))
                        if (files[z].mapToBody) {
                            this.app.use(routes[j].route, mapUploadsToBody(files[z].name))
                        }

                        if (files[z].moveFilesToCDN) {
                            this.app.use(routes[j].route, moveFilesToCDN(files[z].name, files[z].moveFilesToCDN.config))
                        }
                    }
                }

                if (routes[j].middlewares != undefined)
                    this.app.use(routes[j].route, routes[j].middlewares || [])

                var handler = new RequestHandler(routes[j].execs, routes[j].meta?.params, routes[j].preExecs, routes[j].postExec)
                var func = handler.handle(routes[j].execs, routes[j].meta?.params, routes[j].preExecs)


                switch (routes[j].method) {
                    case "post":
                        this.app.post(routes[j].route, func as any)
                        break;

                    case "get":
                        this.app.get(routes[j].route, func as any)

                        break;

                    case "delete":
                        this.app.delete(routes[j].route, func as any)

                        break;

                    case "put":
                        this.app.put(routes[j].route, func as any)

                        break;

                    default:
                        break;
                }

            }
        }
    }

    getRoute() {
        let routes: Route[]
        for (let i = 0; i < this.parts.length; i++) {

        }
    }

    addRoute(route: Route) {
        if (route.meta?.files) {
            let files = route.meta?.files
            let filesToup: any[] = []
            for (let z = 0; z < files.length; z++) {
                if (files[z].skip) {
                    continue
                }
                filesToup.push(files[z])
            }
            if (filesToup.length > 0)
                this.app.use(route.route, upload(filesToup))
            for (let z = 0; z < files.length; z++) {
                if (files[z].skip) {
                    continue
                }
                if (files[z].mapToBody) {
                    this.app.use(route.route, mapUploadsToBody(files[z].name))
                }

                if (files[z].moveFilesToCDN) {
                    this.app.use(route.route, moveFilesToCDN(files[z].name, files[z].moveFilesToCDN.config))
                }
            }
        }
        if (route.middlewares != undefined) {
            this.app.use(route.route, route.middlewares || [])
        }


        // if(route.route == "/user/ticket/message" && route.method =="post"){
        //     console.log(route.meta)
        // }
        var handler = new RequestHandler(route.execs, route.meta?.params, route.preExecs, route.postExec)

        var func = handler.handle(route.execs, route.meta?.params, route.preExecs)

        switch (route.method) {
            case "post":
                this.app.post(route.route, func as any)
                break;

            case "get":
                this.app.get(route.route, func as any)
                break;

            case "delete":
                this.app.delete(route.route, func as any)
                break;

            case "put":
                this.app.put(route.route, func as any)
                break;

            case "use":
                this.app.use("*", func as any)
                // console.log("add route")
                break;

            default:
                break;
        }
    }

    deleteRoute(path: string, method: "post" | "get" | "put" | "delete") {

    }
}



class RequestHandler {
    meta: RouteMeta
    execs: Function
    preExecs?: PreExecs[]
    postExecs?: PostExec[]
    constructor(execs: Function, meta: RouteMeta, preExecs?: PreExecs[], postExecs?: PostExec[]) {
        this.meta = meta
        this.execs = execs
        this.preExecs = preExecs
        this.postExecs = postExecs
    }

    @logAction
    async handleReq(req: Request, res: ExpressResponse, next: NextFunction) {
        var args: any[] = []
        for (const key in this.meta) {
            try {
                if (this.meta[key].source) {
                    if (this.meta[key].source == "user") {
                        var data = dataParser[this.meta[key].source](req, res, next, this.meta[key].required)
                    }
                    else if (this.meta[key].source == "fromOwn") {
                        var data = this.meta[key].data
                    }
                    else
                        var data = dataParser[this.meta[key].source](req, res, next, this.meta[key].destination)

                    if (this.meta[key].parseJson) {
                        try {
                            if (this.meta[key].isArray)
                                data = "[" + data + "]"
                            data = JSON.parse(data)
                        } catch (error) {
                            console.log("err", error)
                        }
                    }

                    this.meta[key].schema != undefined ? args.push(this.meta[key].schema.parse(data)) : args.push(data)
                }
                else {
                    args.push(undefined)
                }

            } catch (error) {
                return res.status(400).json(error)
            }
        }

        try {
            // console.log("args" , args)
            var pp: Response = await this.execs.apply(args, args)
            if (this.postExecs) {
                for (let i = 0; i < this.postExecs.length; i++) {
                    try {
                        let meta = this.postExecs[i].meta?.params || {}

                        var args: any[] = [pp]
                        for (const key in meta) {
                            // if(meta[key].source == "admin" && req.session['admin'] == undefined){
                            //     return res.status(403).json({
                            //         message : "login"
                            //     })
                            // }
                            // console.log(this.meta[key])
                            var data = dataParser[meta[key].source](req, res, next, meta[key].destination)

                            try {
                                meta[key].schema != undefined ? args.push(meta[key].schema.parse(data)) : args.push(data)

                            } catch (error) {
                                return res.status(400).json(error)
                            }
                        }

                        pp = await this.postExecs[i].func.apply(args, args)
                    } catch (error) {

                    }

                }
            }

            if (pp.sent)
                return
            if (pp.html) {
                // return res.json({
                //     "ok" : "true"
                // })
                try {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(pp.data)

                } catch (error) {
                    console.log("err", error)
                }
                return
            }

            if (pp.responseHeader) {
                for (const key in pp.responseHeader) {
                    res.header(key, pp.responseHeader[key])
                }
            }
            if (pp.isFilePath) {
                // return res.json({
                //     "ok" : "true"
                // })
                try {
                    res.sendFile(pp.data)

                } catch (error) {
                    console.log("err", error)
                }
                return
            }
            if (pp.session) {
                if (pp.session.cookie?.expire) {
                    req.session.cookie.expires = pp.session.cookie?.expire

                    delete pp.session.cookie
                }
                Object.assign(req.session, pp.session)
                delete pp.session
            }

            if (pp.next == true) {
                next()
                return
            }

            if (pp.redirect) {
                res.redirect(pp.redirect)
                return
            }

            if (pp.json === false) {
                return res.status(pp.status || 200).end(pp.data)
            }

            if (pp.justJson) {
                res.status(200).json(pp.data)
                return
            }
            res.status(pp.status || 200).json(pp)
        } catch (error: any) {
            // console.log(error)
            res.status(500).json({
                error: error.message || ""
            })
            return res
        }
    }

    handle(execs: Function, meta: RouteMeta, preExecs?: PreExecs[]) {
        this.meta = meta
        this.execs = execs
        this.preExecs = preExecs
        var funcs: Function[] = []
        if (preExecs) {
            for (let i = 0; i < preExecs.length || 0; i++) {
                funcs.push(async (req: Request, res: ExpressResponse, next: NextFunction) => {
                    var args: any[] = []
                    let meta = preExecs[i].meta?.params || {}

                    for (const key in meta) {


                        if (this.meta?.[key]?.source == "fromOwn") {
                            var data = this.meta[key].data
                        }
                        else if (meta[key].source == "user") {
                            try {
                                var data = dataParser[meta[key].source](req, res, next, meta[key].required)
                            } catch (error) {

                            }
                        }
                        else
                            var data = dataParser[meta[key].source](req, res, next, meta[key].destination)
                        try {
                            meta[key].schema != undefined ? args.push(meta[key].schema.parse(data)) : args.push(data)

                        } catch (error) {
                            return res.status(400).json(error)
                        }
                    }

                    try {
                        var pp: Response = await preExecs[i].func.apply(this, args)



                        if (pp.sent)
                            return

                        if (pp.next) {
                            next()
                            return
                        }
                        if (pp.redirect) {
                            res.redirect(pp.redirect)
                            return
                        }

                        if (pp.justJson) {
                            res.status(200).json(pp.data)
                            return
                        }

                        if (this.postExecs) {
                            for (let i = 0; i < this.postExecs.length; i++) {
                                try {
                                    let meta = this.postExecs[i].meta?.params || {}
                                    var args: any[] = [pp]
                                    for (const key in meta) {
                                        // if(meta[key].source == "admin" && req.session['admin'] == undefined){
                                        //     return res.status(403).json({
                                        //         message : "login"
                                        //     })
                                        // }
                                        var data = dataParser[meta[key].source](req, res, next, meta[key].destination)
                                        try {
                                            meta[key].schema != undefined ? args.push(meta[key].schema.parse(data)) : args.push(data)

                                        } catch (error) {
                                            return res.status(400).json(error)
                                        }
                                    }

                                    pp = await this.postExecs[i].func.apply(args, args)
                                } catch (error) {

                                }

                            }
                        }

                        if (pp.html) {
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.end(pp.data)
                            return
                        }
                         if (pp.isFilePath) {
                            res.sendFile(pp.data)
                            return
                        }
                        if (pp.session) {
                            req.session = pp.session
                            delete pp.session
                        }

                        res.status(pp.status || 200).json(pp)
                    } catch (error) {
                        return res.json({ error })
                    }
                })
            }
        }
        funcs.push(async (req: Request, res: ExpressResponse, next: NextFunction) => {
            return this.handleReq(req, res, next)
        }
        )
        return funcs
    }
}