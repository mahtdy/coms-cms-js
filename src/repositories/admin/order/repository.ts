import BaseRepositoryService from "../../../core/mongoose-controller/repository";
import { RepositoryConfigOptions } from "../../../core/mongoose-controller/repository";
import Order, { OrderModel } from "../../../repositories/admin/order/model";
import user from "../../../apps/admin/controllers/user";

export default class OrderRepository extends BaseRepositoryService<Order> {
  constructor(options?: RepositoryConfigOptions) {
    super(OrderModel, options);
  }
// }
// src/repositories/admin/order/repository.ts

// export default class OrderRepository {
  async insert(data: Order): Promise<Order> {
    const order = new OrderModel(data);
    return await order.save();
  }

  async findAll(): Promise<Order[]> {
    return await OrderModel.find().exec();
  }

  async findByUser(userId: string): Promise<Order[]> {
    return await OrderModel.find({ user: user }).exec();
  }

  async findById(id: string): Promise<Order | null> {
    return await OrderModel.findById(id).exec();
  }

  async update(id: string, data: Partial<Order>): Promise<Order | null> {
    return await OrderModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }
}