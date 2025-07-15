import OrderRepository from "../../../repositories/admin/order/repository";
import BaseController from "../../../core/mongoose-controller/controller";
import {Response} from "../../../core/controller";

import {Post} from "../../../core/decorators/method";
import {Body, User} from "../../../core/decorators/parameters";
import {UserInfo} from "../../../core/mongoose-controller/auth/user/userAuthenticator";
import Order, {OrderModel} from "../../../repositories/admin/order/model";
import ProductRepository from "../../../repositories/admin/product/repository";
import ProductWarehouseRepository from "../../../repositories/admin/productWarehouse/repository";
import {DiscountController} from "./discount";
import z from "zod";
import DiscountRepository from "../../../repositories/admin/discount/repository";


export class OrderController extends BaseController<Order> {
    proRepo: ProductRepository;
    prowareRepo: ProductWarehouseRepository;
    orderRepo: OrderRepository;
    discountController: DiscountController;

    constructor(baseRoute: string, repo: OrderRepository) {
        super(baseRoute, repo);
        this.orderRepo = new OrderRepository();
        this.proRepo = new ProductRepository();
        this.prowareRepo = new ProductWarehouseRepository();
        this.discountController = new DiscountController("/discount", new DiscountRepository());
    }

    @Post("/checkout", {loginRequired: true})
    async orderCheckout(
        @User() user: UserInfo,
        @Body({
            schema: z.object({
                orderList: z.array(
                    z.object({
                        productwarehouse: BaseController.id,
                        quantity: z.number().positive().default(1),
                    })
                ),
            }),
        })
        data: Order
    ): Promise<Response> {
        const newOrder = await this.createNewOrder(data, user.id);
        if (newOrder.status !== 200 || !newOrder.data) {
            return newOrder;
        }

        const orderId = newOrder.data._id;
        const discountResult = await this.discountController.generateDiscountAfterInvoice(user, {orderId});

        return {
            status: 200,
            message: "Order created and discount generated",
            data: {order: newOrder.data, discount: discountResult.data},
        };
    }

    private async createNewOrder(data: Order, userId: string): Promise<Response> {
        try {
            data.user = userId;
            let totalCost = 0;
            let totalPriceProducts = 0;

            const orderLists = data.orderList;
            for (const item of orderLists) {
                const productwarehouse = await this.prowareRepo.findById(item.productwarehouse as string);
                if (!productwarehouse) {
                    return {status: 400, message: "Product in warehouse not found"};
                }
                if (productwarehouse.quantity < item.quantity) {
                    return {status: 400, message: "Not enough quantity"};
                }
                const product = await this.proRepo.findById(productwarehouse.product as string);
                item.price = productwarehouse.price;
                item.product = product?._id;
                totalPriceProducts += item.price * item.quantity;
                // totalCost += (productwarehouse.cost || 0) * item.quantity;
            }

            data.orderList = orderLists;
            data.totalCost = totalCost;
            data.totalPriceProducts = totalPriceProducts;

            const result = await this.repository.insert(data);
            return {status: 200, message: "Order created", data: result};
        } catch (error) {
            console.error("Error creating order:", error);
            throw error;
        }
    }
}

const order = new OrderController("/order", new OrderRepository());
export default order;