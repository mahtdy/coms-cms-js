
import BaseController, { ControllerOptions } from "../controller";
import FileManagerPermission from "../repositories/fileManagerPermission/model";
import FileManagerPermissionRepository from "../repositories/fileManagerPermission/repository"
import CacheService from "../../cache";
import { z } from "zod"
import { Get, Post } from "../../decorators/method";
import { Admin, Body, Query, Session } from "../../decorators/parameters";
import { AdminInfo } from "../auth/admin/admin-logIn";
import { Response } from "../../controller";
import SystemConfigRepository from "../repositories/system/repository";

export class FileManagerPermissionController extends BaseController<FileManagerPermission>{
    systemConfRepo: SystemConfigRepository
    constructor(baseRoute: string, repo: FileManagerPermissionRepository, options?: ControllerOptions) {
        super(baseRoute, repo, options)
        this.systemConfRepo = new SystemConfigRepository()
    }

    @Get("/current")
    async getCurrentPermission(
        @Query({
            destination: "path",
            schema: z.string()
        }) path: string,
        @Admin() admin: AdminInfo,
        @Session() session: any
    ): Promise<Response> {
        let fileManager = session["fileManager"]
        if (!fileManager) {
            return {
                status: 500,
                message: "سرور فایل تنظیم نشده است"
            }
        }
        try {
            var data = await this.repository.findOne({
                admin: admin._id,
                cdn: fileManager._id,
                "pathsPermission.path": path
            }, {
                projection: {
                    "pathsPermission.$": 1
                }
            })
            return {
                status: 200,
                data: data?.pathsPermission[0] || {}
            }
        } catch (error) {
            throw error
        }
    }

    @Get("/configs")
    getConfigs(
        @Query({
            destination: "path",
            schema: z.string()
        }) path: string,
        @Query({
            destination: "cdn",
            schema: BaseController.id
        }) cdn: string,
        @Query({
            destination: "admin",
            schema: BaseController.id
        }) admin: string,
    ) {

    }

    @Post("")
    async editPermission(
        @Body({
            schema: z.object({
                admin: BaseController.id,
                cdn: BaseController.id,
                pathsPermission: z.object(
                    {
                        path: z.string(),
                        allowedActions: z.array(z.enum([
                            'zip',
                            'unzip',
                            'view',
                            'copy',
                            'delete',
                            'upload',
                            'rename',
                            'directory',
                            'delete-directory',
                            'rename-directory',
                            'move',
                            'permission'
                        ])),
                        showType: z.array(z.string()).optional(),
                        uploadTypes: z.array(z.string()).optional(),
                        recurcive: z.boolean().default(true),
                        status: z.boolean().default(true)
                    }
                ),
                size: z.number().positive().default(0)
            })
        }) body: any
    ) {
        try {
            let isExists = await this.repository.isExists({
                admin: body.admin,
                cdn: body.cdn
            })
            if (!isExists) {
                return this.create(body)
            }


            isExists = await this.repository.isExists({
                admin: body.admin,
                cdn: body.cdn,
                "pathsPermission.path": body.pathsPermission.path
            })

            if (isExists) {
                return this.editOne({
                    admin: body.admin,
                    cdn: body.cdn,
                    "pathsPermission.path": body.pathsPermission.path
                }, {
                    $set: {
                        size: body.size,
                        "pathsPermission.$": body.pathsPermission
                    }
                }, {
                    ok: true
                })
            }
            return this.editOne({
                admin: body.admin,
                cdn: body.cdn
            }, {
                $set: {
                    size: body.size,
                },
                $push: {
                    "pathsPermission": body.pathsPermission
                }
            }, {
                ok: true
            })


        } catch (error) {
            throw error
        }

    }

    @Get("")
    async getPermission(
        @Query({
            destination: "admin",
            schema: BaseController.id
        }) admin: string,
        @Query({
            destination: "cdn",
            schema: BaseController.id
        }) cdn: string
    ) {

        return this.findOne({
            admin,
            cdn
        })
    }

    @Get("/by-path")
    async getPermissionByPath(
        @Query({
            destination: "admin",
            schema: BaseController.id
        }) admin: string,
        @Query({
            destination: "cdn",
            schema: BaseController.id
        }) cdn: string,
        @Query({
            destination: "path",
            schema: z.string()
        }) path: string
    ): Promise<Response> {

        try {
            var data = await this.repository.findOne({
                admin: admin,
                cdn: cdn,
                "pathsPermission.path": path
            }, {
                projection: {
                    "pathsPermission.$": 1
                }
            })
            if (data == null) {
                return {
                    status: 404
                }
            }
            return {
                status: 200,
                data: data?.pathsPermission[0] || {}
            }
        } catch (error) {
            throw error
        }
    }

