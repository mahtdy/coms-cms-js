import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import RefreshToken, { RefreshTokenModel } from "./model";



export default class RefreshTokenRepository extends BaseRepositoryService<RefreshToken>{
    constructor(options? : RepositoryConfigOptions){
        super(RefreshTokenModel,options)
    }
}