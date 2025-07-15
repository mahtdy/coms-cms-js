
import BaseRepositoryService, { RepositoryConfigOptions } from "../../../repository";
import PagePSI , { PagePSI_Model } from "./model";



export default class PagePSI_Repository extends BaseRepositoryService<PagePSI>{
    constructor(options? : RepositoryConfigOptions){
        super(PagePSI_Model, options)
    }
} 