
import Customer from "../../customer/entity/customer"
import Order from "../entity/order"
import OrderItem from "../entity/order_item"
import OrderService from "./order-service"

describe('Order service unit tests',() => {

    it('Should place an order', () => {
        const customer = new Customer('c1', 'customer 1')
        const oi1 = new OrderItem('123','it1', 10, 'p1', 1)
       
        const order = OrderService.placeOrder(customer, [oi1])

        expect(customer.rewardPoints).toBe(5)
        expect(order.total()).toBe(10)
    })

    it('Should get total of all orders', () => {
        const oi1 = new OrderItem('123','it1', 100, 'p1', 1)
        const oi2 = new OrderItem('321','it2', 200, 'p2', 2)
        
        const order = new Order('o1', 'c1', [oi1])
        const order2 = new Order('o2', 'c1', [oi2])
        
        const total = OrderService.total([order, order2])
        
        expect(total).toBe(500)
    })
})