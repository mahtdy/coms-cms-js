import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import InternalMessage, { InternalMessageModel } from "./model";



export default class InternalMessageRepository extends BaseRepositoryService<InternalMessage>{
    constructor(options?: RepositoryConfigOptions) {
        super(InternalMessageModel, options)
    }
}