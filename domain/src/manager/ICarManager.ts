import {Car} from "../entity/Car";
import {CarUpdateRequestDTO} from "../dto/CarUpdateRequestDTO";
import {CarCreateRequestDTO} from "../dto/CarCreateRequestDTO";

export interface ICarManager {
    CalculateDiscount(date: Date): Promise<Car[]>;
    RemoveAllOwners(date: Date): Promise<Car[]>;
    GetById(id: string): Promise<Car>;
    GetAll(): Promise<Car[]>;
    Delete(id: string): Promise<Car>;
    Update(id: string, dto: CarUpdateRequestDTO): Promise<Car>;
    Create(dto: CarCreateRequestDTO): Promise<Car>;
}
