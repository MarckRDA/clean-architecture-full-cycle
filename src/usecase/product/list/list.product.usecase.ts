import ProductRepositoryInterface from "../../../domain/product/repository/product-repository-interface";
import {
  InputListProductUseCaseDto,
  OutputListProductUseCaseDto,
} from "./list.product.dto";

export class ListProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(
    input: InputListProductUseCaseDto
  ): Promise<OutputListProductUseCaseDto> {
    const allProducts = await this.productRepository.findAll();

    return {
        list: allProducts.map((p) => {
            return {
              id: p.id,
              name: p.name,
              price: p.price,
            };
          })
    }
  }
}
