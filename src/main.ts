
import Address from "./domain/customer/value-object/Address";
import Customer from "./domain/customer/entity/customer";
import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";

let customer = new Customer('123', 'marcos')
const address = new Address('Rua d', 2, '12345-789', 'Rio de Janeiro')
customer.Address = address
customer.activate()


const item1 = new OrderItem('1', 'Item1', 10, 'p1', 2)
const item2 = new OrderItem('1', 'Item1', 15, 'p2', 2)

const order = new Order('1', '123', [item1, item2])
