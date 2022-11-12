import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model"
import Product from "../entity/product"
import ProductRepository from "./product-repository"

describe('Product repository test',() => {
    let sequilize: Sequelize

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })

        sequilize.addModels([ProductModel])
        await sequilize.sync()
    })

    afterEach(async () => {
        await sequilize.close()
    })

    it('Should create a product', async () => {
        const productRepository = new ProductRepository()
        const product = new Product('1', 'p1', 100)

        await productRepository.create(product)

        const productModel = await ProductModel.findOne({ where: { id: '1'}})

        expect(productModel.toJSON()).toStrictEqual({
            id: '1',
            name: 'p1',
            price: 100
        })
    })
    

    it('Should update a product', async () => {
        const productRepository = new ProductRepository()
        const product = new Product('1', 'p1', 100)

        await productRepository.create(product)

        const productModel = await ProductModel.findOne({ where: { id: '1'}})

        expect(productModel.toJSON()).toStrictEqual({
            id: '1',
            name: 'p1',
            price: 100
        })

        product.changeName('p2')
        product.changePrice(200)

        await productRepository.update(product)

        const productModel2 = await ProductModel.findOne({ where: { id: '1'}})

        expect(productModel2.toJSON()).toStrictEqual({
            id: '1',
            name: 'p2',
            price: 200
        })
    })

    it('should find a product', async () => {
        const productRepository = new ProductRepository()
        const product = new Product('1', 'p1', 100)

        await productRepository.create(product)

        const productModel = await ProductModel.findOne({ where: { id: '1'}})

        const productFound = await productRepository.find('1')

        expect(productModel.toJSON()).toStrictEqual({
            id: productFound.id, 
            name: productFound.name,
            price: productFound.price
        })
    })

    it('should find all products', async () => {
        const productRepository = new ProductRepository()
        const product1 = new Product('1', 'p1', 100)
        await productRepository.create(product1)
        
        const product2 = new Product('2', 'p2', 200)
        await productRepository.create(product2)

        const productsFound = await productRepository.findAll()
        const products = [product1,product2]

        expect(products).toEqual(productsFound)
    })

})