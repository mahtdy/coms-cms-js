
import BaseController from "../controller";
import AdminCdnPermission from "../repositories/adminCdnPermission/model";
import AdminCdnPermissionRepository from "../repositories/adminCdnPermission/repository";
import CacheService from "../../cache";
import { z } from "zod"





var adminCdnPermission = new BaseController<AdminCdnPermission>("/adminCdnPermission",
    new AdminCdnPermissionRepository( {
        cacheService: new CacheService("adminCdnPermission")
    }), {
    insertSchema: z.object({
        admin: BaseController.id.describe("هر ادمین یک بار"),
        size: z.coerce.number().positive(),
        showTypes:z.array(z.string()).optional(),
        uploadTypes: z.array(z.string()).optional()
    })
}
)
// log.addRouteWithMeta("es/search", "get" , log.search.bind(log),BaseController.searcheMeta)

export default adminCdnPermission