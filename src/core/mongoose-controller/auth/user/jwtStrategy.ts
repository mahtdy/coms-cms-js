
import jwt from "jsonwebtoken"


export default class JwtStrategy {
    private key: string | undefined;

    constructor(key: string | undefined) {
        this.key = key
    }

    sign(payload: string | object): string {
        return jwt.sign(payload, this.key as string, {
            // algorithm: jwtAlgorihtm
        })
    }

    decode(token: string = ''): string | object {
        return jwt.verify(token, this.key as string)

    }
}