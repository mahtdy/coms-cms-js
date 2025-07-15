import BasketRepository from "../../../repositories/admin/basket/repository";
import BaseController, {
  ControllerOptions,
} from "../../../core/mongoose-controller/controller";
import Basket, { BasketModel } from "../../../repositories/admin/basket/model";
import z from "zod";
import ProductRepository from "../../../repositories/admin/product/repository";
import ProductWarehouseRepository from "../../../repositories/admin/productWarehouse/repository";
import { Post } from "../../../core/decorators/method";
import { Response } from "../../../core/controller";
// import { set, Types } from "mongoose";
// import { QueryInfo } from "../../../core/mongoose-controller/repository";
import { Query, Body, User } from "../../../core/decorators/parameters";
import { UserInfo } from "../../../core/mongoose-controller/auth/user/userAuthenticator";
// import { Route } from "../../../core/application";
import { pull } from "lodash";
import OrderRepository from "../../../repositories/admin/order/repository";
import { log } from "console";
import request from "request";

// interface OrderCheckoutBasket {
//   user?: string | UserInfo;
//   basketList: {
//     price: number;
//     product: string | Product;
//     productwarehouse: string | Productwarehouse;
//     quantity: number;
//   }[];

//   // config: object;
// }

export class BasketController extends BaseController<Basket> {
  proRepo: ProductRepository;
  prowareRepo: ProductWarehouseRepository;
  orderRepo: OrderRepository;
  basketRepo: BasketRepository;
  constructor(
    baseRoute: string,
    repo: BasketRepository,
    options?: ControllerOptions
  ) {
    super(baseRoute, repo, options);
    this.basketRepo = new BasketRepository();
    this.proRepo = new ProductRepository();
    this.orderRepo = new OrderRepository();
    this.prowareRepo = new ProductWarehouseRepository();
  }

  // @PreExec({
  //   method: "delete",
  //   route: "",
  // })
  // async checkBeforeDelete(): Promise<Response> {
  //   console.log("checkBeforeDelete");
  //   return {
  //     // status: 200,
  //     next: true,
  //   };
  // }

  initApis() {
    super.initApis();
  }
  // checkout    6704fc69abe76b1bc03ff07a
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi2K3Ys9mGIiwiZmFtaWx5Ijoi2YXYrdmF2K_bjCIsImlkIjoiNjRiOTJiZDliYTI5YWFjZTMxMjliM2RlIiwicGhvbmVOdW1iZXIiOiIwOTM1ODcwMzUzNCIsImVtYWlsIjoiaC5tb2hhbW1hZGkuMjQ3N0BnbWFpbC5jb20iLCJpYXQiOjE3MjY2NDU3ODl9.IMnS_9ACJlV86lu1CI1z39-cd86wWRZ4oI0wmAWE3Jo

