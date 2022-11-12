import ProductFactory from "./product-factory"

describe('ProductFactory unit test', () => {
    it('Should create a product type a', () => {
        const product = ProductFactory.create('a', 'p A', 1)

        expect(product.id).toBeDefined()
        expect(product.name).toBe('p A')
        expect(product.price).toBe(1)
        expect(product.constructor.name).toBe('Product')
    })

    it('Should create a product type a', () => {
        const product = ProductFactory.create('b', 'p B', 1)

        expect(product.id).toBeDefined()
        expect(product.name).toBe('p B')
        expect(product.price).toBe(2)
        expect(product.constructor.name).toBe('ProductB')
    })

    it('Should throw an error when product type not supported', () => {
        expect(() => ProductFactory.create('c', 'p C', 1)).toThrowError('Product type not supported')
    })
})