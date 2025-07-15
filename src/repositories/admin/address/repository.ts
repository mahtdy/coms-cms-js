import { Model, Types } from "mongoose";
// import BaseRepositoryService from "../../../core/mongoose-controller/repository";
// import Address, {AddressModel} from "./model";
// import CacheService from "../../core/cache";
import Address, { AddressModel } from "../../../repositories/admin/address/model";
import BaseRepositoryService from "../../../core/mongoose-controller/repository";
import { RepositoryConfigOptions } from "../../../core/mongoose-controller/repository";

// interface AddressOptions<T> {
//     cache?: CacheService,
//     model: Model<T>
// }

export default class AddressRepository extends BaseRepositoryService<Address> {
    constructor(options?: RepositoryConfigOptions) {
        super(AddressModel, options);
    }
    //
    // // دریافت تمام آدرس‌های یک کاربر
    // async findByUserId(userId: Types.ObjectId | string): Promise<T[]> {
    //     return this.find({
    //         userId: userId
    //     });
    // }
    //
    // // دریافت آدرس پیش‌فرض کاربر
    // async findDefaultAddress(userId: Types.ObjectId | string): Promise<T | null> {
    //     return this.findOne({
    //         userId: userId,
    //         isDefault: true
    //     });
    // }
    //
    // // تنظیم آدرس پیش‌فرض
    // async setDefaultAddress(addressId: Types.ObjectId | string, userId: Types.ObjectId | string): Promise<boolean> {
    //     // ابتدا همه آدرس‌های کاربر را از حالت پیش‌فرض خارج می‌کنیم
    //     await this.collection.updateMany(
    //         { userId: userId },
    //         { $set: { isDefault: false } }
    //     );
    //
    //     // سپس آدرس مورد نظر را به عنوان پیش‌فرض تنظیم می‌کنیم
    //     const result = await this.findByIdAndUpdate(addressId, {
    //         $set: {
    //             isDefault: true,
    //             updatedAt: new Date()
    //         }
    //     });
    //
    //     return result !== null;
    // }
    //
    // // افزودن آدرس جدید
    // async addAddress(address: T): Promise<T> {
    //     // اگر این اولین آدرس کاربر است، آن را به عنوان پیش‌فرض تنظیم می‌کنیم
    //     const addressCount = await this.collection.countDocuments({ userId: address.userId });
    //     if (addressCount === 0) {
    //         address.isDefault = true;
    //     }
    //
    //     return this.insert(address);
    // }
    //
    // // بروزرسانی آدرس
    // async updateAddress(addressId: Types.ObjectId | string, data: Partial<T>): Promise<T | null> {
    //     return this.findByIdAndUpdate(addressId, {
    //         $set: {
    //             ...data,
    //             updatedAt: new Date()
    //         }
    //     });
    // }
}
