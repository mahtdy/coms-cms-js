import ConfigService from "../../../services/config";
import JwtStrategy from "./jwtStrategy";

export interface UserInfo {
    name: string,
    family: string,
    id: string,
    phoneNumber: string,
    email?: string
}

export default class UserAuthenticator extends JwtStrategy {

    constructor() {
        super(ConfigService.getConfig("jwtSecret"))
    }

    isAuthenticate(token: string): UserInfo {

        try {
            return this.decode(token) as UserInfo
        } catch (error) {
            throw error
        }
    }

    authenticate(payload: UserInfo) : string {
        try {
            return this.sign(payload)
        } catch (error) {
            throw error
        }
    }

}