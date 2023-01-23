import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("Should create a product", async () => {
    const response = await request(app).post("/product").send({
      id: "123",
      name: "ps4",
      price: 2000,
    });

    expect(response.status).toBe(200);
  });

  it("Should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "ps4",
    });

    expect(response.status).toBe(500);
  });

  it("Should list products", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        id: '123',
        name: "ps4",
        price: 2000
      });

    expect(response.status).toBe(200);

    const response2 = await request(app)
      .post("/product")
      .send({
        id: '321',
        name: "ps5",
        price: 4500
      });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();
    console.log(listResponse)
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.list.length).toBe(2);

    const product1 = listResponse.body.list[0];
    expect(product1.name).toBe("ps4");
    const product2 = listResponse.body.list[1];
    expect(product2.name).toBe("ps5");
  });
});
