import Product from "../entity/product";
import ProductInterface from "../entity/product-interface";
import { randomUUID } from 'crypto'
import ProductB from "../entity/product-b";
export default class ProductFactory {
    static create(type: string, name: string, price:number): ProductInterface {
        switch(type) {
            case 'a':
                return new Product(randomUUID(), name, price)
            case 'b': 
                return new ProductB(randomUUID(), name, price)
            default:
                throw new Error('Product type not supported')
        }
    }
}