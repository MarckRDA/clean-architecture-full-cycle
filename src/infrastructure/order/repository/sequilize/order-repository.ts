import Order from "../../../../domain/checkout/entity/order";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository-interface";
import OrderModel from "./order.model";
import OrderItemModel from "./orderItem.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async update(entity: Order): Promise<void> {
    try {
      await OrderModel.update({
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          qtd: item.qtd,
        })),
      }, {
        where: {
          id: entity.id
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  find(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }

  async create(entity: Order): Promise<void> {
    try {
      await OrderModel.create(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
          items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            qtd: item.qtd,
          })),
        },
        {
          include: [{ model: OrderItemModel }],
        }
      );
    } catch (error) {
      console.log(error)
    }
  }
}
