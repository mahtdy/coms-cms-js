import { RepositoryConfigOptions } from "../../../../mongoose-controller/repository";
import BlockRepository from "../repository";
import Header, { HeaderModel } from "./model";



export default class HeaderRepository extends BlockRepository<Header>{
    constructor(options? : RepositoryConfigOptions){
        super(HeaderModel,"header",options)
    }
}