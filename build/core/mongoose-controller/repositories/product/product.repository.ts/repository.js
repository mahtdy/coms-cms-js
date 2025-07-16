"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = __importDefault(require("../../../core/mongoose-controller/basePage/repository"));
const model_1 = require("./model");
const repository_2 = __importDefault(require("../productWarehouse/repository"));
const repository_3 = __importDefault(require("../warehouse/repository"));
class ProductRepository extends repository_1.default {
    constructor(options) {
        super({
            model: model_1.ProductModel,
            typeName: "product",
            contentFunc: async function (url, category, language) {
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
        this.productWarehouseRepo = new repository_2.default();
        this.warehouseRepo = new repository_3.default();
    }
    async findById(id, queryInfo, population) {
        // console.log(id);
        // let product:
        //   | (Product & {
        //       warehouses?: Productwarehouse[];
        //     })
        //   | null = await super.findById(id);
        let product = await super.findById(id);
        if (product != null)
            product.warehouses = await this.productWarehouseRepo.findAll({
                product: product._id,
            }, {}, [
                {
                    path: "warehouse",
                },
            ]);
        return product;
    }
}
exports.default = ProductRepository;
// console.log("haj meiti");
