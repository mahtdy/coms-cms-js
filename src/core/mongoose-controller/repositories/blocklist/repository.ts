
import BlockList, { BlockListModel } from "./model";
import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";


export default class BlockListRepository extends BaseRepositoryService<BlockList> {
    constructor(options? :RepositoryConfigOptions) {
        super(BlockListModel,options)
    }

    async insert(document: BlockList): Promise<BlockList> {
        return document

    }
}      