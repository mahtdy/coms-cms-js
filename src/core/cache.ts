

export default class CacheService {
    public prefix: string
    constructor(prefix: string){
        this.prefix = prefix + "_"
    }
    async get(key: string, part?: string): Promise<any> {
        return
    }

    async set(key: string, data: object | string, part?: string): Promise<any> {
       return
    }

    async setWithTtl(key: string, data: object | string, ttl: number): Promise<any> {
       return
    }

    async unset(key: string): Promise<any> {
        // return await cacheClient.DEL(this.prefix + key)
    }

}