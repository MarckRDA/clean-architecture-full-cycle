export default class OrderItem {
  private _id: string;
  private _productId: string
  private _name: string;
  private _price: number;
  private _qtd: number

  constructor(id: string, name: string, price: number, productId: string, qtd: number ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._productId = productId 
    this._qtd = qtd
  }
  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get productId(): string {
    return this._productId;
  }

  get price(): number {
    return this._price * this._qtd
  }

  get qtd(): number {
    return this._qtd
  }

}
