import BasePaymentPort from "./base";
import axios from "axios";
// import crypto from "crypto";
import { format } from "date-fns";
const { MCrypt } = require("mcrypt")


export default class MeliPayPort extends BasePaymentPort {
    private blockSize = 8;
    constructor(config: any) {
        super(config)

    }

    private pkcs7Padding(data: Buffer, blockSize: number): Buffer {
        const padding = blockSize - (data.length % blockSize);
        const pad = Buffer.alloc(padding, padding);
        return Buffer.concat([data, pad]);
    }

    generateSign(text: string) {

        const tripleDESEcb = new MCrypt("tripledes", "ecb")
        const Key = Buffer.from(this.config.key, "base64")
        const blockSize = tripleDESEcb.getBlockSize()
        const extraPad = blockSize - (text.length % blockSize)
        const targetStr = text + Array(extraPad)
            .fill(String.fromCharCode(extraPad)).join("")
        tripleDESEcb.open(Key)
        return tripleDESEcb.encrypt(targetStr).toString("base64")

    }

    async getLink(amount: number, callBackUrl: string, info: any): Promise<string> {
        try {
            const url = "https://sadad.shaparak.ir/api/v0/Request/PaymentRequest"
            const text = `${this.config.terminalId};${info.orderId};${amount}`
            const SignData = this.generateSign(text)
            const localDateTime = format(new Date(), "MM/dd/yyyy hh:mm:ss a");

            let data = {
                "TerminalId": this.config.terminalId,
                "MerchantId": this.config.merchantId,
                "Amount": amount,
                "SignData": SignData,
                "ReturnUrl": callBackUrl,
                "LocalDateTime": localDateTime,
                "OrderId": info.orderId
            }



            let res = await axios.post(url, data)

            if (res.status == 200) {
                if(res.data["Token"] == undefined || res.data["Token"] == null || res.data["Token"] == ""){
                    throw new Error("Pay port Error")
                }
                return `https://sadad.shaparak.ir/Purchase?token=${res.data["Token"]}`
            }
        } catch (error: any) {
            console.log(error.response.data)
            throw error
        }
        return ""
    }

    async validatePayment(callBackData: any): Promise<boolean> {
        const url = 'https://sadad.shaparak.ir/api/v0/Advice/Verify'
        try {
            const SignData = this.generateSign(callBackData["token"])
            const data = {
                "Token" : callBackData["token"],
                SignData
            }

            let res = await axios.post(url, data)
            
            if(res.data["ResCode"] == 0){
                return true
            }

            return false
            
        } catch (error) {
            throw error
        }
        return false
    }
}




