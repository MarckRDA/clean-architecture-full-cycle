import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("Should throw an error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("Should throw an error when custmerId is empty", () => {
    expect(() => {
      let order = new Order("123", "", []);
    }).toThrowError("customerId is required");
  });

  it("Should throw an error when custmerId is empty", () => {
    expect(() => {
      let order = new Order("123", "123", []);
    }).toThrowError("Items are required");
  });

  it("Should calculate total", () => {
    const item = new OrderItem("123", "PS5", 100, "p1", 2);
    const item2 = new OrderItem("132", "PS4", 200, "p2", 2);
    const order = new Order("321", "157", [item]);

    let total = order.total();

    expect(total).toBe(200);

    const order2 = new Order("45", "157", [item, item2]);
    total = order2.total();

    expect(total).toBe(600);
  });

  it("Should throw error if the qte qtd is less or equal zero ", () => {
    expect(() => {
      const item = new OrderItem("123", "PS5", 100, "p1", 0);
      const order = new Order("321", "157", [item]);
    }).toThrowError("Quantity must be greater than 0");
  });
});
