import { Schema, model, Document, Types } from "mongoose";

export type TimeUnit = "day" | "month" | "year";
export type PricingType = "fixed" | "percentage" | "feature_based" | "tiered";

export interface WarrantyDuration {
    value: number;
    unit: TimeUnit;
}

export interface WarrantyService {
    title: string;
    description?: string;
    isIncluded: boolean;
}

export interface FeatureBasedPricing {
    featureId: Types.ObjectId;
    featureName: string;
    valuePrices: Array<{
        value: any;
        additionalPrice: number;
    }>;
}

export interface TieredPricing {
    minPrice: number;
    maxPrice: number;
    price: number;
}

export interface Warranty extends Document {
    _id: Types.ObjectId;
    title: string;
    description?: string;
    duration: WarrantyDuration;
    pricingType: PricingType;
    fixedPrice?: number;
    percentagePrice?: number;
    featureBasedPricing?: FeatureBasedPricing[];
    tieredPricing?: TieredPricing[];
    services: WarrantyService[];
    applicableCategories?: Types.ObjectId[];
    applicableBrands?: Types.ObjectId[];
    isActive: boolean;
    isPublic: boolean;
    displayOrder: number;
    terms?: string;
    validFrom?: Date;
    validTo?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const WarrantySchema = new Schema<Warranty>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        description: {
            type: String,
            trim: true,
        },
        duration: {
            value: {
                type: Number,
                required: true,
                min: 1,
            },
            unit: {
                type: String,
                required: true,
                enum: ["day", "month", "year"],
            },
        },
        pricingType: {
            type: String,
            required: true,
            enum: ["fixed", "percentage", "feature_based", "tiered"],
            index: true,
        },
        fixedPrice: {
            type: Number,
            min: 0,
        },
        percentagePrice: {
            type: Number,
            min: 0,
            max: 100,
        },
        featureBasedPricing: [{
            featureId: {
                type: Schema.Types.ObjectId,
                required: true,
            },
            featureName: {
                type: String,
                required: true,
            },
            valuePrices: [{
                value: Schema.Types.Mixed,
                additionalPrice: {
                    type: Number,
                    required: true,
                },
            }],
        }],
        tieredPricing: [{
            minPrice: {
                type: Number,
                required: true,
                min: 0,
            },
            maxPrice: {
                type: Number,
                required: true,
                min: 0,
            },
            price: {
                type: Number,
                required: true,
                min: 0,
            },
        }],
        services: [{
            title: {
                type: String,
                required: true,
            },
            description: String,
            isIncluded: {
                type: Boolean,
                default: true,
            },
        }],
        applicableCategories: [{
            type: Schema.Types.ObjectId,
            ref: "Category",
        }],
        applicableBrands: [{
            type: Schema.Types.ObjectId,
            ref: "Brand",
        }],
        isActive: {
            type: Boolean,
            default: true,
            index: true,
        },
        isPublic: {
            type: Boolean,
            default: true,
            index: true,
        },
        displayOrder: {
            type: Number,
            default: 0,
            index: true,
        },
        terms: String,
        validFrom: Date,
        validTo: Date,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

WarrantySchema.index({ isActive: 1, isPublic: 1, displayOrder: 1 });
WarrantySchema.index({ applicableCategories: 1, isActive: 1 });
WarrantySchema.index({ applicableBrands: 1, isActive: 1 });

export const WarrantyModel = model<Warranty>("Warranty", WarrantySchema);
export default Warranty;