import Warranty from "../../../repositories/admin/warranty/model";
import BaseController, {
    ControllerOptions,
} from "../../../core/mongoose-controller/controller";
import WarrantyRepository from "../../../repositories/admin/warranty/repository";
import { z } from "zod";
import { Response } from "../../../core/controller";
import { Get, Post, Put, Delete } from "../../../core/decorators/method";
import { Admin, Body, Query } from "../../../core/decorators/parameters";
import { AdminInfo } from "../../../core/mongoose-controller/auth/admin/admin-logIn";

export class WarrantyController extends BaseController<Warranty> {
    constructor(
        baseRoute: string,
        repo: WarrantyRepository,
        options?: ControllerOptions
    ) {
        super(baseRoute, repo, options);
    }

    @Get("/calculate-price")
    async calculateWarrantyPrice(
        @Query({
            destination: "warrantyId",
            schema: BaseController.id,
        })
        warrantyId: string,
        @Query({
            destination: "productPrice",
            schema: z.coerce.number().positive(),
        })
        productPrice: number
    ): Promise<Response> {
        const warranty = await this.repository.findById(warrantyId);
        if (!warranty) {
            return { status: 404, message: "گارانتی یافت نشد" };
        }

        let warrantyPrice = 0;

        switch (warranty.pricingType) {
            case "fixed":
                warrantyPrice = warranty.fixedPrice || 0;
                break;
            case "percentage":
                warrantyPrice = (productPrice * (warranty.percentagePrice || 0)) / 100;
                break;
            case "tiered":
                if (warranty.tieredPricing) {
                    const tier = warranty.tieredPricing.find(
                        t => productPrice >= t.minPrice && productPrice <= t.maxPrice
                    );
                    warrantyPrice = tier?.price || 0;
                }
                break;
        }

        return {
            status: 200,
            data: {
                warrantyPrice,
                warranty: {
                    id: warranty._id,
                    title: warranty.title,
                    duration: warranty.duration,
                    services: warranty.services,
                },
            },
        };
    }

    @Post("/feature-price")
    async calculateFeatureBasedPrice(
        @Body({
            schema: z.object({
                warrantyId: BaseController.id,
                selectedFeatures: z.array(z.object({
                    featureId: BaseController.id,
                    selectedValue: z.any(),
                })),
            }),
        })
        data: {
            warrantyId: string;
            selectedFeatures: Array<{
                featureId: string;
                selectedValue: any;
            }>;
        }
    ): Promise<Response> {
        const warranty = await this.repository.findById(data.warrantyId);
        if (!warranty) {
            return { status: 404, message: "گارانتی یافت نشد" };
        }

        let totalPrice = 0;

        if (warranty.pricingType === "feature_based" && warranty.featureBasedPricing) {
            for (const selectedFeature of data.selectedFeatures) {
                const featurePricing = warranty.featureBasedPricing.find(
                    fp => fp.featureId.toString() === selectedFeature.featureId
                );
                if (featurePricing) {
                    const valuePrice = featurePricing.valuePrices.find(
                        vp => vp.value === selectedFeature.selectedValue
                    );
                    if (valuePrice) {
                        totalPrice += valuePrice.additionalPrice;
                    }
                }
            }
        }

        return {
            status: 200,
            data: { warrantyPrice: totalPrice },
        };
    }
}

const warranty = new WarrantyController("/warranty", new WarrantyRepository(), {
    insertSchema: z.object({
        title: z.string().default("گارانتی ۱۲ ماهه شرکتی"),
        description: z.string().default("گارانتی کامل شامل تعمیر و تعویض قطعات").optional(),
        duration: z.object({
            value: z.coerce.number().positive().int().default(12),
            unit: z.enum(["day", "month", "year"]).default("month"),
        }),
        pricingType: z.enum(["fixed", "percentage", "feature_based", "tiered"]).default("percentage"),
        fixedPrice: z.coerce.number().positive().default(50000).optional(),
        percentagePrice: z.coerce.number().min(0).max(100).default(5).optional(),
        featureBasedPricing: z.array(z.object({
            featureId: BaseController.id,
            featureName: z.string().default("رنگ"),
            valuePrices: z.array(z.object({
                value: z.any().default("قرمز"),
                additionalPrice: z.coerce.number().default(10000),
            })),
        })).default([]).optional(),
        tieredPricing: z.array(z.object({
            minPrice: z.coerce.number().min(0).default(0),
            maxPrice: z.coerce.number().positive().default(1000000),
            price: z.coerce.number().min(0).default(25000),
        })).default([]).optional(),
        services: z.array(z.object({
            title: z.string().default("تعمیر رایگان"),
            description: z.string().default("تعمیر رایگان در مدت گارانتی").optional(),
            isIncluded: z.boolean().default(true),
        })).default([{title: "تعمیر رایگان", description: "تعمیر رایگان در مدت گارانتی", isIncluded: true}]),
        applicableCategories: z.array(BaseController.id).default([]).optional(),
        applicableBrands: z.array(BaseController.id).default([]).optional(),
        isActive: z.boolean().default(true),
        isPublic: z.boolean().default(true),
        displayOrder: z.coerce.number().default(0),
        terms: z.string().default("شرایط و ضوابط گارانتی طبق قوانین حمایت از حقوق مصرف کننده").optional(),
        validFrom: z.coerce.date().default(new Date()).optional(),
        validTo: z.coerce.date().default(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)).optional(),
    }),
});

export default warranty;