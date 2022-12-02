import Product from "../../../domain/product/entity/product";
import { UpdateProductUseCase } from "./update.product.usecase";

describe("unit test update use case", () => {
  const product = new Product("456", "PS4",2000.0,);

  const input = {
    id: "456",
    name: "PS5",
    price: 4000.0,
  };

  const MockRepository = () => {
    return {
      create: jest.fn(),
      find: jest.fn().mockReturnValue(product),
      update: jest.fn(),
      findAll: jest.fn(),
    };
  };
  it("should return a product updated", async () => {
    const productReposiroty = MockRepository();
    const useCase = new UpdateProductUseCase(productReposiroty);

    const productUpdated = await useCase.execute(input);

    expect(productUpdated).toEqual(input);
  });
});
