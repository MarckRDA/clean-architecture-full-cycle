import Order from "../entity/order"
import OrderItem from "../entity/order_item"

interface OrderFactoryProps {
    id: string
    customerId: string
    items: {
        id: string
        name: string
        productId: string
        qtd: number
        price: number
    }[]
}
export default class OrderFactory {
    static create(orderProps: OrderFactoryProps): Order {
        const items = orderProps.items.map(i => {
            return new OrderItem(i.id, i.name, i.price, i.productId, i.qtd)
        })

        return new Order(orderProps.id, orderProps.customerId, items)
    }
}