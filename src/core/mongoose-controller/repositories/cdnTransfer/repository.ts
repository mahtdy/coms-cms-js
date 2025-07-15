import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import CDN_Transfer, { CDN_Transfer_Model } from "./model";



export class CDN_TransferRepository extends BaseRepositoryService<CDN_Transfer> {
    constructor(options?: RepositoryConfigOptions) {
        super(CDN_Transfer_Model, options)

    }
}