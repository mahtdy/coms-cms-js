import  { RepositoryConfigOptions } from "../../../repository";
import BlockRepository from "../repository"
import Hamberger, { HambergerModel } from "./model";


export default class HambergerRepository extends BlockRepository<Hamberger>{
    constructor(options? :RepositoryConfigOptions){
        super(HambergerModel,"hamberger",options)
    }
}