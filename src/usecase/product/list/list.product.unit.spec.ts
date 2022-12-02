import { ListProductUseCase } from "./list.product.usecase";

describe("unit test list use case", () => {
  const input = {};
  const product1 = {
    id: "123",
    name: "PS4",
    price: 2000.0,
  };

  const product2 = {
    id: "456",
    name: "PS5",
    price: 4000.0,
  };

  const MockRepository = () => {
    return {
      create: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn().mockReturnValue([product1, product2]),
    };
  };
  it("should return a list of product", async () => {
    const productReposiroty = MockRepository();
    const useCase = new ListProductUseCase(productReposiroty);

    const allProducts = await useCase.execute(input);
    expect(allProducts).toEqual({list: [product1, product2]});
  });
});
