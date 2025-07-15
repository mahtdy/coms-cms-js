import Product, {
    ProductModel,
} from "../../../repositories/admin/product/model";
import BaseController, {
    ControllerOptions,
} from "../../../core/mongoose-controller/controller";
import ProductRepository from "../../../repositories/admin/product/repository";
import CategoryShopping from "../../../repositories/admin/shoppingCategory/model"; // TODO::mahtdy
import z from "zod";
import {Response} from "../../../core/controller";
import {Get, Put} from "../../../core/decorators/method";
import {Admin, Body, Query} from "../../../core/decorators/parameters";
// import Category from "../../../core/mongoose-controller/repositories/category/model";
import CategoryRepository from "../../../core/mongoose-controller/repositories/category/repository";
import {AdminInfo} from "../../../core/mongoose-controller/auth/admin/admin-logIn";
import AdminRepository from "../../../core/mongoose-controller/repositories/admin/repository";
import {AdminModel} from "../../../apps/admin/login";
import {
    BasePageController,
    basePageZod,
} from "../../../core/mongoose-controller/basePage/controller";
import {FilterQuery} from "mongoose";

export class ProductController extends BasePageController<Product> {
    catRepo: CategoryRepository;

    constructor(
        baseRoute: string,
        repo: ProductRepository,
        options: ControllerOptions & ControllerOptions
    ) {
        super(baseRoute, repo, options);
        this.catRepo = new CategoryRepository();
        // this.addExportRoutes()
    }

    // create(data: Product, admin: AdminInfo): Promise<Response> {
    //   return super.create(data, admin);
    // }

    create(data: Product, @Admin() admin: AdminInfo): Promise<Response> {
        console.log("product", data)
        return super.create(data, admin)

    }

    // @Get("/test", {
    //   // loginRequired : true
    // })
    // test(): Response {
    //   return {
    //     status: 200,
    //   };
    // }

    // async test2() {
    //     return {
    //         data: {
    //             hello: "word"
    //         },
    //         status: 200
    //     }
    // }

    // @Get("/test/paginate")
    // async testPagination(
    //     page: number,
    //     limit: number) {
    //     return super.paginate(page, limit, {}, {
    //         projection: {
    //             description: 0
    //         }
    //     })
    //     // super.create(d)
    // }

    @Put("/update", {
        // absolute: true,
    })
    async testUpdate(
        @Query({
            destination: "id",
            schema: BaseController.id,
        })
        id: string,
        @Body({
            destination: "title",
            schema: z.coerce.string(),
        })
        title: string,
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
                    title,
                    price,
                },
            },
            {
                ok: true,
            }
        );
    }

    // @Put("/update/many")
    // async updateMany(
    //     @Query({
    //         destination: "category",
    //         schema: z.string()
    //     }) catTitle: string,
    //     @Query({
    //         destination: "price",
    //         schema: z.coerce.number().positive().int()
    //     }) price: number,
    //     @Body({
    //         schema: z.object({
    //             category: z.string(),
    //             price: z.coerce.number().positive().int()
    //         })
    //     }) data: {
    //         category: string,
    //         price: number
    //     }
    // ): Promise<Response> {
    //     let category = await this.catRepo.findOne({
    //         title: catTitle
    //     })

    //     console.log(category, catTitle)

    //     if (category == null) {
    //         return {
    //             status: 400
    //         }
    //     }

    //     let finalCat = await this.catRepo.findOne({ title: data.category })

    //     if (finalCat == null) {
    //         return {
    //             status: 400
    //         }
    //     }
    //     try {
    //         return {
    //             status: 200,
    //             data: await this.repository.updateMany({
    //                 price,
    //                 category: category._id
    //             }, {
    //                 $set: {
    //                     price: data.price,
    //                     category: finalCat._id
    //                 }
    //             })
    //         }
    //     } catch (error) {
    //         throw error
    //     }

    // }

    // @Get("/search")
    // async search(@Query({
    //     destination: "page",
    //     schema: BaseController.page
    // }) page: number,
    //     @Query({
    //         destination: "limit",
    //         schema: BaseController.limit
    //     }) limit: number,
    //     @Query({
    //         schema: BaseController.search
    //     }) reqQuery: any, admin?: any, ...params: any[]): Promise<Response> {
    //     return super.search(page, limit, reqQuery, admin)
    // }

    async searchHelper(queryParam?: any): Promise<any> {
        let query = await super.searchHelper(queryParam);
        // console.log("query",query ,queryParam)
        if (queryParam["_id$nin"] != undefined) {
            if (query["_id"] == undefined) {
                query["_id"] = {};
            }
            query["_id"] = {
                $nin: queryParam["_id$nin"],
            };
        }
        if (queryParam["price$gt"] != undefined) {
            if (query["price"] == undefined) {
                query["price"] = {};
            }
            query["price"] = {
                $gt: queryParam["price$gt"],
            };
        }
        console.log("query", query);
        return query;
    }

    // public dataTransform(dataList: any[]): Promise<any[]> {
    //     console.log(dataList)
    //     for (let i = 0; i < dataList.length; i++) {
    //         dataList[i]['title'] = dataList[i]['title']+ "(export csv)"

    //     }
    //     return super.dataTransform(dataList)
    // }

    // // transformData(permissionData: PermissionData & { data: any; }): Promise<any> {
    // //     console.log("permissionData", permissionData)
    // //     return super.transformData(permissionData)

    // // }

    // @Get("es/csv")
    // exportCSV(@Query({schema : BaseController.search}) query: any, adminInfo: AdminInfo, ...params: any[]): Promise<Response> {
    //     return super.exportCSV(query,adminInfo)
    // }

    initApis() {
        super.initApis();
        // this.addRoute("/test2", "get", this.test2.bind(this))
        // this.addRouteWithMeta("/test/paginate2", "get", this.testPagination.bind(this), BaseController.paginateMeta)

        // this.exclude("/product" , "delete")
    }
}

const insertSchema = z
    .object({
        brand: BaseController.id,
        catID: BaseController.id,
        summary: z.string(),
        title: z.string(),
        price: z.coerce.number().positive().int(),
        features: z.array(
            z.object({
                id: BaseController.id,
                values: z.array(z.any()),
            })
        ),
        image: z.string().url().default(
                "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffa.wikipedia.org%2Fwiki%2F%25DA%25A9%25D9%2584%25D8%25A7%25D8%25BA_%2528%25D8%25B3%25D8%25B1%25D8%25AF%25D9%2587%2529&psig=AOvVaw0V-CeWQtoFjQcUeDkQ0W2E&ust=1706000951040000&source=images&cd=vfe&ved=0CBMQjRxqFwoTCPDc6fbS8IMDFQAAAAAdAAAAABAE"
            ),
        description: z.string().min(200).optional(),
        category: z.array(
            z.object({
                id: BaseController.id,
                title: z.array(z.any()),
            })
        ),
        content: z.string().default('contentcontentcontentcontentcontentcontent'),
    })
    .merge(basePageZod);
// console.log('insertSchema==', insertSchema);
const product = new ProductController("/product", new ProductRepository({
    population: [{
        path: "category",
        select: ["title"]
    }]
}), {
    insertSchema,
    searchFilters: {
        _id: ["eq", "list", "nin"],
        title: ["eq", "reg"],
        price: ["eq", "gte", "lte", "list", "gt"],
        category: ["eq", "list", "nin"],
    },
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
    collectionName: "product",
    isAdminPaginate: true,
    adminRepo: new AdminRepository({
        model: AdminModel,
    }),

    // population : [{
    //     source : "category"
    // }]
});

// product.loginRequired =true
export default product;
