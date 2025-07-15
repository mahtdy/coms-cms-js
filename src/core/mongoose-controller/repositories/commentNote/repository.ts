import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import CommentNote, { CommentNoteModel } from "./model";


export default class CommentNoteRepository extends BaseRepositoryService<CommentNote>{
    constructor(options? : RepositoryConfigOptions){
        super(CommentNoteModel, options)
    }
}