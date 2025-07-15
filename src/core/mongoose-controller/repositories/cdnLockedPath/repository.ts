import BaseRepositoryService, { RepositoryConfigOptions } from "../../repository";
import CDN_LockedPath, { CDN_LockedPathModel } from "./model";



export default class CDN_LockedPathRepository extends BaseRepositoryService<CDN_LockedPath> {
    constructor(options?: RepositoryConfigOptions) {
        super(CDN_LockedPathModel, options)
    }

    async clearProccesses() {
        try {
            this.updateMany({}, {
                $set: {
                    paths: []
                }
            })
        } catch (error) {

        }
    }
    

    async addPath(cdn: string, path: string) {
        if (typeof cdn != "string")
            return
        try {
            if (path == "") {
                return
            }
            if (!path.includes(".") && !path.endsWith("/")) {
                path += "/"
            }
            let doc = await this.findOneAndUpdate({
                cdn
            }, {
                $addToSet: {
                    paths: path
                }
            })

            if (doc == null) {
                await this.insert({
                    cdn,
                    paths: [path]
                } as any)
            }
        } catch (error) {
            throw error
        }
    }


    async addPaths(cdn: string, paths: string[]) {
        if (typeof cdn != "string")
            return
        try {
            for (let i = 0; i < paths.length; i++) {
                if (!paths[i].includes(".") && !paths[i].endsWith("/")) {
                    paths[i] += "/"
                }
            }
            let doc = await this.findOneAndUpdate({
                cdn
            }, {
                $addToSet: {
                    paths
                }
            })
            if (doc == null) {
                await this.insert({
                    cdn,
                    paths
                } as any)
            }
        } catch (error) {
            throw error

        }
    }

    async deletePath(cdn: string, path: string) {
        if (typeof cdn != "string")
            return
        try {
            if (!path.includes(".") && !path.endsWith("/")) {
                path += "/"
            }
            return await this.updateOne({
                cdn
            }, {
                $pull: {
                    paths: path
                }
            })
        } catch (error) {
            throw error
        }
    }




    async deletePaths(cdn: string, paths: string[]) {
        if (typeof cdn != "string")
            return
        try {
            for (let i = 0; i < paths.length; i++) {
                if (!paths[i].includes(".") && !paths[i].endsWith("/")) {
                    paths[i] += "/"
                }
            }
            return await this.updateOne({
                cdn
            }, {
                $pull: {
                    paths: {
                        $in: paths
                    }
                }
            })
        } catch (error) {
            throw error
        }
    }
}