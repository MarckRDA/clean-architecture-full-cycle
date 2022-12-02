import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../domain/product/repository/product-repository";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import { FindProductUseCase } from "./find.product.usecase";

describe("Integrated product find use case ", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('Should find a product', async () => {
    const productRepository = new ProductRepository()
    const useCase = new FindProductUseCase(productRepository)

    const product = new Product('123', 'PS5', 4500.0)
    productRepository.create(product)

    const input = {
        id: '123'
    }

    const output = {
        name: 'PS5',
        price: 4500.0
    }

    const result = await useCase.execute(input)

    expect(result).toEqual(output)
  })
});
