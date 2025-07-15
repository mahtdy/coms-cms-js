import BaseController, { ControllerOptions } from "../controller";
import Installment from "../repositories/installment/model";
import InstallmentRepository from "../repositories/installment/repository";



export default class InstallmentController extends BaseController<Installment>{
    constructor(baseRoute : string ,repo : InstallmentRepository , options : ControllerOptions){
        super(baseRoute ,repo , options)
    }
}