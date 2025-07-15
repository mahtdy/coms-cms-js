import { promisify } from "util";
import BasePaymentPort from "./base";

import ZarinPal from "zarinpal-node-sdk";


export default class ZarinpalPayPort extends BasePaymentPort {
    zarinpal: ZarinPal
    constructor(config: any) {
        super(config)
        this.zarinpal = new ZarinPal({
            merchantId: config.merchantId,
            accessToken: config.accessToken,
        });
    }

    async getLink(amount: number, callBackUrl: string, info: any): Promise<string> {
        try {
            let r = await this.zarinpal.payments.create({
                amount,
                callback_url: callBackUrl,
                description: info["description"],
                email: info["email"],
                mobile: info["phone"]
            })

            if (r["data"]["code"] != 100) {
                throw new Error("Pay port Error")
            }
            return `https://www.zarinpal.com/pg/StartPay/${r["data"]["authority"]}`

        } catch (error) {
            throw error
        }
    }

    async validatePayment(callBackData: any): Promise<boolean> {
        try {
            const response = await this.zarinpal.verifications.verify({
                amount: callBackData["amount"],
                authority: callBackData["authority"],
            });

            if (response.data.code === 100) {
               return true
            } 
            
            else if (response.data.code === 101) {
                return true
            } 
            
            return false
            
        } catch (error) {
            throw new Error(`Payment Verification Failed:, ${error}`);
        }
    }
}