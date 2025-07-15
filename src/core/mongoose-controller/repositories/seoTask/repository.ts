

import SeoTask, { SeoTaskModel } from "./model";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";


export default class SeoTaskRepository extends BaseRepositoryService<SeoTask> {
    constructor(options? :RepositoryConfigOptions) {
        super(SeoTaskModel , options)
    }
}
