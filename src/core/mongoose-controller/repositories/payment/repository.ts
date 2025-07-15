import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import Payment, { PaymentModel } from "./model";



export default class PaymentRepository extends BaseRepositoryService<Payment>{
    constructor(options ?: RepositoryConfigOptions){
        super(PaymentModel,options)
    }
}