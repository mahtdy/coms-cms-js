import { RepositoryConfigOptions } from "../../../core/mongoose-controller/repository";
import BasePageRepository, {
  BasePageOptions,
} from "../../../core/mongoose-controller/basePage/repository";
import Brand, { BrandModel } from "./model";

export default class BrandRepository extends BasePageRepository<Brand> {
  constructor(options?: RepositoryConfigOptions) {
    super({
      model: BrandModel,
      typeName: "brand",

      contentFunc: async function (
        url: string,
        category: string,
        language?: string
      ) {
        return "/brand" + url;
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
        // publishDate: {
        //   show: "زمان انتشار",
        // },
        // insertDate: {
        //   show: "زمان انتشار",
        // },
        // view: {
        //   show: "بازدید",
        // },
      },
    });
  }
}
