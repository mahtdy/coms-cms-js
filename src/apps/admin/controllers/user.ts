import UserRepository from "../../../core/mongoose-controller/repositories/user/repository";
import { UserController } from "../../../core/mongoose-controller/controllers/user";
import BaseUser from "../../../core/mongoose-controller/repositories/user/model";
import { UserModel } from "../../../repositories/user/model";
import z from "zod"
import BaseController from "../../../core/mongoose-controller/controller";
import { Response } from "../../../core/controller";
import RandomGenarator from "../../../core/random";
import SmsMessager from "../../../core/messaging/smsMessager";
import { Get } from "../../../core/decorators/method";
import { Admin, Query } from "../../../core/decorators/parameters";
import {adminRepo} from "./admin"
import { styles } from "../../../core/mongoose-controller/style";
import { AdminInfo } from "../../../core/mongoose-controller/auth/admin/admin-logIn";

class UserControllerAdmin extends UserController<BaseUser>{

    

    async create(data: BaseUser, ...params: any[]): Promise<Response> {
        var password = RandomGenarator.generateHashStr(10)
        data.password = password
        var resp =await super.create(data)
        if(resp.status == 200){

            resp.data = {
                nama :resp.data.name,
                family : resp.data.family,
                _id : resp.data._id,
                phoneNumber : resp.data.phoneNumber,
                email : resp.data.email,
            }
            SmsMessager.send({
                parameters : {
                    name : data.name,
                    family : data.family,
                    password
                },
                receptor : data.phoneNumber,
                template : "sendUserPassword"
            })
        }

        return resp
    }

    @Get("s/phone/exists")
    async isPhoneExists(@Query({
        destination : "phone",
        schema : BaseController.phone
    }) phone : string
    ){
        return this.checkExists({
            phoneNumber : phone
        })
    }

    @Get("s/email/exists")
    async isEmailExists(@Query({
        destination : "email",
        schema : BaseController.email
    }) email : string
    ){
        return this.checkExists({
            email
        })
    }


    initApis(): void {
        super.initApis()
        this.addExportRoutes()
    }

}


const user = new UserControllerAdmin("/user", new UserRepository<BaseUser>({
    model: UserModel,
    // salt: "111244"
}), {
    insertSchema : z.object({
        name : z.string(),
        family : z.string(),
        email : BaseController.email,
        phoneNumber : BaseController.phone,
        userCategory : BaseController.ip.optional()
    }),
    paginationConfig :{
        fields : {
            towFactorLogIn :{
                en_title : "towFactorLogIn",
                fa_title : "ورود دومرحله‌ای",
                isOptional : false,
                sortOrderKey : false,
                type : "boolean"
            },

            isEmailRegistered :{
                en_title : "isEmailRegistered",
                fa_title : "وضعیت تایید ایمیل",
                isOptional : false,
                sortOrderKey : false,
                type : "boolean"
            },

            email :{
                en_title : "email",
                fa_title : "ایمیل",
                isOptional : false,
                sortOrderKey : false,
                type : "string"
            },
            phoneNumber :{
                en_title : "phoneNumber",
                fa_title : "شماره تلفن",
                isOptional : false,
                sortOrderKey : false,
                type : "string"
            },
            family :{
                en_title : "family",
                fa_title : "نام‌ خانوادگی",
                isOptional : false,
                sortOrderKey : false,
                type : "string"
            },
            name :{
                en_title : "name",
                fa_title : "نام",
                isOptional : false,
                sortOrderKey : false,
                type : "string"
            },
        },
        paginationUrl : "/users",
        searchUrl : "/users",
        serverType : "",
        exportcsvUrl : "/users/csv",
        exportexelUrl: "/users/exel",
        exportpdfUrl : "/users/pdf",
        tableLabel : "users"
    },
    collectionName : "user",
    adminRepo
})


export default user