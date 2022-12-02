import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository-interface";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";

export class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const productToCreate = new Product(input.id, input.name, input.price)
    this.productRepository.create(productToCreate)

    return {
        id: productToCreate.id,
        name: productToCreate.name,
        price: productToCreate.price
    }
  }
}
