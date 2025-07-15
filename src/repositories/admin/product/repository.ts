import {
  QueryInfo,
  RepositoryConfigOptions,
} from "../../../core/mongoose-controller/repository";
import BasePageRepository, {
  BasePageOptions,
} from "../../../core/mongoose-controller/basePage/repository";
import Product, { ProductModel } from "./model";
import ProductWarehouseRepository from "../productWarehouse/repository";
import { Types } from "mongoose";
import Warehouse from "../warehouse/model";
import Productwarehouse from "../productWarehouse/model";
import WarehouseRepository from "../warehouse/repository";

export default class ProductRepository extends BasePageRepository<Product> {
  productWarehouseRepo: ProductWarehouseRepository;
  warehouseRepo: WarehouseRepository;
  constructor(options?: RepositoryConfigOptions) {
    super({
      model: ProductModel,
      typeName: "product",

      contentFunc: async function (
        url: string,
        category: string,
        language?: string
      ) {
        return "/product" + url;
      },

      selectData: {
        type: 1,
        title: 1,
        mainImage: 1,
        author: 1,
        category: 1,
        publishDate: 1,
        insertDate: 1,
      },
      sort: {
        publishDate: {
          show: "زمان انتشار",
        },
        insertDate: {
          show: "زمان انتشار",
        },
        view: {
          show: "بازدید",
        },
      },
    });
    this.productWarehouseRepo = new ProductWarehouseRepository();
    this.warehouseRepo = new WarehouseRepository();
  }


  async findById(
    id: string | Types.ObjectId,
    queryInfo?: QueryInfo | undefined,
    population?: Object[]
  ): Promise<Product | null> {
    // console.log(id);
    // let product:
    //   | (Product & {
    //       warehouses?: Productwarehouse[];
    //     })
    //   | null = await super.findById(id);

    let product: any = await super.findById(id);

    if (product != null)
      product.warehouses = await this.productWarehouseRepo.findAll(
        {
          product: product._id,
        },
        {},
        [
          {
            path: "warehouse",
          },
        ]
      );

    return product;
  }
}
// console.log("haj meiti");
