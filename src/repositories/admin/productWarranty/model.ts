import { Schema, model, Document, Types } from "mongoose";

export interface ProductWarranty extends Document {
    _id: Types.ObjectId;
    product: Types.ObjectId;
    warranty: Types.ObjectId;
    isDefault: boolean;
    customPrice?: number;
    isActive: boolean;
    createdBy: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const ProductWarrantySchema = new Schema<ProductWarranty>(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
            index: true,
        },
        warranty: {
            type: Schema.Types.ObjectId,
            ref: "Warranty",
            required: true,
            index: true,
        },
        isDefault: {
            type: Boolean,
            default: false,
            index: true,
        },
        customPrice: {
            type: Number,
            min: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "Admin",
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

ProductWarrantySchema.index({ product: 1, warranty: 1 }, { unique: true });
ProductWarrantySchema.index({ product: 1, isDefault: 1 });
ProductWarrantySchema.index({ product: 1, isActive: 1 });

export const ProductWarrantyModel = model<ProductWarranty>("ProductWarranty", ProductWarrantySchema);
export default ProductWarranty;