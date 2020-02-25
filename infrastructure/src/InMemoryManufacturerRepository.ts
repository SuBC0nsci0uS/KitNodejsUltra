import {IManufactureRepository} from "domain/build/repository/IManufactureRepository";
import {Manufacturer} from "domain/build/entity/Manufacturer";
import { v4 as uuid } from 'uuid';

const manufacturer: Map<string, Manufacturer> = new Map<string, Manufacturer>();

export class InMemoryManufacturerRepository implements IManufactureRepository {
    async Create(manufacture: Manufacturer): Promise<Manufacturer> {
        if (manufacturer.has(manufacture.id) === true) {
            throw new Error('Cannot find manufacturer with SIRET: ' + manufacture.id);
        } else {
            manufacture.id = uuid();
            manufacturer.set(manufacture.id, manufacture);
            return manufacture;
        }
    }

    async GetAll(): Promise<Manufacturer[]> {
        return Array.from(manufacturer.values());
    }

    async Delete(id: string): Promise<Manufacturer> {
        if (manufacturer.has(id) === false) {
            throw new Error('Cannot find manufacturer with SIRET: ' + id);
        } else {
            const manufacture = manufacturer.get(id);
            manufacturer.delete(id);
            return manufacture!;
        }
    }

    async GetById(id: string): Promise<Manufacturer> {
        if (manufacturer.has(id) === false) {
            throw new Error('Cannot find manufacturer with id: ' + id);
        } else {
            return manufacturer.get(id)!;
        }
    }

    async Update(manufacture: Manufacturer): Promise<Manufacturer> {
        if (manufacturer.has(manufacture.id) === false) {
            throw new Error('Cannot find manufacturer with id: ' + manufacture.id);
        } else {
            manufacturer.set(manufacture.id, manufacture);
            return manufacture;
        }
    }
}
