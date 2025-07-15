import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import UserComment, { UserCommentModel } from "./model";



export default class UserCommentRepository extends BaseRepositoryService<UserComment>{
    constructor(options? : RepositoryConfigOptions){
        super(UserCommentModel , options)
    }
}