
import { Model } from "mongoose";
import UserSocket, { UserSocketModel } from "./model";
import BaseRepositoryService from "../../../repository";
// import CacheService from "../cache"


export default class UserSocketRepository extends BaseRepositoryService<UserSocket> {
    constructor() {
        super(UserSocketModel, {
            // cacheService: new CacheService("userSocket")
        })
    }
}      