  @Post("/checkout", {
    // absolute: true,
    loginRequired: true,
    // apiDoc: {
    //   security: [
    //     {
    //       BasicAuth: [],
    //     },
    //   ],
    // },
  })
  async orderCheckout(
    // @Body({
    //   destination: "BasketId",
    //   schema: BaseController.id.default("6704fc69abe76b1bc03ff07a"),
    // })
    // BasketId: string,
    // @Body({
    //   destination: "address",
    //   schema: BaseController.id.default("6704fc69abe76b1bc0311333"),
    // })
    // address: string,
    // @Body({
    //   destination: "offCode",
    //   schema: BaseController.id.default("6704fc69abe76b1bc0ffoff"),
    // })
    // offCode: string,
    @User() user: UserInfo,
    // data: Basket,
    @Body({
      schema: z.object({
        BasketId: BaseController.id.default("6704fc69abe76b1bc03ff07a"),
        address: BaseController.id.default("6704fc69abe76b1bc0311333"),
        offCode: BaseController.id.default("6704fc69abe76b1bc00ff0ff"),
        statusOrder: z.number().positive().default(3),
        sendType: z.number().positive().default(1),
        sendTime: z.number().positive().default(1),
        isBig: z.number().positive().default(1),
        sendDate: z.number().positive().default(1),
        typePeyment: z.number().positive().default(1),
        totalPriceProducts: z.number().positive().default(1),
      }),
    })
    orderData: {
      BasketId: string;
      address: string;
      offCode: string;
      statusOrder: number;
      sendType: number;
      sendTime: number;
      isBig: number;
      sendDate: number;
      typePeyment: number;
      totalPriceProducts: number;
    }
  ): Promise<Response> {
    console.log("user.id12", user);

    console.log("orderData", orderData);
    // console.log("productwarehouse11", BasketId);
    // console.log("data11", data);
    if (user != null) {
      let userBasket = await this.basketRepo.findOne({
        user: user.id as string,
      });

      if (userBasket == null) {
        return { status: 200, message: "basket is empty" };
      } else {
        return this.createNewOrder(userBasket, user.id);
      }
      console.log("userBasket", userBasket);

      console.log("user.id11", user);
      let userorder = await this.orderRepo.findOne({ user: user.id as string });
      console.log("userorder", userorder);
      // if (userorder == null) {
      //   return this.createNewOrder(data, user.id);
      // } else {
      //   return this.updateExistingOrder(data, userorder);
      // }
    }

    // @User() user: UserInfo,
    // @Body({
    //   destination: "admin",
    //   schema: BaseController.id,
    // })
    // admin: string,
    // @Body({
    //   destination: "id",
    //   schema: BaseController.id,
    // })
    // id: string,
    // @Body({
    //   destination: "id_basket",
    //   schema: BaseController.id,
    // })
    // id_basket: string,
    // @Body({
    //   destination: "id_user",
    //   schema: BaseController.id,
    // })
    // id_user: string,
    // @Body({
    //   schema: z.object({
    //     sendTime: z.string().default("8-12"),
    //     isBig: z.boolean().default(false),
    //     sendDate: z.coerce.date(),
    //     sendType: z.coerce.number().positive().int(),
    //     statusOrder: z.coerce.number().positive().int(),
    //     totalPriceProducts: z.coerce.number().positive().int(),
    //     totalPriceSend: z.coerce.number().positive().int(),
    //     // totalPriceOff: z.coerce.number().positive().int(),
    //     totalPriceAll: z.coerce.number().positive().int(),
    //   }),
    // })
    // data: {
    //   sendTime: string;
    //   isBig: boolean;
    //   sendDate: Date;
    //   sendType: number;
    //   statusOrder: number;
    //   totalPriceProducts: number;
    //   totalPriceSend: number;
    //   // totalPriceOff: number,
    //   totalPriceAll: number;
    // }
    // ) {
    // console.log("id", id);
    // console.log("user", user);
    // console.log("data", data);

    // this.orderRepo.insert(data as any);

    return { status: 200, message: "insert data to  DB" };
  }

  private async createNewOrder(
    data: Basket,
    userId: string
  ): Promise<Response> {
    console.log("data", data);
    console.log("userId", userId);
    console.log("its ok");

    return { status: 200, message: "New insert data to  DB" };
  }

  private async updateExistingOrder(
    data: Basket,
    userbasket: any
  ): Promise<Response> {
    console.log("data", data);
    console.log("userbasket", userbasket);
    return { status: 200, message: "Update insert data to  DB" };
  }
  // quantity-increase
  @Post("/increase")
  async quantityIncrease(
    @User() user: UserInfo,
    @Body({
      destination: "productwarehouse",
      schema: BaseController.id,
    })
    productwarehouse: string
    // @Body({
    //   destination: "hash",
    //   schema: z.string(),
    // })
    // hash: string
  ): Promise<Response> {
    try {
      var userbasket = await this.repository.findOne({
        user: user.id as string,
      });
      if (userbasket == null) {
        return { status: 404, message: "ID basket not found" };
      }
      const bsktList = userbasket?.basketList.find((basketItem: any) => {
        return basketItem.productwarehouse.equals(productwarehouse);
      });
      if (!bsktList) {
        return { status: 400, message: "Product in basket not found" };
      }
      let productwarehouseCheck = await this.prowareRepo.findById(
        productwarehouse
      );
      if (!productwarehouseCheck) {
        return { status: 400, message: "Product in warehouse not found" };
      } else if (productwarehouseCheck.quantity < Number(bsktList?.quantity) + 1) {
        return { status: 400, message: "Not enough quantity" };
      }
      if (bsktList) {
        try {
          bsktList.quantity += 1;
        } catch (error) {
          console.error("Error updating basket:", error);
        }
      }
      const result = await BasketModel.findByIdAndUpdate(userbasket?._id, {
        $set: { basketList: userbasket.basketList },
      });

      if (!result) {
        return { status: 404, message: "User basket not found" };
      }
      return { status: 200, message: "Basket updated successfully" };
    } catch (error) {
      throw error;
    }
  }

