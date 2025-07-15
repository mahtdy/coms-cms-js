import { Route } from "../application";
import { Plugin } from "../plugin";

// import {
//     bodyLimit, environment, port
//     , DB_Address, DB_User, DB_Password,
//     redisPassword, sessionSecret
// } from '../config'

import mongoose from 'mongoose';

interface Config extends mongoose.ConnectOptions {
    uri: string
}

export default class Mongoose implements Plugin {
    config: Config 
    constructor(config: Config) {
        this.config = config
    }
   async init(): Promise<any> {
        try {
            var conf :any = {...this.config}
            delete conf.uri
            mongoose.set('strictQuery', true)
            await mongoose.connect(this.config.uri, conf)
            return
        } catch (error) {
            throw error
        }
    }
    serve(...args: any[]): Route[] {
        return []
    }

}