import Controller from "./controller";
import { Route } from "./application";
import BaseLogIn from "./logInController";

export interface PartOptions {
    controllers?: Controller[]
    logInController?: BaseLogIn
}

export default class Part {
    controllers: Controller[]
    logInController?: BaseLogIn
    route: string
    constructor(route: string, options: PartOptions) {
        this.route = route
        this.controllers = options.controllers || []
        this.logInController = options.logInController
    }


    addController(controller: Controller) {
        this.controllers.push(controller)
    }

    async initLanguages() {
        console.log("ddd", "initLanguages")
    }

    serve() {
        var routes: Route[] = this.logInController != undefined ?
            this.logInController.serve().map((value: Route, i: Number) => {

                value.route = value.absolute == true ? value.route : this.route + value.route
                if(value.absolute){
                    console.log(value.route , this.route)
                }
                return value
            }) : []


        for (let i = 0; i < this.controllers.length; i++) {
            routes.push(...(this.controllers[i].serve()).map((value: Route, j: Number) => {

                if(value.loginRequired == false){

                }
                else if (this.controllers[i].loginRequired) {
                    // if (value.middlewares == undefined) {
                    //     value.middlewares = []
                    // }
                    if (value.preExecs == undefined) {
                        value.preExecs = []
                    }
                    if (this.logInController)
                        value.preExecs?.unshift({
                            func: this.logInController.checkLogIn.bind(this.logInController), meta: {
                                params: {
                                    "1": {
                                        index: 0,
                                        source: "admin"
                                    }
                                }
                            }
                        })
                }

                

                value.route = value.absolute == true ? value.route : this.route + value.route
                
             
                
                return value
            }))
        }
        return routes
    }

    getRoutes() {
        var routes: Route[] = this.logInController != undefined ?
            this.logInController.serve().map((value: Route, i: Number) => {
                if (value.apiDoc == undefined) {
                    value.apiDoc = {}
                }
                if (this.logInController?.tag) {
                    value.apiDoc.tags = [
                        this.logInController?.tag
                    ]
                }
                else if (value.apiDoc.tags == undefined) {
                    value.apiDoc.tags = [
                        this.route + this.logInController?.baseRoute
                    ]
                }
                return value
            }) : []
        for (let i = 0; i < this.controllers.length; i++) {
            routes.push(...(this.controllers[i].serve()).map((value: Route, j: Number) => {

                // value.apiDoc = this this.route+value.route
                if (value.apiDoc == undefined) {
                    value.apiDoc = {}
                }
                if (this.controllers[i].tag) {
                    value.apiDoc.tags = [
                        this.controllers[i].tag as string
                    ]
                }
                else if (value.apiDoc.tags == undefined) {
                    value.apiDoc.tags = [
                        this.route + this.controllers[i].baseRoute
                    ]
                }
                return value
            }))
        }
        return routes
    }

}