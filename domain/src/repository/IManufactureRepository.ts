import {Manufacturer} from "../entity/Manufacturer";

export interface IManufactureRepository {
    GetAll(): Promise<Manufacturer[]>;
    Create(manufacture: Manufacturer): Promise<Manufacturer>;
    GetById(id: string): Promise<Manufacturer>;
    Update(manufacture: Manufacturer): Promise<Manufacturer>;
    Delete(id: string): Promise<Manufacturer>;
}
