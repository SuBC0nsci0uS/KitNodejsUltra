import { Car } from "../entity/Car";

export interface ICarRepository {
  Save(car: Car): Promise<Car>;
  GetById(id: string): Promise<Car>;
  DeleteById(id: string): Promise<Car>;
  GetAll(): Promise<Car[]>;
  GetCarsWithRegistrationDateMoreThan(month: number): Promise<Car[]>;
  Update(car: Car): Promise<Car>;
}
