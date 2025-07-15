import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import CommentBlock, { CommentBlockModel } from "./model";


export default class CommentBlockRepository extends BaseRepositoryService<CommentBlock>{
    constructor(options ?: RepositoryConfigOptions){
        super(CommentBlockModel,options)

    }
}