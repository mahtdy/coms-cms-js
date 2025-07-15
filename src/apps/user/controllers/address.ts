import {Body, User} from "../../../core/decorators/parameters";
import {Response} from "../../../core/controller";
import BaseController, {ControllerOptions} from "../../../core/mongoose-controller/controller";
import {Get, Post, Put, Delete} from "../../../core/decorators/method";
import {UserInfo} from "../../../core/mongoose-controller/auth/user/userAuthenticator";
import Address from "../../../repositories/admin/address/model";
import AddressRepository from "../../../repositories/admin/address/repository";
import ProductRepository from "../../../repositories/admin/product/repository";
import ProductWarehouseRepository from "../../../repositories/admin/productWarehouse/repository";
import OrderRepository from "../../../repositories/admin/order/repository";
import BasketRepository from "../../../repositories/admin/basket/repository";
import z from "zod";
import basket, {BasketController} from "../../admin/controllers/basket";

export class AddressController extends BaseController<Address> {
    // proRepo: ProductRepository;
    // prowareRepo: ProductWarehouseRepository;
    // orderRepo: OrderRepository;
    addressRepo: AddressRepository;

    constructor(
        baseRoute: string,
        repo: AddressRepository,
        options?: ControllerOptions
    ) {
        super(baseRoute, repo, options);
        this.addressRepo = new AddressRepository();
    }


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
//     initApis() {
//         super.initApis();
//     }

    // دریافت تمام آدرس‌های کاربر
    @Get("/", {
        apiDoc: {
            security: [
                {
                    BasicAuth: [],
                },
            ],
        },
    })
    async getUserAddresses(@User() user: UserInfo): Promise<Response> {
        try {
            const addresses = await (this.repository as AddressRepository).findByUserId(user.id || "");
            return {
                status: 200,
                data: addresses
            };
        } catch (error) {
            throw error;
        }
    }

    // دریافت یک آدرس خاص
    @Get("/:id", {
        apiDoc: {
            security: [
                {
                    BasicAuth: [],
                },
            ],
        },
    })
    async getAddress(@User() user: UserInfo, @Body({destination: "id"}) addressId: string): Promise<Response> {
        try {
            const address = await this.repository.findById(addressId);

            // بررسی مالکیت آدرس
            if (!address || address.user.toString() !== user.id) {
                return {
                    status: 404,
                    message: "آدرس مورد نظر یافت نشد"
                };
            }

            return {
                status: 200,
                data: address
            };
        } catch (error) {
            throw error;
        }
    }

