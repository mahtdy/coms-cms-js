
import { FilterQuery } from "mongoose";
import RandomGenarator from "../../../random";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import APIKey, { APIKeyModel, apiKeySchema } from "./model";



export default class APIKeyRepository extends BaseRepositoryService<APIKey>{
    constructor(options?: RepositoryConfigOptions) {
        super(APIKeyModel, options)
    }

    insert(document: APIKey): Promise<APIKey> {
        document.token = RandomGenarator.generateHashStr(50)
        return super.insert(document)
    }
}