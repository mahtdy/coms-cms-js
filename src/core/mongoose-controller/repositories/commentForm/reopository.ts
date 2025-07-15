import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import CommentForm, { CommentFormModel } from "./model";


export default class CommentFormRepository extends BaseRepositoryService<CommentForm>{

    constructor(options? : RepositoryConfigOptions){
        super(CommentFormModel, options)
    }
}