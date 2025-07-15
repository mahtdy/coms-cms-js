import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import Comment, { CommentModel } from "./model";




export default class CommentRepository extends BaseRepositoryService<Comment>{
    constructor(options? : RepositoryConfigOptions){
        super(CommentModel, options)
    }
}