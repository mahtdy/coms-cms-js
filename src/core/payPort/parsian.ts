import BasePaymentPort from "./base";
import * as soap from "soap";
import { promisify } from "util";
import RandomGenarator from "../random";

export default class ParsianPayPort extends BasePaymentPort{
    constructor(config : any){
        super(config)
    }
    async getLink(amount: number,callBackUrl : string ): Promise<string> {
        try {
            const params = {
                LoginAccount: this.config.pin,
                Amount: amount, 
                CallBackUrl:callBackUrl,
                OrderId: RandomGenarator.randomNumber().toString()
            };
            let cli =await soap.createClientAsync("https://pec.shaparak.ir/NewIPGServices/Sale/SaleService.asmx?WSDL")
            
            const salePaymentRequest = promisify( cli.SalePaymentRequest)
            let r = await  salePaymentRequest({
                requestData: params
            })
            
            if(r["SalePaymentRequestResult"]["Token"] <= 0){
                throw new Error("Pay port Error")
            }


            return `https://pec.shaparak.ir/NewIPG/?Token=${r["SalePaymentRequestResult"]["Token"]}`
           
        } catch (error) {
            throw error
        }
    }

    async validatePayment(callBackData: any): Promise<boolean> {
        try {
            console.log("validatePayment")
            const params = {
                LoginAccount: this.config.pin,
                "Token"       : callBackData["Token"],
            };
            let cli =await soap.createClientAsync("https://pec.shaparak.ir/NewIPGServices/Confirm/ConfirmService.asmx?WSDL")
            
            const confirmPayment = promisify( cli.ConfirmPayment)
            let r = await confirmPayment({
                requestData: params
            })
            
            if(r["ConfirmPaymentResult"]["Status"] == 0 && r["ConfirmPaymentResult"]["RRN"] > 0){
                return true
            }
            return false
        } catch (error) {
            throw error
        }
    }
}
