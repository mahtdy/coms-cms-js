import SmsMessager from "../../../messaging/smsMessager";
import BlockListRepository from "../../repositories/blocklist/repository"
import LoginHistoryRepository from "../../repositories/loginHistory/repository";
import RefreshTokenRepository from "../../repositories/refreshToken/repository";
import SystemConfigRepository from "../../repositories/system/repository";
interface expire {
    expire: number,
    hash : string
}

interface checkBlockType {
    isBlocked: boolean,
    expireDate?: Date
}

interface checkCaptchaType {
    captcha: boolean,
    session : any,
    type?: string
}

export default class AdminAuthenticator  {
    blockListRepository: BlockListRepository;
    refreshTokenRepo: RefreshTokenRepository
    constructor() {
        this.blockListRepository = new BlockListRepository();
        this.refreshTokenRepo = new RefreshTokenRepository();
    }

    async authenticate(session: any, payload: any, options: expire): Promise<any> {
        session['admin'] = payload
        try {
            await this.refreshTokenRepo.insert({
                refresh : options.hash,
                expire : new Date(Date.now() + options.expire + 300000),
                admin : payload._id
            } as any)
        } catch (error) {
            throw error
        }
        session.cookie.expires = new Date(Date.now() + options.expire)
        
        return session
    }

    isAuthenticate(session: any,): Boolean {
        var admin = session["admin"]
        if (admin == undefined) {
            return false
        }
        return true
    }

    public async checkBlock(admin?: any): Promise<checkBlockType> {

        var systemConfigRepo = new SystemConfigRepository()
        var blockListRepo = new BlockListRepository()
        var loginHistoryRepo = new LoginHistoryRepository()
        if (await systemConfigRepo.isExists({
            key: "admin-wrong-login-status",
            value: true
        })) {
            try {
                var blockList = await blockListRepo.findOne({
                    id: admin._id,
                    owner: "admin",
                    expireDate: {
                        $gte: new Date()
                    }
                })
            } catch (error) {
                return {
                    isBlocked: false
                }
            }

            var step = 1
            if (blockList != null) {
                step = blockList.step + 1
            }

            try {
                var loginHistory = await loginHistoryRepo.findOne({
                    owner: "admin",
                    id: admin._id
                })

            } catch (error) {
                return {
                    isBlocked: false
                }
            }
            
            if (loginHistory == null) {
                try {
                    await loginHistoryRepo.insert({
                        owner: "admin",
                        id: admin._id,
                        count: 1
                    } as unknown as any)
                    return {
                        isBlocked: false
                    }
                } catch (error) {
                    return {
                        isBlocked: false
                    }
                }

            }

            try {
                var blockCount = await systemConfigRepo.findOne({
                    key: "admin-wrong-login-blockcount" + step
                })

            } catch (error) {
                return {
                    isBlocked: false
                }
            }

            if (blockCount?.value <= loginHistory.count) {
                await loginHistoryRepo.deleteById(loginHistory._id)
                if (blockList != null) {
                    await blockListRepo.deleteById(blockList._id)
                }
                var blockTime = await systemConfigRepo.findOne({
                    key: "admin-wrong-login-blocktime" + step
                })
                var expireDate = new Date(Date.now() + 1000 * 60 * blockTime?.value)
                await blockListRepo.insert({
                    expireDate: expireDate,
                    id: admin._id,
                    owner: "admin",
                    step: step
                } as unknown as any)
                // if (port() == 5000)
                return {
                    isBlocked: true,
                    expireDate: expireDate
                }
                // else
                //     return { isBlocked: false }

            }
            else {
                await loginHistoryRepo.updateOne({
                    _id: loginHistory._id
                }, {
                    $inc: {
                        "count": 1
                    }
                })
                return {
                    isBlocked: false
                }
            }
        }
        return {
            isBlocked: false
        }
    }

    public async checkCaptcha( session :any , admin?: any ): Promise<checkCaptchaType | undefined> {
        return {
            captcha: false,
            session 
        }
        // var systemConfig = new SystemConfigRepository()
        // try {
        //     if (await systemConfig.isExists({
        //         key: "admin-wrong-login-captch",
        //         value: true
        //     })) {
        //         var wrongLoginCount = SessionHandler.get(req, "wrongLogInCount")
        //         if (wrongLoginCount == undefined) {
        //             SessionHandler.set(req, ["wrongLogInCount"], [1])
        //             return {
        //                 captcha: false
        //             }
        //         }
        //         wrongLoginCount += 1
        //         var wrongCount = await systemConfig.getConf("admin-wrong-login-captch-count")
        //         if (wrongCount != null && wrongCount.value <= wrongLoginCount) {
        //             SessionHandler.set(req, ["sendCaptcha"], [true])
        //             return {
        //                 captcha: true,checkBlockType
        //                 type: "1"
        //             }
        //         }

        //         else {
        //             SessionHandler.set(req, ["wrongLogInCount"], [wrongLoginCount])
        //             return {
        //                 captcha: false
        //             }
        //         }checkBlockType
        //     }
        // } catch (error) {
        //     return {
        //         captcha: false
        //     }
        // }

    }

    public async alertWrongLogIn(admin: any) {
        var systemConfig = new SystemConfigRepository()
        if (await systemConfig.isExists({
            key: "admin-wrong-login-send-sms",
            value: true
        })) {
            try {
                await SmsMessager.send({
                    parameters: {
                        date: new Date().toLocaleString("fa-IR")
                    },
                    receptor: admin.phoneNumber,
                    template: "alertWrongLogIn"
                })
            } catch (error) {
            }
        }
        if (await systemConfig.isExists({
            key: "admin-wrong-login-send-email",
            value: true
        })) {

        }
    }

}