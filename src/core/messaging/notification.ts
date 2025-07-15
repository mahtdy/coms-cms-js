import Messager, { staticImplements, MyMessager } from "./baseMessager";
import NotificationTemplateRepository from "../mongoose-controller/repositories/notificationTemplate/repository";
import DomainRepository from "../mongoose-controller/repositories/domain/repository";
import LanguageRepository from "../mongoose-controller/repositories/language/repository";
import NotificationTemplate from "../mongoose-controller/repositories/notificationTemplate/model";

// import nodemailer from "nodemailer"
import webpush from "web-push"
import Domain from "../mongoose-controller/repositories/domain/model";

interface NoticationDataOptions {
    template: string,
    receptor: any | any[],
    parameters: any,
    language?: string,
    url ?: string
}
// interface EditTemplate {
//     template: SmsTemplate
//     text: string
// }
// export enum EditTemplateResult {
//     "extenalError" = 400,
//     "internalError" = 500,
//     "success" = 200
// }

const notificationTemplateRepo = new NotificationTemplateRepository()
const domainRepo = new DomainRepository()
const languageRepo = new LanguageRepository()

@staticImplements<Messager>()
export default class NotificationMessager implements MyMessager {
    constructor() {

    }

    // static async send(options: NoticationDataOptions): Promise<boolean> {
    //     return false
    // }

    static async sendMulti(options: NoticationDataOptions): Promise<boolean> {
        return false
    }

    static async send(options: NoticationDataOptions): Promise<boolean> {

        // console.log(options)
        // webpush.setVapidDetails(
        //     'mailto:example@yourdomain.org',
        //     "BA15XdzcdKUtdLFBw-VJGF8yeBdMt2zEd3o_J1_h5hJ6w4Y04oplqs0ZfNVuCx5sMQC2vvTYEJyImLE4MLDNxyM",
        //     "yKlDizb7BDCnAkCxe2Oqyi_hgQ2ccd7howsVGSMymfo"
        // )
        // // web

        try {
            let domain
            if (options.language) {
                let language = await languageRepo.findById(options.language)
                if (language == null) {
                    return false
                }
                if (language.domain != undefined) {
                    domain = await domainRepo.findById(language.domain as string)
                }
                else {
                    domain = await domainRepo.findOne({
                        isDefault: true
                    })
                }
            }
            else {
                domain = await domainRepo.findOne({
                    isDefault: true
                })
            }
            if (domain == null) {
                return false
            }

            if (options.receptor.length != undefined) {
                for (let i = 0; i < options.receptor.length; i++) {
                    await this.sendNotif({
                        template : options.template,
                        parameters :options.parameters,
                        receptor : options.receptor[i],
                        url : options.url
                    },domain)

                }
            }
            else {
                await this.sendNotif(options,domain)
            }
        } catch (error) {

            throw error
        }


        return false

    }
    static async sendNotif(options: NoticationDataOptions, domain: Domain) {
        try {
            if (options.receptor.domain.toHexString() != domain._id.toHexString()) {
                console.log("resturn")
            }
            if (options.receptor.type == "web-push") {
                webpush.setVapidDetails(
                    `mailto:${domain.notificationConfig?.email}`,
                    domain.notificationConfig?.publicKey || "",
                    domain.notificationConfig?.privateKey || ""
                )

                let template = await notificationTemplateRepo.findOne({
                    title: options.template
                })
                console.log(template)
                if (template == null) {
                    return
                }
                let msg = template.text
                for (const key in options.parameters) {
                    msg = msg.replace(`$${key}`, options.parameters[key])
                }

               

                await webpush.sendNotification(options.receptor.config,JSON.stringify({
                    title: template.messageTitle,
                    message:msg,
                    url : options.url
                }))
            }
        } catch (error) {
            // console.log("ee" , error)
            throw error
        }
    }


}