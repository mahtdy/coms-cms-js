import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import PublishCycle, { PublishCycleModel } from "./model";


export default class PublishCycleRepository extends BaseRepositoryService<PublishCycle>{
    constructor(options?: RepositoryConfigOptions) {
        super(PublishCycleModel, options)
    }
}