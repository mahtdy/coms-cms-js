// src/apps/user/controllers/discount.ts
import  Discount,{ DiscountModel } from "../../../repositories/admin/discount/model";
import DiscountRepository from "../../../repositories/admin/discount/repository";
import OrderRepository from "../../../repositories/admin/order/repository";
import  BaseController  from "../../../core/mongoose-controller/controller";
import { Response } from "../../../core/controller";

import { Post, Get } from "../../../core/decorators/method";
import { Body, User } from "../../../core/decorators/parameters";
import { UserInfo } from "../../../core/mongoose-controller/auth/user/userAuthenticator";
import z from "zod";

export class DiscountController extends BaseController<Discount> {
    private orderRepo: OrderRepository;

    constructor(baseRoute: string, repo: DiscountRepository) {
        super(baseRoute, repo);
        this.orderRepo = new OrderRepository();
    }

    @Post("/generate-after-invoice")
    async generateDiscountAfterInvoice(
        @User() user: UserInfo,
        @Body({ schema: z.object({ orderId: z.string() }) })
        { orderId }: { orderId: string }
    ): Promise<Response> {
        const order = await this.orderRepo.findById(orderId);
        if (!order) return { status: 404, message: "Order not found" };

        const totalCost = order.totalCost || 0;
        const totalPrice = order.totalPriceProducts || 0;
        const profit = totalPrice - totalCost;

        const activeDiscount = await this.repository.findOne({
            applyOnInvoice: true,
            isActive: true,
            disStart: { $lte: new Date() },
            disEnd: { $gte: new Date() },
        });

        if (!activeDiscount) return { status: 404, message: "No active discount settings found" };

        // ... بقیه منطق مشابه admin/controllers/discount.ts
        return { status: 200, message: "Discount code generated" };
    }
}

const discountController = new DiscountController("/discount", new DiscountRepository());
export default discountController; // نمونه صادر شده