import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import PaymentConfigPreText, {PaymentConfigPreTextModel} from "./model";


export default class PaymentConfigPreTextRepository extends BaseRepositoryService<PaymentConfigPreText>{
    constructor(options?: RepositoryConfigOptions){
        super(PaymentConfigPreTextModel, options)
    }
}