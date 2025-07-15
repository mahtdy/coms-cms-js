import ProductWarranty from "../../../repositories/admin/productWarranty/model";
import BaseController, {
    ControllerOptions,
} from "../../../core/mongoose-controller/controller";
import ProductWarrantyRepository from "../../../repositories/admin/productWarranty/repository";
import { z } from "zod";
import { Response } from "../../../core/controller";
import { Get, Post, Delete } from "../../../core/decorators/method";
import { Admin, Body, Query } from "../../../core/decorators/parameters";
import { AdminInfo } from "../../../core/mongoose-controller/auth/admin/admin-logIn";
import WarrantyRepository from "../../../repositories/admin/warranty/repository";
import ProductRepository from "../../../repositories/admin/product/repository";
import CategoryRepository from "../../../core/mongoose-controller/repositories/category/repository";
// import CategoryRepository from "../../../core/mongoose-controller/repositories/category/repository";

export class ProductWarrantyController extends BaseController<ProductWarranty> {
    private warrantyRepo: WarrantyRepository;
    private productRepo: ProductRepository;
    catRepo: CategoryRepository;
    constructor(
        baseRoute: string,
        repo: ProductWarrantyRepository,
        options?: ControllerOptions
    ) {
        super(baseRoute, repo, options);
        this.warrantyRepo = new WarrantyRepository();
        this.productRepo = new ProductRepository();
        this.catRepo = new CategoryRepository();

    }

    @Get("/product/:productId/available")
    async getAvailableWarrantiesForProduct(
        @Query({
            destination: "productId",
            schema: BaseController.id,
        })
        productId: string
    ): Promise<Response> {
        const product = await this.productRepo.findById(productId);
        if (!product) {
            return { status: 404, message: "محصول یافت نشد" };
        }

        const warranties = await this.warrantyRepo.findApplicableWarranties(
            product.category.toString(),
            product.brand?.toString(),
            true
        );

        const warrantiesWithPrice = await Promise.all(
            warranties.map(async (warranty) => {
                let calculatedPrice = 0;

                switch (warranty.pricingType) {
                    case "fixed":
                        calculatedPrice = warranty.fixedPrice || 0;
                        break;
                    case "percentage":
                        calculatedPrice = (product.price * (warranty.percentagePrice || 0)) / 100;
                        break;
                    case "tiered":
                        if (warranty.tieredPricing) {
                            const tier = warranty.tieredPricing.find(
                                t => product.price >= t.minPrice && product.price <= t.maxPrice
                            );
                            calculatedPrice = tier?.price || 0;
                        }
                        break;
                    case "feature_based":
                        calculatedPrice = 0;
                        break;
                }

                return {
                    id: warranty._id,
                    title: warranty.title,
                    description: warranty.description,
                    duration: warranty.duration,
                    services: warranty.services,
                    pricingType: warranty.pricingType,
                    calculatedPrice,
                    featureBasedPricing: warranty.featureBasedPricing,
                    terms: warranty.terms,
                };
            })
        );

        return {
            status: 200,
            data: warrantiesWithPrice,
        };
    }

