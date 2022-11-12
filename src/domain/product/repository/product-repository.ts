
import ProductRepositoryInterface from "./product-repository-interface";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import Product from "../entity/product";

export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      { where: { id: entity.id } }
    );
  }

  async find(id: string): Promise<Product> {
    const productFound = await ProductModel.findOne({ where: { id } })
    return new Product(productFound.id, productFound.name, productFound.price)
  }

  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll()
    return productModels.map(p => new Product(p.id, p.name, p.price))
  }
}
