import OrderItem from "./order_item";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }
  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._customerId.length === 0) {
      throw new Error("customerId is required");
    }
    if (this._items.length === 0) {
      throw new Error("Items are required");
    }
    if (this._items.some((i) => i.qtd <= 0)) {
      throw new Error("Quantity must be greater than 0");
    }
    return true;
  }

  removeItem(idItem: string): boolean {
    if (this._items.length < 1) return false
    
    const findIndex = this._items.findIndex(i => i.id === idItem)
    if (findIndex < 0) return false

    this._items.splice(findIndex, 1)
    return true
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }
}
