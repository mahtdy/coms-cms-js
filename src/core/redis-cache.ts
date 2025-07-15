import redis from "ioredis"
import CacheService from "./cache";
const redisClient = redis.createClient()

export default class RedisCache extends CacheService{
    async get(key: string, part?: string): Promise<any> {
        var p = part || ""
        return new Promise((resolve, reject) => {
            redisClient.get(this.prefix + p + key, function (err, data) {
                if (err) return reject(err)
                return resolve(data)
            })
        })
    }

    async set(key: string, data: object | string, part?: string): Promise<any> {
        var p = part || ""
        if (typeof data != "string") {
            data = JSON.stringify(data)
        }
        return await redisClient.set(this.prefix + p + key, data)
    }

    async setWithTtl(key: string, data: object | string, ttl: number): Promise<any> {
        if (typeof data != "string") {
            data = JSON.stringify(data)
        }
        return await redisClient.set(this.prefix + key, data, 'EX', ttl)
    }

    async unset(key: string): Promise<any> {
        return await redisClient.del(this.prefix + key)
    }
}