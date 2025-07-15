import { Document } from "mongoose";
import { Response } from "../../controller";
import BaseRepositoryService from "../repository";
import { z } from "zod"
import { Body, Session } from "../../decorators/parameters";
import BaseLogIn from "../../logInController";

export interface LogInSimple {
    user: string,
    password: string
}



export default class SimpleLogIn<T extends Document > extends BaseLogIn {
    public repository: BaseRepositoryService<T>;

    constructor(baseRoute: string, repository: BaseRepositoryService<T>) {
        super(baseRoute)
        this.repository = repository
        this.initApis()
    };

    async logIn(
        @Body({
            destination: "user",
            schema: z.string().min(8)
        }) user: string,
        @Body({
            destination: "password",
            schema: z.string().min(8)
        }) password: string,
        @Session() session : any
        
        ): Promise<Response>
        {
        session['logIn'] = true
        return {
            status: 200,
            session 
        }
    }


    initApis() {
        this.addRoute("/", "post", this.logIn.bind(this))
    }
}