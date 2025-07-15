import { Response } from "./controller"
import Part from "./part"
import { Plugin } from "./plugin"

interface APIDoc {
    // tags ?: string[]
}

export interface PreExecs {
    func: Function,
    meta?: any
}

export interface PostExec {
    func: Function,
    meta?: any
}

export interface Route {
    preExecs?: PreExecs[],
    postExec?: PostExec[]
    execs: Function,
    route: string,
    method: 'post' | 'delete' | 'put' | 'get' | 'use',
    meta?: any,
    middlewares?: any[],
    log?: Boolean,
    apiDoc?: any,
    absolute?: boolean,
    loginRequired ?: boolean

}


export default class Application {

    parts: Part[]
    plugins: Plugin[]
    preServeExtra: Function

    constructor(parts?: Part[]) {
        this.parts = parts || []
        this.plugins = []
        this.preServeExtra = function () { }

    }
    async bootstarp(port: number) {
        console.log("application")
    }

    addRoute(route: Route) {
    }

    async preServe() {
        this.preServeExtra()
        for (let i = 0; i < this.plugins.length; i++) {
            await this.plugins[i].init()

        }
    }

    async addPlugin(plugin: Plugin) {
        this.plugins.push(plugin)
    }


    addPart(part: Part) {
        this.parts.push(part)
    }

    getPart(route: string) {
        for (let i = 0; i < this.parts.length; i++) {
            if (this.parts[i].route == route)
                return this.parts[i]
        }
    }

    getRoutes() {
        var routes: Route[] = []
        for (let i = 0; i < this.plugins.length; i++) {
            routes.push(... this.plugins[i].serve())
        }
        for (let i = 0; i < this.parts.length; i++) {
            routes.push(... this.parts[i].getRoutes())
        }
        return routes

    }

    serve() {
        for (let i = 0; i < this.parts.length; i++) {
            this.parts[i].serve()

        }
    }
}


