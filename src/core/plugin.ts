import { Route } from "./application";



export abstract class Plugin {
    constructor() {

    }
    abstract init(): Promise<any>
    abstract serve(...args: any[]): Route[]
}