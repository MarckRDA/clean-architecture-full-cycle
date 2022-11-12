import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import { randomUUID } from 'crypto'

export default class OrderService {

    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if(items.length === 0) throw new Error('Order must have at least one item')

        const order = new Order(randomUUID(), customer.id, items)
        customer.addRewardPoints(order.total()/2)
        return order
    }

    static total(orders: Order[]): number {
        return orders.reduce((acc, orders) => acc + orders.total(), 0)
    }
}