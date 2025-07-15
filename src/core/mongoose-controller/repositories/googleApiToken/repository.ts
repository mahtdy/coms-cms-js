import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import GoogleApiToken, { GoogleApiTokenModel } from "./model";


export default class GoogleApiTokenRepository extends BaseRepositoryService<GoogleApiToken>{
    constructor(options? : RepositoryConfigOptions){
        super(GoogleApiTokenModel, options)
    }
}