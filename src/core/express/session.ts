import { Route } from "../application";
import ExpressApplication from "../expressApplication";
import { Plugin } from "../plugin";
import session from "express-session"


export default class Session implements Plugin {
    config: session.SessionOptions
    constructor(config: session.SessionOptions) {
        this.config = config
    }

    async init(): Promise<any> {
        var app = ExpressApplication.getInstance()
        app.app.use(session(this.config))
    }
    serve(...args: any[]): Route[] {
        return []
    }

}