    // // افزودن آدرس جدید
    // @Post("/", {
    //     apiDoc: {
    //         security: [
    //             {
    //                 BasicAuth: [],
    //             },
    //         ],
    //     },
    // })
    // async addAddress(
    //     @User() user: UserInfo,
    //     @Body({
    //         schema: z.object({
    //             title: z.string(),
    //             receiver: z.object({
    //                 name: z.string(),
    //                 family: z.string(),
    //                 phoneNumber: z.string()
    //             }),
    //             country: z.string(),
    //             province: z.string(),
    //             city: z.string(),
    //             district: z.string(),
    //             street: z.string(),
    //             details: z.string(),
    //             postalCode: z.string(),
    //             location: z.object({
    //                 lat: z.number(),
    //                 lng: z.number()
    //             }).optional(),
    //             isDefault: z.boolean().optional(),
    //         }),
    //     })
    //     addressData: {
    //         title: string,
    //         receiver: {
    //             name: string,
    //             family: string,
    //             phoneNumber: string
    //         },
    //         country: string,
    //         province: string,
    //         city: string,
    //         district: string,
    //         street: string,
    //         details: string,
    //         postalCode: string,
    //         location: {
    //             lat: number,
    //             lng: number
    //         },
    //         isDefault: boolean,
    //     }
    // ): Promise<Response> {
    //     try {
    //         // addressData.user = user.id;
    //
    //         const address = await (this.repository).addAddress(addressData);
    //
    //         return {
    //             status: 200,
    //             message: "آدرس با موفقیت اضافه شد",
    //             data: address
    //         };
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // ویرایش آدرس
    // @Put("/:id", {
    //     apiDoc: {
    //         security: [
    //             {
    //                 BasicAuth: [],
    //             },
    //         ],
    //     },
    // })
    // async updateAddress(
    //     @Body({
    //         destination: "id"
    //     }) addressId: string,
    //     @Body({
    //         schema: z.object({
    //             title: z.string(),
    //             receiver: z.object({
    //                 name: z.string(),
    //                 family: z.string(),
    //                 phoneNumber: z.string()
    //             }),
    //             country: z.string(),
    //             province: z.string(),
    //             city: z.string(),
    //             district: z.string(),
    //             street: z.string(),
    //             details: z.string(),
    //             postalCode: z.string(),
    //             location: z.object({
    //                 lat: z.number(),
    //                 lng: z.number()
    //             }).optional(),
    //             isDefault: z.boolean().optional(),
    //         }),
    //     })
    //     addressData: {
    //         title: string,
    //         receiver: {
    //             name: string,
    //             family: string,
    //             phoneNumber: string
    //         },
    //         country: string,
    //         province: string,
    //         city: string,
    //         district: string,
    //         street: string,
    //         details: string,
    //         postalCode: string,
    //         location: {
    //             lat: number,
    //             lng: number
    //         },
    //         isDefault: boolean,
    //     },
    //     @User() user: UserInfo
    // ): Promise<Response> {
    //     try {
    //         const existingAddress = await this.repository.findById(addressId);
    //         if (!existingAddress || existingAddress.user.toString() !== user.id) {
    //             return {
    //                 status: 404,
    //                 message: "آدرس مورد نظر یافت نشد"
    //             };
    //         }
    //
    //         const updatedAddress = await (this.repository).updateAddress(addressId, addressData);
    //
    //         return {
    //             status: 200,
    //             message: "آدرس با موفقیت بروزرسانی شد",
    //             data: updatedAddress
    //         };
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // حذف آدرس
    @Delete("/:id", {
        apiDoc: {
            security: [
                {
                    BasicAuth: [],
                },
            ],
        },
    })
    async deleteAddress(
        @Body({
            destination: "id"
        }) addressId: string,
        @User() user: UserInfo
    ): Promise<Response> {
        try {
            // بررسی وجود آدرس و مالکیت آن
            const existingAddress = await this.repository.findById(addressId);
            if (!existingAddress || existingAddress.user.toString() !== user.id) {
                return {
                    status: 404,
                    message: "آدرس مورد نظر یافت نشد"
                };
            }

            // اگر آدرس پیش‌فرض است، باید یک آدرس دیگر را پیش‌فرض کنیم
            // if (existingAddress.isDefault) {
            //     const otherAddress = await this.repository.findOne({
            //         userId: user.id,
            //         _id: {$ne: addressId}
            //     });
            //
            //     if (otherAddress) {
            //         await (this.repository).setDefaultAddress(otherAddress._id, user.id);
            //     }
            // }

            await this.repository.findByIdAndDelete(addressId);

            return {
                status: 200,
                message: "آدرس با موفقیت حذف شد"
            };
        } catch (error) {
            throw error;
        }
    }

    // تنظیم آدرس پیش‌فرض
    @Put("/:id/default", {
        apiDoc: {
            security: [
                {
                    BasicAuth: [],
                },
            ],
        },
    })
    async setDefaultAddress(
        @Body({
            destination: "id"
        }) addressId: string,
        @User() user: UserInfo
    ): Promise<Response> {
        try {
            // بررسی وجود آدرس و مالکیت آن
            const existingAddress = await this.repository.findById(addressId);
            if (!existingAddress || existingAddress.user.toString() !== user.id) {
                return {
                    status: 404,
                    message: "آدرس مورد نظر یافت نشد"
                };
            }

            const success = await (this.repository).setDefaultAddress(addressId, user.id);

            if (success) {
                return {
                    status: 200,
                    message: "آدرس پیش‌فرض با موفقیت تنظیم شد"
                };
            } else {
                return {
                    status: 500,
                    message: "خطا در تنظیم آدرس پیش‌فرض"
                };
            }
        } catch (error) {
            throw error;
        }
    }
}

const address = new AddressController("/address", new AddressRepository(), {
    insertSchema: z.object({
        addressList: z.array(
            z.object({
                title: z.string(),
                receiver: z.object({
                    name: z.string(),
                    family: z.string(),
                    phoneNumber: z.string()
                }),
                country: z.string(),
                province: z.string(),
                city: z.string(),
                district: z.string(),
                street: z.string(),
                details: z.string(),
                postalCode: z.string(),
                location: z.object({
                    lat: z.number(),
                    lng: z.number()
                }).optional(),
                // isDefault: z.boolean().optional().default(false),
            }),
        ),
    }),
});
export default address;
