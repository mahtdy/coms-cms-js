
import WaterMark, { WaterMarkModel } from "./model";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";



export default class WaterMarkRepository extends BaseRepositoryService<WaterMark> {
    constructor(options ?: RepositoryConfigOptions) {
        super(WaterMarkModel , options)
    }
}