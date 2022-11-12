import Product from "../entity/product"
import ProductService from "./product-service"

describe('Product service unit tests',() => {
    it('Should change the prices of all products', () => {
        const p1 = new Product('123', 'p1', 10)
        const p2 = new Product('321', 'p2', 20)
        const products = [p1,p2]

        ProductService.increasePrice(products, 100)

        expect(p1.price).toBe(20)
        expect(p2.price).toBe(40)
    })
})