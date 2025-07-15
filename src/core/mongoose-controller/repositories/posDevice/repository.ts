import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import POS_Device, { POS_DeviceModel } from "./model";



export default class POS_DeviceRepository extends BaseRepositoryService<POS_Device> {
    constructor(options?: RepositoryConfigOptions) {
        super(POS_DeviceModel, options)
    }
}
