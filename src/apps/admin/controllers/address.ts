import {Query, Body, User} from "../../../core/decorators/parameters";
import {Response} from "../../../core/controller";
import {Get, Post, Put, Delete} from "../../../core/decorators/method";

import AddressRepository from "../../../repositories/admin/address/repository";
import BaseController, {
    ControllerOptions,
} from "../../../core/mongoose-controller/controller";
import {UserInfo} from "../../../core/mongoose-controller/auth/user/userAuthenticator";

import Address from "../../../repositories/admin/address/model";
import z from "zod";


export class AddressController extends BaseController<Address> {
    addressRepo: AddressRepository;

    constructor(
        baseRoute: string,
        repo: AddressRepository,
        options?: ControllerOptions
    ) {
        super(baseRoute, repo, options);
        this.addressRepo = new AddressRepository();
    }

    // initApis() {
    //     super.initApis();
    // }


    @Get("/test")

    async test(
        // @User() user: UserInfo,
    ): Promise<Response> {
        console.log("user.id12");

        return {status: 200, message: "Basket updated successfully"};

    }


    @Post("/user", {})
    async getUserAddresses(
        // @User() user: UserInfo,
        @Body({
            schema: z.object({
                userId: BaseController.id.default("627e2d5cb22fe19e794c8347"),
                // schema: data.id
            }),
        })
        addressData: {
            userId: string,
        }
    ): Promise<Response> {
        console.log("user.id12", addressData);

        try {
            const addresses = await this.repository.findOne({
                user: addressData.userId as string,

            })
            return {
                status: 200,
                data: addresses
            };
        } catch (error) {
            throw error;
        }
    }

    // افزودن آدرس جدید برای کاربر
    // @Post("/user/:user", {
    //     loginRequired: true,
    //
    // })
    // async addUserAddress(
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
    //         console.log("user.id12", user);
    //         // افزودن شناسه کاربر به آدرس
    //         user :  user.id;
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
    //
    // // ویرایش آدرس کاربر
    // @Put("/:id", {
    //     apiDoc: {
    //         security: [
    //             {
    //                 AdminAuth: [],
    //             },
    //         ],
    //     },
    // })
    // async updateAddress(
    //     @User() user: UserInfo,
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
    //     }
    // ): Promise<Response> {
    //     try {
    //         const updatedAddress = await (this.repository).updateAddress(addressId, addressData);
    //
    //         if (!updatedAddress) {
    //             return {
    //                 status: 404,
    //                 message: "آدرس مورد نظر یافت نشد"
    //             };
    //         }
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
                    AdminAuth: [],
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
            const existingAddress = await this.repository.findById(addressId);
            if (!existingAddress) {
                return {
                    status: 404,
                    message: "آدرس مورد نظر یافت نشد"
                };
            }

            // اگر آدرس پیش‌فرض است، باید یک آدرس دیگر را پیش‌فرض کنیم
            // if (existingAddress.isDefault) {
            //     const otherAddress = await this.repository.findOne({
            //         userId: existingAddress.user,
            //         _id: {$ne: addressId}
            //     });
            //
            //     if (otherAddress) {
            //         await (this.repository).setDefaultAddress(otherAddress._id, existingAddress.user);
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

    // جستجوی آدرس‌ها
    @Get("/search", {
        apiDoc: {
            security: [
                {
                    AdminAuth: [],
                },
            ],
        },
    })
    async searchAddresses(
        @Body({
            schema: z.object({
                userId: BaseController.id.optional(),
                province: z.string().optional(),
                city: z.string().optional(),
                postalCode: z.string().optional()
            })
        }) searchParams: any,
        @User() user: UserInfo
    ): Promise<Response> {
        try {
            const query: any = {};

            if (searchParams.userId) {
                query.userId = searchParams.userId;
            }

            if (searchParams.province) {
                query.province = searchParams.province;
            }

            if (searchParams.city) {
                query.city = searchParams.city;
            }

            if (searchParams.postalCode) {
                query.postalCode = searchParams.postalCode;
            }

            const addresses = await this.repository.find(query);

            return {
                status: 200,
                data: addresses
            };
        } catch (error) {
            throw error;
        }
    }
}

const address = new AddressController("/address", new AddressRepository(), {
    insertSchema: z.object({
        user: BaseController.id,
        addressList: z.array(
            z.object({
                title: z.string().default('Home'),
                receiver: z.object({
                    name: z.string().default('first name'),
                    family: z.string().default('last name'),
                    phoneNumber: z.string().default('09123456789')
                }),
                country: z.string().default('iran'),
                province: z.string().default('Qazvin'),
                city: z.string().default('Qazvin'),
                district: z.string().default('Qazvin'),
                street: z.string().default('naderi'),
                details: z.string().default('ساختمان 333 پلاک 11'),
                postalCode: z.string().default('3414633222'),
                location: z.object({
                    lat: z.number().optional(),
                    lng: z.number().optional()
                }).optional(),
                // isDefault: z.boolean().optional().default(false),
            }),
        ),
    }),
});
export default address;
