import { Document } from "mongoose";
import BaseRepositoryService from "./mongoose-controller/repository";
import APIKeyRepository from "./mongoose-controller/repositories/apiKey/repository";

interface PermissionCheckList {
    func: Function,
    args: {
        index?: number,
        value?: any,
        getter?: Function
    }[],
}

var apiKeyRepo = new APIKeyRepository()
export default class Permission {



    static CheckPermit(checkList: PermissionCheckList[]) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            const originalMethod = descriptor.value;
            descriptor.value = async function (...args: any[]) {
                try {
                    for (let i = 0; i < checkList.length; i++) {
                        var funcArgs: any[] = []
                        var argss = checkList[i].args
                        for (let j = 0; j < argss.length; j++) {
                            if (argss[j].index) {
                                funcArgs.push(args[argss[j].index as number])
                            }
                            if (argss[j].value) {
                                funcArgs.push(argss[j].value)
                            }
                        }
                        if (await checkList[i].func.apply(this, funcArgs) == false){
                            return {
                                status : 401,
                                message : "not access"
                            }
                        }
                    }

                    var result = await originalMethod.apply(this, args);
                    return result;
                } catch (err) {
                    throw err;
                }
            };
            Object.defineProperty(descriptor.value, 'name', {
                writable: true,
                value: propertyKey
            });
            return descriptor;
        };
    }


    static APIKeyResover(index: number, partition: string, operatin: string, ipIndex: number) {
        return {
            func: Permission.checkExistsAPIKey,
            args: [
                {
                    index
                },
                {
                    value: partition
                },
                {
                    value: operatin
                },
                {
                    index: ipIndex
                }
            ]
        }
    }

    static checkExists(arg: any) {
        return arg != undefined
    }

    static async checkExistsRepo(repo: BaseRepositoryService<Document>, query: any) {
        return await repo.isExists(query)
    }

    static async checkExistsAPIKey(apiKey: string, partition: string, operatin: any, ip: string) {
        return await apiKeyRepo.isExists({
            token: {
                $eq: apiKey
            },
            $and: [
                {
                    $or: [
                        {
                            "permission.partition": partition,
                            "permission.type": "any"
                        },
                        {
                            permission: {
                                $elemMatch: {
                                    partition,
                                    "permissionData.actions": operatin
                                }
                            }
                        }
                    ],
                },

                {
                    $or: [
                        {
                            permission: {
                                $elemMatch: {
                                    partition,
                                    ips: {
                                        $size: 0
                                    }
                                }
                            }
                        },
                        {

                            permission: {
                                $elemMatch: {
                                    partition,
                                    ips: ip
                                }
                            }

                        }
                    ],
                }
            ]


        })
    }


    static async queryMaker(query: any, values: {
        map: string,
        value: any,
        fromIndex?: number
    }[]) {
        for (let i = 0; i < values.length; i++) {
            var map = values[i].map
            var maps = map.split(".")
            var value = values[i].value
            query = this.setData(query, maps, value)
        }
        return query
    }


    static setData(query: any, maps: string[], value: any) {
        if (maps.length == 0)
            return value
        var map = maps.shift() as string
        query[map] = this.setData(query[map], maps, value)
        return query
    }
}
