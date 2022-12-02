import ProductRepositoryInterface from "../../../domain/product/repository/product-repository-interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export class FindProductUseCase {
    private productRepository: ProductRepositoryInterface
    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository
    }

    async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
        const productFound = await this.productRepository.find(input.id)

        return {
            name: productFound.name,
            price: productFound.price
        }
    }
}