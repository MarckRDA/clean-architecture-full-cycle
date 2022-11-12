import { randomUUID } from 'crypto'
import OrderFactory from './order-factory'

describe('Order factory unit test', () => {
    it('should create an order', () => {
        const orderProps = {
            id: randomUUID(),
            customerId: randomUUID(),
            items: [
                {
                    id: randomUUID(),
                    name: 'p1',
                    productId: randomUUID(),
                    qtd: 1,
                    price: 100
                }
            ]
        }

        const order = OrderFactory.create(orderProps)

        expect(order.id).toEqual(orderProps.id)
        expect(order.customerId).toEqual(orderProps.customerId)
        expect(order.items.length).toBe(1)

    })
})