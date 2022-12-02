import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../domain/product/repository/product-repository";
import { FindProductUseCase } from "./find.product.usecase";

describe("unit test product find use case ", () => {
  const output = {
    name: "PS5",
    price: 4500.0,
  };

  const MockRepository = () => {
    return {
      create: jest.fn(),
      find: jest.fn().mockReturnValue(output),
      findAll: jest.fn(),
      update: jest.fn(),
    };
  };

  it("Should find a product", async () => {
    const productRepository = MockRepository();
    const useCase = new FindProductUseCase(productRepository);

    const product = new Product("123", "PS5", 4500.0);
    productRepository.create(product);

    const input = {
      id: "123",
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });
});
