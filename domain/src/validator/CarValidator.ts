import { IValidator } from "./IValidator";
import { Car } from "../entity/Car";

export class CarValidator implements IValidator<Car, boolean> {
  Validate(car: Car): boolean {
    return car.manufacturer !== null && car.manufacturer !== undefined &&
           car.price !== undefined && car.price !== null && car.price > 0 &&
           car.firstRegistrationDate !== null && car.firstRegistrationDate !== undefined;
  }
}
