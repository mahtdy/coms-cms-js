import Brand, { BrandModel } from "../../../repositories/admin/brand/model";
import BaseController, {
  ControllerOptions,
} from "../../../core/mongoose-controller/controller";
import BrandRepository from "../../../repositories/admin/brand/repository";
import z from "zod";
import { Response } from "../../../core/controller";
import {Get, Put} from "../../../core/decorators/method";
import { Admin, Body, Query } from "../../../core/decorators/parameters";
import CategoryRepository from "../../../core/mongoose-controller/repositories/category/repository";
import { AdminInfo } from "../../../core/mongoose-controller/auth/admin/admin-logIn";
import AdminRepository from "../../../core/mongoose-controller/repositories/admin/repository";
import { AdminModel } from "../../../apps/admin/login";
import {
  BasePageController,
  basePageZod,
} from "../../../core/mongoose-controller/basePage/controller";

export class BrandController extends BasePageController<Brand> {
  // catRepo: CategoryRepository;
  // constructor(
  //   baseRoute: string,
  //   repo: BrandRepository,
  //   options: ControllerOptions & ControllerOptions
  // ) {
  //   super(baseRoute, repo, options);
  //   this.catRepo = new CategoryRepository();
  // }

  create(data: Brand, admin: AdminInfo): Promise<Response> {
    return super.create(data, admin);
  }

  @Put("/updateBrand", {
    // absolute: true,
  })
  async testUpdate(
    @Query({
      destination: "id",
      schema: BaseController.id,
    })
    id: string,
    @Body({
      destination: "price",
      schema: z.coerce.number().positive().int(),
    })
    price: number
  ) {
    return this.editById(
      id,
      {
        $set: {
          price,
        },
      },
      {
        ok: true,
      }
    );
  }
  @Get("", {
    // absolute: true,
  })
  async testSearch(
    @Query({
      destination: "id",
      schema: BaseController.id,
    })
    id: string,
    // @Body({
    //   destination: "price",
    //   schema: z.coerce.number().positive().int(),
    // })
    // price: number

  ): Promise<Response> {
      const searchbrand = await this.repository.findById(id);
      return {
          status: 200,
          data: searchbrand
      };
  }

  // initApis() {
  //   super.initApis();
  //   // this.addRoute("/test2", "get", this.test2.bind(this))
  //   // this.addRouteWithMeta("/test/paginate2", "get", this.testPagination.bind(this), BaseController.paginateMeta)

  //   // this.exclude("/product" , "delete")
  // }
}
const insertSchema = z
  .object({
    // brand: BaseController.id,
    // catID: BaseController.id,
    // summary: z.string(),
    title: z.string().optional(),
    content: z.string(),
    // address: z.string(),
    // phone: z.number(),
    // price: z.coerce.number().positive().int(),
    // features: z.array(
    //   z.object({
    //     id: BaseController.id,
    //     values: z.array(z.any()),
    //   })
    // ),
    image: z
      .string()
      .url()
      .default(
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffa.wikipedia.org%2Fwiki%2F%25DA%25A9%25D9%2584%25D8%25A7%25D8%25BA_%2528%25D8%25B3%25D8%25B1%25D8%25AF%25D9%2587%2529&psig=AOvVaw0V-CeWQtoFjQcUeDkQ0W2E&ust=1706000951040000&source=images&cd=vfe&ved=0CBMQjRxqFwoTCPDc6fbS8IMDFQAAAAAdAAAAABAE"
      ),
    description: z.string().min(200).optional(),
    // category: BaseController.id,
  })
  .merge(basePageZod);
// .merge(basePageZod);
const brand = new BrandController("/brand", new BrandRepository({}), {
  insertSchema,
  // searchFilters: {
  //   _id: ["eq", "list", "nin"],
  //   title: ["eq", "reg"],
  //   // price: ["eq", "gte", "lte", "list", "gt"],
  //   category: ["eq", "list", "nin"],
  // },
  // pdfConfig: {
  //   path: "src/core/mongoose-controller/pdf.ejs",
  //   options: {
  //     height: "90.25in",
  //     width: "45.5in",
  //     header: {
  //       height: "20mm",
  //     },
  //     footer: {
  //       height: "20mm",
  //     },
  //     childProcessOptions: {
  //       env: {
  //         OPENSSL_CONF: "/dev/null",
  //       },
  //     },
  //   },
  //   titles: ["عنوان", "قیمت", "توضیحات", "دسته بندی"],
  //   dataMap: ["title", "price", "description", "category.title"],
  // },
  // csvConfig: {
  //   fields: ["title", "price", "description", "category.title"],
  //   fieldNames: ["عنوان", "قیمت", "توضیحات", "دسته بندی"],
  // },
  // collectionName: "brand",
  // isAdminPaginate: true,
  // adminRepo: new AdminRepository({
  //   model: AdminModel,
  // }),

  // population : [{
  //     source : "category"
  // }]
});

export default brand;
