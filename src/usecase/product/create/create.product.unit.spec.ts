import { CreateProductUseCase } from "./create.product.usecase";

describe("unit test create use case", () => {
  const input = {
    id: "123",
    name: "PS5",
    price: 4500.0,
  };

  const MockRepository = () => {
    return {
      create: jest.fn(),
      find: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
    };
  };
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const result = await useCase.execute(input);

    expect(result).toEqual({
      id: "123",
      name: "PS5",
      price: 4500.0,
    });
  });
});
