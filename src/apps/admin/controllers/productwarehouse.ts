import Productwarehouse from "../../../repositories/admin/productWarehouse/model";
import BaseController, {
    ControllerOptions,
} from "../../../core/mongoose-controller/controller";
import ProductWarehouseRepository from "../../../repositories/admin/productWarehouse/repository";
import {any, string, z} from "zod";
import {time} from "speakeasy";

export class ProductwarehouseController extends BaseController<Productwarehouse> {
    constructor(
        baseRoute: string,
        repo: ProductWarehouseRepository,
        options?: ControllerOptions
    ) {
        super(baseRoute, repo, options);
    }

    initApis() {
        super.initApis();
    }
}

const productwarehouse = new ProductwarehouseController(
    "/productwarehouse",
    new ProductWarehouseRepository(),
    {
        insertSchema: z.object({
            product: BaseController.id,
            warehouse: BaseController.id,
            config: any().optional(),
            lastUpdated: string(),
            price: z.coerce.number().positive().int().default(100),
            purchasePrice: z.coerce.number().positive().int().default(85),
            minStockThreshold: z.coerce.number().positive().int().default(5),
            quantity: z.coerce.number().positive().int().default(10),
        }),
    }
);
export default productwarehouse;
