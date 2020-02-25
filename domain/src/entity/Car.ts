import { Manufacturer } from "./Manufacturer";
import { Owner } from "./Owner";
import { Discount } from "./Discount";
export class Car {
  private _id: string;
  private _manufacturer: Manufacturer;
  private _price: number;
  private _firstRegistrationDate: Date;
  private _owners: Owner[] = [];
  private _discount?: Discount;


  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  get price(): number {
    return this._price;
  }
  set price(value: number) {
    this._price = value;
  }

  get firstRegistrationDate(): Date {
    return this._firstRegistrationDate;
  }
  set firstRegistrationDate(value: Date) {
    this._firstRegistrationDate = value;
  }

  get manufacturer(): Manufacturer {
    return this._manufacturer;
  }
  set manufacturer(value: Manufacturer) {
    this._manufacturer = value;
  }

  get owners(): Owner[] {
    return this._owners;
  }
  set owners(value: Owner[]) {
    this._owners = value;
  }

  get discount(): Discount {
    return this._discount!;
  }

  set discount(value: Discount) {
    this._discount = value;
  }

  public addDiscount(percent: number) {
    this.discount = new Discount();
    this.discount.amount = (this.price / 100) * percent;
  }

  public RemoveOwners() {
    this.owners = [];
  }
}
