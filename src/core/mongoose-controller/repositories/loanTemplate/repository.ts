import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import LoanTemplate, { loanTemplateModel } from "./model";



export default class LoanTemplateRepository extends BaseRepositoryService<LoanTemplate>{
    constructor(options ?: RepositoryConfigOptions){
        super(loanTemplateModel , options)
    }
}