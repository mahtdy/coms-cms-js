import InternalMessageRepository from "../mongoose-controller/repositories/internalMessage/repository";
import InternalMessageTemplateRepository from "../mongoose-controller/repositories/internalMessageTemplate/repository";
import Messager, { staticImplements, MyMessager } from "./baseMessager"

interface internalMessageDataOptions {
    template: string,
    receptor: string,
    parameters: any,
    namespace: string
}


interface internalMessageMultiOptions {
    template: string,
    data: {
        receptor: string,
        parameters: any,
        id : string
    }[],
    namespace: string
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
const internalRepo = new InternalMessageRepository()
const internalTemplateRepo = new InternalMessageTemplateRepository()


@staticImplements<Messager>()
export default class InternalMessager implements MyMessager {
    constructor() {

    }

    static async send(options: internalMessageDataOptions): Promise<boolean> {
        try {
            var template = await internalTemplateRepo.findOne({
                title: options.template
            })
            if (
                template == null
            ) {
                return false
            }

            await internalRepo.insert({
                id: options.receptor,
                namespace: options.namespace,
                message: this.messageBuilder(template.text, options.parameters)

            } as any)
        } catch (error) {
            throw error
        }
        return false
    }

    static async sendMulti(options: internalMessageMultiOptions): Promise<boolean> {
        try {
            var template = await internalTemplateRepo.findOne({
                title: options.template
            })
            if (
                template == null
            ) {
                return false
            }
            for (let i = 0; i < options.data.length; i++) {
                try {
                    await internalRepo.insert({
                        id: options.data[i].receptor,
                        namespace: options.namespace,
                        message: this.messageBuilder(template.text, options.data[i].parameters)

                    } as any)
                } catch (error) {
                    
                }
            }

        } catch (error) {
            throw error
        }
        return false
    }


    static messageBuilder(text: string, parameters: any) {
        for (const key in parameters) {
            text = text.replace(`$${key}`, parameters[key])
        }
        return text

    }

}