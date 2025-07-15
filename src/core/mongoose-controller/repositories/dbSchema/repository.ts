import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import DBSchema, { DBSchemaModel } from "./model";




export default class DBSchemaRepository extends BaseRepositoryService<DBSchema>{
    constructor(options?: RepositoryConfigOptions) {
        super(DBSchemaModel, options)
    }
}