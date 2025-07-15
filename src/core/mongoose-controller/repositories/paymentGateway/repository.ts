import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import PaymentGateway, { PaymentGatewayModel } from "./model";


export default class PaymentGatewayRepository extends BaseRepositoryService<PaymentGateway>{
    constructor(options ?: RepositoryConfigOptions){
        super(PaymentGatewayModel , options)
    }
}