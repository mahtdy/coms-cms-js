export default class BasePaymentPort {
    config : any
    constructor(
        config : any
    ){  
        this.config = config
    }

    async getLink(amount : number , callBackUrl:string , info : any) : Promise<string>{

        return ""
    }

    async validatePayment(callBackData: any , info : any) :Promise<boolean>{
        return false
    }
}