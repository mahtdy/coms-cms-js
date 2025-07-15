
import { Response } from "../../../controller"
import request from "request";
import SystemConfigRepository from "../../repositories/system/repository";
import SmsMessager from "../../../messaging/smsMessager";
import BlockListRepository from "../../repositories/blocklist/repository";

export function checkAdminNeedCaptcha(sessionIndex: number) {
    return (target: any,
        propertyKey: string,
        propertyDescriptor: PropertyDescriptor
    ): PropertyDescriptor => {
        propertyDescriptor = propertyDescriptor;

        const originalMethod = propertyDescriptor.value;


        propertyDescriptor.value = async function (...args: any[]): Promise<Response> {

            try {
                var session: any = args[sessionIndex]
                var result: Response = await originalMethod.apply(this, args);

                return result;

                if (session["sendCaptcha"]) {
                    var secret_key = ""
                    try {
                        return await new Promise((resolve, reject) => {
                            request.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${args[0].body.token}`,
                                {
                                    'headers': {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({}),
                                }, async function (error: any, response: any) {

                                    if (error) {
                                        return resolve(await originalMethod.apply(this, args))
                                    }
                                    var responseData = JSON.parse(response.body)

                                    if (responseData.success) {
                                        return resolve(await originalMethod.apply(this, args))
                                    }
                                    else {
                                        return resolve({
                                            status: 400,
                                            message: "کپتچا ارسال شود",
                                            data: {
                                                sendCaptcha: true
                                            }
                                        })
                                    }
                                })
                        })
                    } catch (error) {

                    }
                }
                else {
                    return await originalMethod.apply(this, args);
                }
            } catch (err) {
                throw err
            }
        };
        Object.defineProperty(propertyDescriptor.value, 'name', {
            writable: true,
            value: propertyKey
          });
        return propertyDescriptor;
    }
}

export function alertWrongLogIn(sessionIndex: number) {
    return (target: any,
        propertyKey: string,
        propertyDescriptor: PropertyDescriptor
    ): PropertyDescriptor => {
        propertyDescriptor = propertyDescriptor;

        const originalMethod = propertyDescriptor.value;


        propertyDescriptor.value = async function (...args: any[]): Promise<Response> {
            try {
                var result: Response = await originalMethod.apply(this, args);
                var session = args[sessionIndex]
                if (result != undefined) {
                    var systemConfig = new SystemConfigRepository()
                    if (result.status == 401 || result.status == 403) {
                        if (await systemConfig.isExists({
                            key: "admin-wrong-login-send-sms",
                            value: true
                        })) {
                            var admin = await this.adminRepository.findById(session["adminId"], {
                                phoneNumber: 1
                            })
                            try {
                                SmsMessager.send({
                                    parameters: {
                                        date: new Date().toLocaleString("fa-IR")
                                    },
                                    receptor: admin.phoneNumber,
                                    template: "alertWrongLogIn"
                                })
                            } catch (error) {
                                // return
                            }
                        }
                        if (await systemConfig.isExists({
                            key: "admin-wrong-login-send-email",
                            value: true
                        })) {

                        }
                    }
                }
                return result;
            } catch (err) {
                throw err;
            }
        };
        Object.defineProperty(propertyDescriptor.value, 'name', {
            writable: true,
            value: propertyKey
          });
        return propertyDescriptor;
    }
}

export function checkAdminBlock(sessionIndex : number) {
    return (target: any,
        propertyKey: string,
        propertyDescriptor: PropertyDescriptor
    ): PropertyDescriptor => {
        propertyDescriptor = propertyDescriptor;

        const originalMethod = propertyDescriptor.value;


        propertyDescriptor.value = async function(...args: any[]) :Promise<Response> {

            try {
                var session = args[sessionIndex]
                var blockList = await new BlockListRepository().findOne({
                    id: session["adminId"],
                    expireDate: {
                        $gte: new Date()
                    },
                    owner: "admin"
                })
                if (blockList != null) {
                    return {
                        status : 403,
                        data : {
                            expireDate: blockList.expireDate
                        },
                        message : "شما بلاک هستید"
                    }
                }
                var result: Response = await originalMethod.apply(this, args);
                return result;
            } catch (err) {
                throw err;
            }
        };
        Object.defineProperty(propertyDescriptor.value, 'name', {
            writable: true,
            value: propertyKey
          });
        return propertyDescriptor;
    }
}