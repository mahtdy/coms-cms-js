import BaseRepositoryService, { RepositoryConfigOptions } from "../../../repository";
import InvoiceLog, { InvoiceLogModel } from "./model";


export default class InvoiceLogRepository extends BaseRepositoryService<InvoiceLog>{
    constructor( options ?: RepositoryConfigOptions ) { 
        super(InvoiceLogModel, options ) 
    }

}