    @Post("/disable")
    async disable(
        @Body({
            destination: "admin",
            schema: BaseController.id
        }) admin: string,
        @Body({
            destination: "cdn",
            schema: BaseController.id
        }) cdn: string,
        @Body({
            destination: "path",
            schema: z.string().default("")
        }) path: string
    ) {

        if (path == "") {
            path = "/"
        }

        let isExists = await this.repository.isExists({
            admin: admin,
            cdn: cdn,
            "pathsPermission.path": path
        })
        if (!isExists) {
            return this.editOne({
                admin: admin,
                cdn: cdn,
            }, {
                $push: {
                    pathsPermission: {
                        path,
                        allowedActions: [],
                        showType: [],
                        uploadTypes: [],
                        recurcive: true,
                        status: false
                    }
                }
            })
        }

        return this.editOne({
            admin: admin,
            cdn: cdn,
            "pathsPermission.path": path
        }, {
            $set: {
                "pathsPermission.$.status": false
            }
        }, {
            ok: true
        })

    }

    @Post("/enable")
    async enable(
        @Body({
            destination: "admin",
            schema: BaseController.id
        }) admin: string,
        @Body({
            destination: "cdn",
            schema: BaseController.id
        }) cdn: string,
        @Body({
            destination: "path",
            schema: z.string().default("")
        }) path: string
    ) {

        if (path == "") {
            path = "/"
        }
        let isExists = await this.repository.isExists({
            admin: admin,
            cdn: cdn,
            "pathsPermission.path": path
        })
        if (!isExists) {
            return this.editOne({
                admin: admin,
                cdn: cdn,
            }, {
                $push: {
                    pathsPermission: {
                        path,
                        allowedActions: [],
                        showType: [],
                        uploadTypes: [],
                        recurcive: true,
                        status: true
                    }
                }
            })
        }
        return this.editOne({
            admin: admin,
            cdn: cdn,
            "pathsPermission.path": path
        }, {
            $set: {
                "pathsPermission.$.status": true
            }
        }, {
            ok: true
        })

    }

    @Post("/delete")
    async deletePath(
        @Body({
            destination: "admin",
            schema: BaseController.id
        }) admin: string,
        @Body({
            destination: "cdn",
            schema: BaseController.id
        }) cdn: string,
        @Body({
            destination: "path",
            schema: z.string()
        }) path: string
    ) {
        try {
            return this.editOne({
                admin,
                cdn
            }, {
                $pull: {
                    "pathsPermission": {
                        path
                    }
                }
            }, {
                ok: true
            })
        } catch (error) {
            throw error
        }
    }


    @Post("/ext")
    async addExtName(
        @Body({
            destination: "type",
            schema: z.enum(["show", "upload"])
        }) type: string,
        @Body({
            destination: "ext",
            schema: z.string()
        }) ext: string
    ): Promise<Response> {
        try {
            let conf = await this.systemConfRepo.getConfigValue("cdn_" + type)
            if (conf == undefined) {
                conf = []
                await this.systemConfRepo.insert({
                    key: "cdn_" + type,
                    value: [],
                    type: "Array"
                } as any)
            }
            if (!conf.includes(ext)) {
                conf.push(ext)
            }

            await this.systemConfRepo.updateOne({
                key: "cdn_" + type
            }, {
                $set: {
                    value: conf
                }
            })

            return {
                status: 200
            }

        } catch (error) {
            throw error
        }
    }


    @Get("/ext")
    async getExtName() {
        try {

            let showConf = await this.systemConfRepo.getConfigValue("cdn_" + "show")
            if (showConf == undefined) {
                showConf = []
            }


            let uploadConf = await this.systemConfRepo.getConfigValue("cdn_" + "upload")
            if (uploadConf == undefined) {
                uploadConf = []
            }

            return {
                status: 200,
                data: {
                    uploadConf,
                    showConf
                }
            }

        } catch (error) {
            throw error
        }
    }

    initApis(): void {

    }
}




var fileManagerPermission = new FileManagerPermissionController("/fileManagerPermission",
    new FileManagerPermissionRepository({
        cacheService: new CacheService("fileManagerPermission")
    }), {
    insertSchema: z.object({
        admin: BaseController.id,
        cdn: BaseController.id,
        path: z.string(),
        allowedActions: z.enum([
            'zip',
            'unzip',
            'view',
            'copy',
            'delete',
            'upload',
            'rename',
            'directory',
            'delete-directory',
            'rename-directory',
            'move'
        ])
    })
}
)
// log.addRouteWithMeta("es/search", "get" , log.search.bind(log),BaseController.searcheMeta)

export default fileManagerPermission
