import BackLink, { BackLinkModel } from "./model";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";


export default class BackLinkRepository extends BaseRepositoryService<BackLink> {
    constructor(options?: RepositoryConfigOptions) {
        super(BackLinkModel, options)
    }
}


