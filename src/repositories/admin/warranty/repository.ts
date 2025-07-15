import BaseRepository from "../../../core/mongoose-controller/repository";
import Warranty, { WarrantyModel } from "./model";
import { Types } from "mongoose";

export default class WarrantyRepository extends BaseRepository<Warranty> {
    constructor() {
        super(WarrantyModel);
    }

    async findApplicableWarranties(
        categoryId?: string,
        brandId?: string,
        isPublic: boolean = true
    ): Promise<Warranty[]> {
        const filter: any = {
            isActive: true,
            isPublic,
            $or: [
                { applicableCategories: { $exists: false } },
                { applicableCategories: { $size: 0 } },
                ...(categoryId ? [{ applicableCategories: { $in: [new Types.ObjectId(categoryId)] } }] : []),
            ],
        };

        if (brandId) {
            filter.$and = [
                {
                    $or: [
                        { applicableBrands: { $exists: false } },
                        { applicableBrands: { $size: 0 } },
                        { applicableBrands: { $in: [new Types.ObjectId(brandId)] } },
                    ],
                },
            ];
        }

        return this.findAll(filter, {
            sort: { displayOrder: 1, createdAt: -1 },
        });
    }

    async findActiveWarranties(): Promise<Warranty[]> {
        return this.findAll(
            {
                isActive: true,
                $or: [
                    { validFrom: { $exists: false } },
                    { validFrom: { $lte: new Date() } },
                ],
                $and: [
                    {
                        $or: [
                            { validTo: { $exists: false } },
                            { validTo: { $gte: new Date() } },
                        ],
                    },
                ],
            },
            {
                sort: { displayOrder: 1, title: 1 },
            }
        );
    }
}