import express, { Request, Response } from "express";
import CustomerCreateUseCase from "../../../usecase/customer/create/create.customer.usecase";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import CustomerRepository from "../../customer/repository/sequilize/customer-repository";
import CustomerPresenter from "../presenters/customers.presenter";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CustomerCreateUseCase(new CustomerRepository());

  try {
    const { body } = req;
    const customerDto = {
      name: body.name,
      address: {
        street: body.address.street,
        city: body.address.city,
        number: body.address.number,
        zip: body.address.zip,
      },
    };
    const output = await usecase.execute(customerDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

customerRoute.get("/", async (_: Request, res: Response) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());
  // o retorno do DTO  == Resultado que eu quero disponibilizar como resposta a API
  try {
    const output = await usecase.execute({});

    res.format({
      json: async () => res.send(output),
      xml: async () => res.send(CustomerPresenter.listXML(output))
    })
  } catch (err) {
    res.status(500).send(err);
  }
});