  // quantity-decrease
  @Post("/decrease")
  async quantityDecrease(
    @User() user: UserInfo,
    @Body({
      destination: "productwarehouse",
      schema: BaseController.id,
    })
    productwarehouse: string
  ): Promise<Response> {
    try {
      var userbasket = await this.repository.findOne({
        user: user.id as string,
      });
      if (userbasket == null) {
        return { status: 404, message: "ID basket not found" };
      }
      const bsktList = userbasket?.basketList.find((basketItem: any) => {
        return basketItem.productwarehouse.equals(productwarehouse);
      });
      if (!bsktList) {
        return { status: 400, message: "Product in basket not found" };
      }
      let productwarehouseCheck = await this.prowareRepo.findById(
        productwarehouse
      );
      if (!productwarehouseCheck) {
        return { status: 400, message: "Product in warehouse not found" };
      } else if (0 >= Number(bsktList?.quantity)) {
        pull(userbasket.basketList, bsktList);
        const result = await BasketModel.findByIdAndUpdate(userbasket?._id, {
          $set: { basketList: userbasket.basketList },
        });
        return { status: 400, message: "Not wwwwww enough quantity" };
      }
      if (bsktList) {
        try {
          bsktList.quantity -= 1;
        } catch (error) {
          console.error("Error updating basket:", error);
        }
      }
      const result = await BasketModel.findByIdAndUpdate(userbasket?._id, {
        $set: { basketList: userbasket.basketList },
      });

      if (!result) {
        return { status: 404, message: "User basket not found" };
      }
      return { status: 200, message: "Basket updated successfully" };
    } catch (error) {
      throw error;
    }
  }

  async push(
    @Body({
      destination: "id",
      schema: BaseController.id,
    })
    id: string,
    @Body({
      destination: "field",
      schema: z.string(),
    })
    field: string
  ) {
    return this.editById(id, {
      $set: {
        product: field,
      },
    });
  }

  // async deleteByPhone(
  //   @Body({ destination: "phone", schema: z.string() }) phone: string
  // ): Promise<Response> {
  //   try {
  //     await this.repository.findOneAndDelete({
  //       "info.userInfo.phoneNumber": phone,
  //     });
  //     return {
  //       status: 200,
  //       data: {},
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  async create(data: Basket, @User() user: UserInfo): Promise<Response> {
    let userbasket = await this.basketRepo.findOne({ user: user.id as string });

    if (userbasket == null) {
      return this.createNewBasket(data, user.id);
    } else {
      return this.updateExistingBasket(data, userbasket);
    }
  }

  private async createNewBasket(
    data: Basket,
    userId: string
  ): Promise<Response> {
    try {
      data.user = userId;
      const basketLists = data.basketList;
      for (const bsktList of basketLists) {
        const productwarehouseId = bsktList.productwarehouse;
        const quantity = bsktList.quantity;

        let productwarehouse = await this.prowareRepo.findById(
          productwarehouseId as string
        );
        if (!productwarehouse) {
          return { status: 400, message: "Product in warehouse not found" };
        } else if (productwarehouse.quantity < quantity) {
          return { status: 400, message: "Not enough quantity" };
        }
        const product = await this.proRepo.findById(
          productwarehouse.product as string
        );
        bsktList.price = productwarehouse.price;
        bsktList.product = product?._id;
      }
      data.basketList = basketLists;
      return super.create(data);
    } catch (error) {
      console.error("Error creating new basket:", error);
      throw error;
    }
  }

  private async updateExistingBasket(
    data: Basket,
    userbasket: any
  ): Promise<Response> {
    const basketLists = userbasket.basketList;
    const dataList = data.basketList[0];

    const bsktList = basketLists.find((basketItem: any) => {
      return basketItem.productwarehouse.equals(dataList.productwarehouse);
    });
    const productwarehouse = await this.prowareRepo.findById(
      dataList.productwarehouse as string
    );
    if (!productwarehouse) {
      return { status: 400, message: "Product in warehouse not found" };
    } else if (
      productwarehouse.quantity <
      Number(bsktList?.quantity) +
        Number(dataList.quantity ? dataList.quantity : 1)
    ) {
      return { status: 400, message: "Not enough quantity for update" };
    }

    if (bsktList) {
      try {
        bsktList.quantity += dataList.quantity;
      } catch (error) {
        console.error("Error updating basket:", error);
      }
    } else {
      basketLists.push({
        product: productwarehouse.product,
        productwarehouse: productwarehouse._id,
        price: productwarehouse.price,
        quantity: dataList.quantity,
      });
    }
    try {
      const result = await BasketModel.findByIdAndUpdate(userbasket._id, {
        $set: { basketList: basketLists },
      });

      if (!result) {
        return { status: 404, message: "User basket not found" };
      }
    } catch (error: any) {
      throw error;
    }
    return { status: 200, message: "Basket updated successfully" };
  }
}

const basket = new BasketController("/basket", new BasketRepository(), {
  insertSchema: z.object({
    // product: BaseController.id,
    basketList: z.array(
      z.object({
        productwarehouse: BaseController.id.optional().default("67d2b3f1e0122b71ef770e8e"),

        // user: BaseController.id,
        // price: ,
        quantity: z.coerce.number().positive().int().default(10),
      })
    ),
  }),
  apiDoc: {
    security: [
      {
        BasicAuth: [],
      },
    ],
  },
});

export default basket;
