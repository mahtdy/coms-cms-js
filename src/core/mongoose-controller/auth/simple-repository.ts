import { Document, Model } from "mongoose";
import BaseRepositoryService from "../repository";
import {LogInSimple} from "./simple-login"



export default class SimpleLogInRepository<T extends Document > extends BaseRepositoryService<T>{
    constructor(collection: Model<T> ) {
        super(collection)
    }
    
    async checkLogIn(user : string, password : string){
        this.collection.findOne({
            user ,
            password  
        })
    }


}