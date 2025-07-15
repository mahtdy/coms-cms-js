import Messager, {staticImplements,  MyMessager } from "./baseMessager";
import EmailTemplateRepository from "../mongoose-controller/repositories/emailTemplate/repository";
import EmailConfigRepository from "../mongoose-controller/repositories/emailConfig/repository"
import nodemailer from "nodemailer"
import logSystemError from "../errorLogger";

interface emailDataOptions {
    template: string,
    receptor: string | string[],
    parameters: any,
    files ?: string[],
    id ?: string
}

@staticImplements<Messager >()
export default class EmailMessager implements MyMessager {
    constructor() {

    }
    @logSystemError((err: Error) => {
        return {
            part: "email",
            error: err.message,
            isCritical: false,
            // otherInfo: {
            //     service: "kasbarg",
            //     error: err,
            //     type: "OTP"
            // }
        } as unknown as any
    })
    static async send(options: emailDataOptions): Promise<boolean> {
        try {
            // return true
            var template = await new EmailTemplateRepository().findOne(
                {
                    title: options.template
                }
            )
            
            if (template == null) {
                return false
            }
            var config
            var emailConfigRepo = new EmailConfigRepository()
            
            if (template.defaultEmailConfig) {
                config = await emailConfigRepo.findById(template.defaultEmailConfig as string)
            }
            else {
                config = await emailConfigRepo.getDefault()
            }

            if (config == null) {
                return false
            }

            var transporter = nodemailer.createTransport({
                host : config.host,
                port : config.port,
                auth: {
                    user: config.config.userName,
                    pass: config.config.password
                },
                secure :false,
                tls : {
                    rejectUnauthorized : false
                }
            })

            const mailOptions = {
                from: config.config.userName,
                to: options.receptor, 
                subject: "subject",
                html: this.renderHtml(template?.text, options.parameters)
            };
            try {
                var info = await transporter.sendMail(mailOptions)
                console.log(info)
                return true
            } catch (error) {
                console.log(error)
                throw error
                return false
            }
        } catch (error) {
            throw error
        }
    }


    @logSystemError((err: Error) => {
        return {
            part: "email",
            error: err.message,
            isCritical: false,
            otherInfo: {
                multi: true,
                error: err
            }

        } as unknown as any
    })
    static async sendMulti(options: emailDataOptions): Promise<boolean> {
        console.log(options)
        try {
            var template = await new EmailTemplateRepository().findOne(
                {
                    title: options.template
                }
            )
            if (template == null) {
                return false
            }
            var config
            var emailConfigRepo = new EmailConfigRepository()
            if (template.defaultEmailConfig) {
                config = await emailConfigRepo.findById(template.defaultEmailConfig as string)
            }
            else {
                config = await emailConfigRepo.getDefault()
            }

            console.log(config)
            if (config == null) {
                return false
            }

            var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: config.config.userName,
                    pass: config.config.password
                }
            })
            for (let i = 0; i < options.receptor.length; i++) {
                const mailOptions = {
                    from: config.config.userName, // sender address
                    to: options.receptor[i], // list of receivers
                    subject: "subject", // Subject line
                    html: this.renderHtml(template?.text, options.parameters[i])// plain text body
                };
                try {
                    console.log(mailOptions)
                    var info = await transporter.sendMail(mailOptions)
                    console.log(info)
                    // return true
                } catch (error) {
                    console.log(error)
                    return false
                }
            }
            return true
        } catch (error) {
            throw error
        }
    }

    static async sendWithConfig(options: emailDataOptions, config: any): Promise<boolean> {
        var template = await new EmailTemplateRepository().findOne(
            {
                title: options.template
            }
        )
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.config.userName,
                pass: config.config.password
            }
        })
        const mailOptions = {
            from: config.config.userName, // sender address
            to: options.receptor, // list of receivers
            subject: "subject", // Subject line
            html: template?.text// plain text body
        };
        try {
            var info = await transporter.sendMail(mailOptions)
            console.log(info)
            return true
        } catch (error) {
            console.log(error)
            return false
        }

    }

    static renderHtml(html: string, data: any) {
        for (const key in data) {
            html = html.replace(`$${key}`, data[key])
        }
        return html
    }


}