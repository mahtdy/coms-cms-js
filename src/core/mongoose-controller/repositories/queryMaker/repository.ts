import BaseRepositoryService from "../../repository";
import QueryMaker, { QueryMakerModel } from "./model";


export default class QueryMakerRepository extends BaseRepositoryService<QueryMaker>{
    constructor(){
        super(QueryMakerModel)
    }
}