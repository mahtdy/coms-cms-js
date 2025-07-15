import { RepositoryConfigOptions } from "../../../repository";
import BlockRepository from "../repository";
import Menu, { MenuModel } from "./model";


export default class MenuRepository extends BlockRepository<Menu>{
    constructor(options ?: RepositoryConfigOptions){
        super(MenuModel,"menu", options)
    }
}