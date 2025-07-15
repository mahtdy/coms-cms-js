import "reflect-metadata";
import { PreExecs, Route } from "./application";
import { setMeta, MetaConf, ControllerMeta } from "./decorators/parameters"
import { generateSchema } from "@anatine/zod-openapi";
export interface InputData {
    body?: any,
    query?: any,
    param?: any
}
export interface Response {
    status?: 200 | 201 | 300 | 301 | 302 | 303 | 304 | 307 | 308| 400 | 401 | 403 | 404 | 500 | 501,
    justJson? :boolean,
    next?: boolean,
    data?: any,
    sent?: boolean,
    session?: any,
    message?: string,
    responseHeader?: any,
    log?: boolean
    json?: boolean,
    redirect?: string,
    html?: boolean,
    isFilePath?: boolean
}


export interface MethodsDescription {
    [key: string]: any[];
}

export interface RouteMeta {
    [x: number]: MetaConf,
    absolute?: boolean
}

export interface RouteOptions {
    preExecs?: PreExecs[],
    middlewares?: Function[],
    contentType?: "application/json" | "application/xml" | "application/x-www-form-urlencoded" | "multipart/form-data",
    meta?: any
}

export default class Controller {
    tag?: string
    baseRoute: string
    routes: Route[]
    loginRequired?: boolean
    apiDoc?: any

    constructor(baseRoute: string, apiDoc?: any) {
        this.baseRoute = baseRoute
        this.apiDoc = apiDoc
        var classConf: any = Reflect.getMetadata("routes" + this.constructor.name, this) || {}

        this.routes = classConf.routes?.map((value: any, i: any) => {
        
            if (!value.absolute)
                value.route = this.baseRoute + value.route
            value.execs = value.execs.bind(this)
            return value
        }) || []

        if(classConf.preExecs){
            for (let i = 0; i < classConf.preExecs.length; i++) {
                this.addPreExecs( classConf.preExecs[i].route,classConf.preExecs[i].method,classConf.preExecs[i].execs.bind(this))
            }
        }
    }


    addRoute(route: string, method: 'post' | 'delete' | 'put' | 'get', execs: Function, options?: RouteOptions) {
        // console.log(options?.preExecs)
        // console.log(route,execs)
        route = this.baseRoute + route
        this.routes.push({
            route,
            execs,
            method,
            preExecs: options?.preExecs,
            middlewares: options?.middlewares
        })

        var name = execs.name.replace("bound ", "")

        var confs: any = Reflect.getMetadata(name + this.constructor.name, this) || {}

        if (route.includes("/create/test"))
            console.log(name,confs ,name + this.constructor.name)

        if (options?.meta) {
            if (!confs.params) {
                confs.params = {}
            }
            confs.params = Object.assign(confs.params, options.meta)
        }

        if (options?.contentType) {
            confs['contentType'] = options.contentType
        }

        Reflect.defineMetadata(name + this.constructor.name, confs, this)
    }

    addMiddlewares(route: string, method: 'post' | 'delete' | 'put' | 'get', middleware: any) {
        // console.log(options?.preExecs)
        var index = this.routes.findIndex((value, i) => {
            return value.route == route && value.method == method
        })
        if (index != -1) {
            if (!this.routes[index].middlewares) {
                this.routes[index].middlewares = []
            }

            this.routes[index].middlewares?.push(middleware)
        }


    }


    addAbsoluteRoute(route: string, method: 'post' | 'delete' | 'put' | 'get', execs: Function, options?: RouteOptions) {
        // console.log(options?.preExecs)
        // route = this.baseRoute + route
        this.routes.push({
            route,
            execs,
            method,
            preExecs: options?.preExecs,
            middlewares: options?.middlewares
        })

        var name = execs.name.replace("bound ", "")
        var confs: any = Reflect.getMetadata(name + this.constructor.name, this) || {}


        if (options?.meta) {
            if (!confs.params) {
                confs.params = {}
            }
            confs.params = Object.assign(confs.params, options.meta)
        }
        if (options?.contentType) {
            confs['contentType'] = options.contentType
        }

        Reflect.defineMetadata(name + this.constructor.name, confs, this)
    }

    exclude(route: string, method: 'post' | 'delete' | 'put' | 'get') {
        var index = this.routes.findIndex((value, i) => {
            return value.route == route && value.method == method
        })
        if (index != -1)
            this.routes.splice(index, 1)
    }

    addRouteWithMeta(route: string, method: 'post' | 'delete' | 'put' | 'get', execs: Function, routeMeta: RouteMeta) {

        if (!routeMeta.absolute) {
            route = this.baseRoute + route
        }

        // if (typeof execs == "function") {
        var name = execs.name.replace("bound ", "")
        var confs: ControllerMeta = Reflect.getMetadata(name + this.constructor.name, this) || {}
        for (const key in routeMeta) {
            confs = setMeta({
                index: routeMeta[key].index,
                source: routeMeta[key].source,
                destination: routeMeta[key].destination,
                schema: routeMeta[key].schema,
                parseJson: routeMeta[key].parseJson,
                config : routeMeta[key].config,
                mapToBody : routeMeta[key].mapToBody,
                exclude : routeMeta[key].exclude,
                isArray : routeMeta[key].isArray,
                required : routeMeta[key].required
            }, confs)
        }


        Reflect.defineMetadata(name + this.constructor.name, confs, this)
        // }




        this.routes.push({
            route,
            execs,
            method
        })
    }

    addPreExecs(route: string, method: 'post' | 'delete' | 'put' | 'get', preExec: Function) {
        route = this.baseRoute + route
        var index = this.routes.findIndex((value, i) => {
            return value.route == route && value.method == method
        })
        if (index != -1) {
            if (!this.routes[index].preExecs) {
                this.routes[index].preExecs = []
            }
            this.routes[index].preExecs?.push({
                func: preExec
            })

        }
    }


    serve() {
        var middlewares: any = Reflect.getMetadata("middlewares" + this.constructor.name, this) || {}
        var logRoutes: any = Reflect.getMetadata("logRoutes" + this.constructor.name, this) || {}
        this.routes.forEach(element => {
            var name = element.execs.name.replace("bound ", "")
            // console.log(name)
            if (middlewares[name]) {
                if (!element.middlewares) {
                    element.middlewares = []
                }
                element.middlewares.push(...middlewares[name])
            }

            element.log = logRoutes[name]

            var confs = Reflect.getMetadata(name + this.constructor.name, this)

            // console.log(name)
            element.meta = confs
            if (element.preExecs) {
                for (let i = 0; i < element.preExecs.length; i++) {
                    if (!element.preExecs[i].meta) {
                        var name = element.preExecs[i].func.name.replace("bound ", "")
                        var confs = Reflect.getMetadata(name + this.constructor.name, this)
                        element.preExecs[i].meta = confs
                    }
                }
            }
            if (this.apiDoc) {
                element.apiDoc = Object.assign(this.apiDoc, element.apiDoc)
            }
            return element
        });
        return this.routes
        // return 
    }

}


export enum MetadataKeys {
    BASE_PATH = 'base_path',
    ROUTERS = 'routers',
}



function logParam(target: any, methodKey: string, parameterIndex: number) {
    target.test = methodKey;
    // and parameterIndex says which parameter
}


