import { RepositoryConfigOptions } from "../../../../mongoose-controller/repository";
import BlockRepository from "../repository";
import Navbar, { NavbarModel } from "./model";



export default class NavbarRepository extends BlockRepository<Navbar>{
    constructor(options ?: RepositoryConfigOptions){
        super(NavbarModel,"navbar",options)
    }   
}