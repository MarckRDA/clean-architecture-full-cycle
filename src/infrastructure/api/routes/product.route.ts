import express, { Request, Response } from "express";
import CustomerCreateUseCase from "../../../usecase/customer/create/create.customer.usecase";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import { CreateProductUseCase } from "../../../usecase/product/create/create.product.usecase";
import { ListProductUseCase } from "../../../usecase/product/list/list.product.usecase";
import CustomerRepository from "../../customer/repository/sequilize/customer-repository";
import ProductRepository from "../../product/repository/sequilize/product.repository";
import CustomerPresenter from "../presenters/customers.presenter";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
const usecase = new CreateProductUseCase(new ProductRepository())

  try {
    const { body } = req;
    const productDTO = {
      id: body.id,
      name: body.name,
      price: body.price
    };

    const output = await usecase.execute(productDTO);

    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRoute.get("/", async (_: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository())

  try {
    const output = await usecase.execute({});

    res.send(output)
    
  } catch (err) {
    res.status(500).send(err);
  }
});
