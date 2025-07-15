import {Schema, model, Document, Types} from "mongoose";
import BaseUser from "../../../core/mongoose-controller/repositories/user/model";
import Basket from "../basket/model";


export default interface Address extends Document {
    // id: Types.ObjectId,
    user: string | BaseUser;
    addressList: {
        title: string,                    // عنوان آدرس (مثلاً: خانه، محل کار)
        receiver: {                       // اطلاعات گیرنده
            name: string,                 // نام گیرنده
            family: string,               // نام خانوادگی گیرنده
            phoneNumber: string,          // شماره تلفن گیرنده
        },
        country: string,                  // کشور
        province: string,                 // استان
        city: string,                     // شهر
        district: string,                 // منطقه/ناحیه
        street: string,                   // خیابان
        details: string,                  // جزئیات آدرس
        postalCode: string,               // کد پستی
        location?: {                      // موقعیت جغرافیایی (اختیاری)
            lat: number,                  // عرض جغرافیایی
            lng: number,                  // طول جغرافیایی
        },
        // isDefault: boolean,               // آدرس پیش‌فرض
        createdAt: Date,                  // تاریخ ایجاد
        updatedAt: Date,                  // تاریخ آخرین بروزرسانی
    }[];
}


const addressSchema = new Schema({
    user: {
        type: Types.ObjectId,
        required: true,
        ref: "user"
    },
    addressList: {
        type: [
            new Schema({
                title: {
                    type: String,
                    required: true
                },
                receiver: {
                    name: {
                        type: String,
                        required: true
                    },
                    family: {
                        type: String,
                        required: true
                    },
                    phoneNumber: {
                        type: String,
                        required: true
                    }
                },
                country: {
                    type: String,
                    required: true
                },
                province: {
                    type: String,
                    required: true
                },
                city: {
                    type: String,
                    required: true
                },
                district: {
                    type: String,
                    required: true
                },
                street: {
                    type: String,
                    required: true
                },
                details: {
                    type: String,
                    required: true
                },
                postalCode: {
                    type: String,
                    required: true
                },
                location: {
                    lat: {
                        type: Number,
                        required: false
                    },
                    lng: {
                        type: Number,
                        required: false
                    }
                },
                isDefault: {
                    type: Boolean,
                    required: true,
                    default: false
                },
                createdAt: {
                    type: Date,
                    required: true,
                    default: () => new Date()
                },
                updatedAt: {
                    type: Date,
                    required: true,
                    default: () => new Date()
                }
            }),
        ],
    },
});

export const AddressModel = model<Address>("address", addressSchema);

// اسکیما Zod برای اعتبارسنجی
// export const addressZod = z.object({
//     title: z.string(),
//     receiver: z.object({
//         name: z.string(),
//         family: z.string(),
//         phoneNumber: z.string()
//     }),
//     country: z.string(),
//     province: z.string(),
//     city: z.string(),
//     district: z.string(),
//     street: z.string(),
//     details: z.string(),
//     postalCode: z.string(),
//     location: z.object({
//         lat: z.number(),
//         lng: z.number()
//     }).optional(),
//     isDefault: z.boolean().optional()
// });