    @Post("/calculate-final-price")
    async calculateFinalWarrantyPrice(
        @Body({
            schema: z.object({
                productId: BaseController.id,
                warrantyId: BaseController.id,
                selectedFeatures: z.array(z.object({
                    featureId: BaseController.id,
                    selectedValue: z.any(),
                })).optional(),
            }),
        })
        data: {
            productId: string;
            warrantyId: string;
            selectedFeatures?: Array<{
                featureId: string;
                selectedValue: any;
            }>;
        }
    ): Promise<Response> {
        const [product, warranty] = await Promise.all([
            this.productRepo.findById(data.productId),
            this.warrantyRepo.findById(data.warrantyId),
        ]);

        if (!product) {
            return { status: 404, message: "محصول یافت نشد" };
        }

        if (!warranty) {
            return { status: 404, message: "گارانتی یافت نشد" };
        }

        let finalPrice = 0;

        switch (warranty.pricingType) {
            case "fixed":
                finalPrice = warranty.fixedPrice || 0;
                break;

            case "percentage":
                finalPrice = (product.price * (warranty.percentagePrice || 0)) / 100;
                break;

            case "tiered":
                if (warranty.tieredPricing) {
                    const tier = warranty.tieredPricing.find(
                        t => product.price >= t.minPrice && product.price <= t.maxPrice
                    );
                    finalPrice = tier?.price || 0;
                }
                break;

            case "feature_based":
                if (data.selectedFeatures && warranty.featureBasedPricing) {
                    for (const selectedFeature of data.selectedFeatures) {
                        const featurePricing = warranty.featureBasedPricing.find(
                            fp => fp.featureId.toString() === selectedFeature.featureId
                        );
                        if (featurePricing) {
                            const valuePrice = featurePricing.valuePrices.find(
                                vp => vp.value === selectedFeature.selectedValue
                            );
                            if (valuePrice) {
                                finalPrice += valuePrice.additionalPrice;
                            }
                        }
                    }
                }
                break;
        }

        return {
            status: 200,
            data: {
                warrantyPrice: finalPrice,
                productPrice: product.price,
                totalPrice: product.price + finalPrice,
                warranty: {
                    id: warranty._id,
                    title: warranty.title,
                    duration: warranty.duration,
                    services: warranty.services,
                },
            },
        };
    }

    @Post("/assign")
    async assignWarrantyToProduct(
        @Admin() admin: AdminInfo,
        @Body({
            schema: z.object({
                productId: BaseController.id,
                warrantyId: BaseController.id,
                isDefault: z.boolean().default(false),
                customPrice: z.coerce.number().optional(),
            }),
        })
        data: {
            productId: string;
            warrantyId: string;
            isDefault: boolean;
            customPrice?: number;
        }
    ): Promise<Response> {
        const [product, warranty] = await Promise.all([
            this.productRepo.findById(data.productId),
            this.warrantyRepo.findById(data.warrantyId),
        ]);

        if (!product) {
            return { status: 404, message: "محصول یافت نشد" };
        }

        if (!warranty) {
            return { status: 404, message: "گارانتی یافت نشد" };
        }

        const existingConnection = await this.repository.findOne({
            product: data.productId,
            warranty: data.warrantyId,
        });

        if (existingConnection) {
            return { status: 400, message: "این گارانتی قبلاً به محصول اتصال داده شده است" };
        }

        if (data.isDefault) {
            await this.repository.updateMany(
                { product: data.productId, isDefault: true },
                { $set: { isDefault: false } }
            );
        }

        const productWarranty = await this.repository.insert({
            product: product._id,
            warranty: warranty._id,
            isDefault: data.isDefault,
            customPrice: data.customPrice,
            isActive: true,
            createdBy: admin._id,
            createdAt: new Date(),
        }  as unknown as ProductWarranty);

        return {
            status: 200,
            message: "گارانتی با موفقیت به محصول اتصال داده شد",
            data: productWarranty,
        };
    }

    @Delete("/unassign")
    async unassignWarrantyFromProduct(
        @Admin() admin: AdminInfo,
        @Query({
            destination: "productId",
            schema: BaseController.id,
        })
        productId: string,
        @Query({
            destination: "warrantyId",
            schema: BaseController.id,
        })
        warrantyId: string
    ): Promise<Response> {
        const result = await this.repository.deleteOne({
            product: productId,
            warranty: warrantyId,
        });

        if (result.deletedCount === 0) {
            return { status: 404, message: "اتصال گارانتی یافت نشد" };
        }

        return {
            status: 200,
            message: "اتصال گارانتی با موفقیت حذف شد",
        };
    }
}

const productWarranty = new ProductWarrantyController(
    "/product-warranty",
    new ProductWarrantyRepository(),
    {
        insertSchema: z.object({
            product: BaseController.id,
            warranty: BaseController.id,
            isDefault: z.boolean().default(false),
            customPrice: z.coerce.number().default(30000).optional(),
            isActive: z.boolean().default(true),
            createdBy: BaseController.id,
        }),
    }
);

export default productWarranty;