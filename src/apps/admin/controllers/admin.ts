import { BaseAdmin } from "../../../core/mongoose-controller/repositories/admin/model";
import AdminRepository from "../../../core/mongoose-controller/repositories/admin/repository";
import { AdminModel } from "../login";
import BaseController, {
  ControllerOptions,
} from "../../../core/mongoose-controller/controller";
import { z } from "zod";
import { Get, Post } from "../../../core/decorators/method";
import { Admin, Body, Query } from "../../../core/decorators/parameters";
import { Response } from "../../../core/controller";
import { AdminInfo } from "../../../core/mongoose-controller/auth/admin/admin-logIn";
import { FilterQuery } from "mongoose";
import { QueryInfo } from "../../../core/mongoose-controller/repository";
import RandomGenarator from "../../../core/random";
import SmsMessager from "../../../core/messaging/smsMessager";
import { ModuleAction } from "../../../core/mongoose-controller/controllers/role";
import { actions } from "./role";

export class AdminController extends BaseController<BaseAdmin> {
  actions: {
    [x: string]: ModuleAction[];
  };
  constructor(
    baseRoute: string,
    repo: AdminRepository<BaseAdmin>,
    options: ControllerOptions & {
      actions: {
        [x: string]: ModuleAction[];
      };
    }
  ) {
    super(baseRoute, repo, options);
    this.actions = options.actions;
  }

