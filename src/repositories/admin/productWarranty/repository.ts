import BaseRepository from "../../../core/mongoose-controller/repository";
import ProductWarranty, { ProductWarrantyModel } from "./model";
import { Types } from "mongoose";

export default class ProductWarrantyRepository extends BaseRepository<ProductWarranty> {
    constructor() {
        super(ProductWarrantyModel);
    }

    async findProductWarranties(productId: string, activeOnly: boolean = true): Promise<ProductWarranty[]> {
        const filter: any = { product: new Types.ObjectId(productId) };
        if (activeOnly) {
            filter.isActive = true;
        }


        return this.findAll(filter, {
            population: [{ path: "warranty" }],
            sort: { isDefault: -1, createdAt: -1 },
        });
    }

    async findDefaultWarranty(productId: string): Promise<ProductWarranty | null> {
        return this.findOne({
            product: new Types.ObjectId(productId),
            isDefault: true,
            isActive: true,
        }, {
            population: [{ path: "warranty" }],
        });
    }

    async findProductsWithWarranty(warrantyId: string): Promise<ProductWarranty[]> {
        return this.findAll({
            warranty: new Types.ObjectId(warrantyId),
            isActive: true,
        }, {
            population: [{ path: "product", select: "title price image" }],
        });
    }
}