import ProductRepositoryInterface from "../../../domain/product/repository/product-repository-interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export class UpdateProductUseCase {
    private productRepository: ProductRepositoryInterface

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository
    }

    async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
        const productFound = await this.productRepository.find(input.id)
        productFound.changeName(input.name)
        productFound.changePrice(input.price)

        await this.productRepository.update(productFound)

        return {
            id: productFound.id,
            name: productFound.name,
            price: productFound.price
        }
        
    }
}