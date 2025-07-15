

import Author  from "./model";
import  { RepositoryConfigOptions } from "../../repository";
import BasePageRepository, { BasePageOptions } from "../../basePage/repository";


export default class AuthorRepository extends BasePageRepository<Author> {
    constructor(options: RepositoryConfigOptions & BasePageOptions<Author>) {
        // options.model = AuthorModel
        super(options)
    }
}


