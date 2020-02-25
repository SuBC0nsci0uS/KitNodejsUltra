import { ICarRepository } from "domain/build/repository/ICarRepository";
import { Car } from "domain/build/entity/Car";
import { CarValidator } from "domain/build/validator/CarValidator";
import moment from "moment";
import { v4 as uuid } from 'uuid';

const cars: Map<string, Car> = new Map<string, Car>();

export class InMemoryCarRepository implements ICarRepository {
  private readonly validator: CarValidator = new CarValidator();

  public async Save(car: Car): Promise<Car> {
    if (this.validator.Validate(car) === false) {
      // TODO: Replace on custom exception
      throw new Error("Car entity is not valid");
    }

    car.id = uuid();
    cars.set(car.id, car);
    return car;
  }

  public async GetById(id: string): Promise<Car> {
    if (cars.has(id) === false) {
      // TODO: Replace on custom exception
      throw new Error("Cannot find car with id: " + id);
    }

    return cars.get(id)!;
  }

  public async DeleteById(id: string): Promise<Car> {
    if (cars.has(id) === false) {
      // TODO: Replace on custom exception
      throw new Error("Cannot find car with id: " + id);
    } else {
      const car: Car = cars.get(id)!;
      cars.delete(id);
      return car;
    }
  }

  public async GetAll(): Promise<Car[]> {
    return Array.from(cars.values());
  }

  async Update(car: Car): Promise<Car> {
    if (cars.has(car.id) === false) {
      throw new Error('Cannot find car with id: ' + car.id);
    }
    cars.set(car.id, car);
    return car;
  }

  async GetCarsWithRegistrationDateMoreThan(month: number): Promise<Car[]> {
    const a = Array.from(cars.values());
    const currentDate = new Date();
    return a.filter((car: Car) => {
      const months = moment(currentDate).diff(car.firstRegistrationDate, "months");
      return months >= month;
    });
  }
}