  @Get("/actions")
  async getActions(
    @Query({
      destination: "admin",
      schema: BaseController.id,
    })
    admin: string,
    @Query({
      destination: "subPart",
      schema: z.string(),
    })
    subPart: string
  ): Promise<Response> {
    try {
      return {
        status: 200,
        data: await this.repository.getActions(subPart, admin),
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Get("/schemas")
  async getSchemas(
    @Query({
      destination: "admin",
      schema: BaseController.id,
    })
    admin: string,
    @Query({
      destination: "subPart",
      schema: z.string(),
    })
    subPart: string
  ): Promise<Response> {
    try {
      return {
        status: 200,
        data: await this.repository.getSchemas(subPart, admin),
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Post("/actions")
  async updateActions(
    @Body({
      destination: "admin",
      schema: BaseController.id,
    })
    admin: string,
    @Body({
      destination: "subPart",
      schema: z.string(),
    })
    subPart: string,
    @Body({
      destination: "actions",
      schema: z.array(BaseController.id),
    })
    actions: string[]
  ): Promise<Response> {
    try {
      return {
        status: 200,
        data: await this.repository.updateActions(subPart, admin, actions),
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Post("/schemas")
  async updateSchemas(
    @Body({
      destination: "admin",
      schema: BaseController.id,
    })
    admin: string,
    @Body({
      destination: "schema",
      schema: BaseController.id,
    })
    schema: string,
    @Body({
      destination: "subPart",
      schema: z.string(),
    })
    subPart: string,
    @Body({
      destination: "fields",
      schema: z.array(z.string()),
    })
    fields: string[]
  ): Promise<Response> {
    try {
      return {
        status: 200,
        data: await this.repository.updateSchema(
          subPart,
          admin,
          schema,
          fields
        ),
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Get("/special/permissions")
  async getSpecialPermission(
    @Query({
      destination: "subPart",
      schema: z.string(),
    })
    subPart: string,
    @Query({
      destination: "admin",
      schema: BaseController.id,
    })
    admin: string
  ): Promise<Response> {
    let data: any = this.actions[subPart];
    if (!data)
      return {
        status: 404,
      };
    let config = (
      await this.repository.getPermissionModuleAction(subPart, admin)
    ).config;
    for (let i = 0; i < data.length; i++) {
      if (config[data[i].name] != undefined) {
        data[i].value = config[data[i].name].value;
        data[i].fixedData = config[data[i].name].fixedData;
      }
    }
    return {
      status: 200,
      data,
    };
  }

  @Get("/special/permissions/current")
  async getCurrentSpecialPermission(
    @Query({
      destination: "subPart",
      schema: z.string(),
    })
    subPart: string,
    @Admin() admin: AdminInfo
  ): Promise<Response> {
    let data = this.actions[subPart];
    if (!data)
      return {
        status: 404,
      };
    let config = (
      await this.repository.getPermissionModuleAction(subPart, admin._id)
    ).config;
    for (let i = 0; i < data.length; i++) {
      if (config[data[i].name] != undefined)
        data[i].value = config[data[i].name];
    }
    return {
      status: 200,
      data,
    };
  }

  @Post("/special/permissions")
  async setSpecialPermission(
    @Body({
      destination: "admin",
      schema: BaseController.id,
    })
    admin: string,
    @Body({
      destination: "subPart",
      schema: z.string(),
    })
    subPart: string,
    @Body({
      destination: "actions",
      schema: BaseController.search,
    })
    actions: any
  ): Promise<Response> {
    try {
      await this.repository.setPermissionModuleAction(subPart, admin, actions);
      return {
        status: 200,
        data: {},
      };
    } catch (error) {
      throw error;
    }
  }

  async create(
    data: BaseAdmin,
    @Admin() adminInfo: AdminInfo,
    @Query({
      destination: "admin",
      schema: BaseController.id.optional(),
    })
    admin?: string
  ): Promise<Response> {
    try {
      var password = RandomGenarator.generateHashStr(8);
      data.password = password;
      var resp = await super.create(data);

      var adminId = admin || adminInfo._id;

      this.repository.updateOne(
        {
          _id: adminId,
        },
        {
          $addToSet: {
            admins: resp.data._id,
          },
        }
      );

      SmsMessager.send({
        receptor: data.phoneNumber,
        template: "adminAdded",
        parameters: {
          password,
        },
      });

      return resp;
    } catch (error) {
      throw error;
    }
  }

  async adminPaginate(
    page: number,
    limit: number,
    @Admin() admin: AdminInfo,
    query?: FilterQuery<BaseAdmin>,
    options?: QueryInfo | undefined
  ): Promise<Response> {
    if (query == undefined) {
      query = {};
      query["_id"] = {
        $ne: admin?._id,
      };
    }

    if (!admin?.isSuperAdmin) {
      var admins = await this.repository.getAdminLists(admin?._id || "");
      query["_id"]["$in"] = admins;
    }

    return super.adminPaginate(page, limit, admin, query);
  }
}
export const adminRepo = new AdminRepository({
  model: AdminModel,
});
adminRepo.setPopulation([
  {
    path: "role",
  },
]);

const admins = new AdminController("/admin", adminRepo, {
  insertSchema: z.object({
    isSuperAdmin: z.boolean().default(false),
    role: BaseController.id.optional(),
    name: z.string(),
    familyName: z.string(),
    email: BaseController.email,
    phoneNumber: BaseController.phone,
    userName: z.string(),
    validIPList: z.array(BaseController.ip),
    towFactorLogIn: z.boolean(),
    changePassword: z.boolean().default(false),
    address: z.any().optional(),
    department: BaseController.id.optional(),
  }),
  paginationConfig: {
    fields: {
      name: {
        type: "string",
        en_title: "name",
        fa_title: "نام",
        sortOrderKey: false,
        filters: ["reg"],
        isAutoComplate: false,
        isOptional: false,
      },
      familyName: {
        type: "string",
        en_title: "familyName",
        fa_title: "نام خانوادگی",
        sortOrderKey: false,
        filters: ["reg"],
        isAutoComplate: false,
        isOptional: false,
      },
      role: {
        type: "string",
        en_title: "role",
        fa_title: "نقش",
        isOptional: true,
        object_value: ["name"],
        target_func: "v1",
        sortOrderKey: false,
      },
      email: {
        type: "string",
        en_title: "email",
        fa_title: "ایمیل",
        sortOrderKey: false,
        filters: ["reg"],
        isAutoComplate: false,
        isOptional: false,
      },
      isEmailRegistered: {
        type: "boolean",
        en_title: "isEmailRegistered",
        fa_title: "وضعیت تایید ایمیل",
        sortOrderKey: false,
        filters: ["eq"],
        isAutoComplate: false,
        isOptional: true,
      },
      phoneNumber: {
        type: "string",
        en_title: "phoneNumber",
        fa_title: "شماره تلفن",
        sortOrderKey: false,
        filters: ["reg"],
        isAutoComplate: false,
        isOptional: false,
      },
      phoneRegistered: {
        type: "boolean",
        en_title: "phoneRegistered",
        fa_title: "وضعیت تایید موبایل",
        sortOrderKey: false,
        filters: ["eq"],
        isAutoComplate: false,
        isOptional: true,
      },
      userName: {
        type: "string",
        en_title: "userName",
        fa_title: "نام کاربری",
        sortOrderKey: false,
        filters: ["reg"],
        isAutoComplate: false,
        isOptional: true,
      },
      passwordLastChange: {
        type: "date",
        en_title: "passwordLastChange",
        fa_title: "تاریخ آخرین تغییر رمز",
        sortOrderKey: false,
        filters: ["gte", "lte"],
        isAutoComplate: false,
        isOptional: true,
      },
      createAt: {
        type: "date",
        en_title: "createAt",
        fa_title: "تاریخ ثبت",
        sortOrderKey: false,
        filters: ["gte", "lte"],
        isAutoComplate: false,
        isOptional: true,
      },
      lastLogIn: {
        type: "date",
        en_title: "lastLogIn",
        fa_title: "آخرین ورود",
        sortOrderKey: false,
        filters: ["gte", "lte"],
        isAutoComplate: false,
        isOptional: true,
      },
      towFactorLogIn: {
        type: "boolean",
        en_title: "towFactorLogIn",
        fa_title: "ورود دومرحله ای فعال",
        sortOrderKey: false,
        filters: ["gte", "lte"],
        isAutoComplate: false,
        isOptional: true,
      },
      towFactorEnable: {
        type: "boolean",
        en_title: "towFactorEnable",
        fa_title: "آخرین ورود",
        sortOrderKey: false,
        filters: ["eq"],
        isAutoComplate: false,
        isOptional: true,
      },
    },
    paginationUrl: "/admines",
    searchUrl: "/admines",
    auto_search_url: "/admines?",
    auto_search_key: "name$reg",
    auto_search_title: "نام مدیر",
    auto_filter_name: "name",
    auto_search_submit: "_id$list",
    auto_filter_idKey: "_id",
    serverType: "",
    tableLabel: "admins",
    actions: [
      {
        api: "",
        type: "setting",
        route: "/panel/permission/file-manager-permission/$_id",
        queryName: "adminid",
      },
      {
        api: "",
        type: "insert",
        route: "/panel/permission/newadmin",
        queryName: "adminid",
        text: "ادمین جدید",
      },
      {
        api: "",
        type: "edit_modal",
        route: "/panel/permission/newadmin",
        queryName: "",
      },
    ],
  },
  actions,
  collectionName: "admin",
  adminRepo,
});

export default admins;
