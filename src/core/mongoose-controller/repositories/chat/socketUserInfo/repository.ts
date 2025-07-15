

import SocketUserInfo, { SocketUserInfoModel } from "./model";
import BaseRepositoryService from "../../../repository";
// import CacheService from "../cache"


export default class SocketUserInfoRepository extends BaseRepositoryService<SocketUserInfo> {
    constructor() {
        super(SocketUserInfoModel, {
            // cacheService: new CacheService("socketUserInfo")
        })
    }
}      
