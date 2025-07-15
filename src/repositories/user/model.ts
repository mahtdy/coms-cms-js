import { model } from "mongoose";
import BaseUser from "../../core/mongoose-controller/repositories/user/model";
import { userSchema } from "../../core/mongoose-controller/repositories/user/model";




export const UserModel = model<BaseUser>('user', userSchema)