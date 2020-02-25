import {IOwnerRepository} from "domain/build/repository/IOwnerRepository";
import {Owner} from "domain/build/entity/Owner";
import { v4 as uuid } from 'uuid';


const owners: Map<string, Owner> = new Map<string, Owner>();

export class InMemoryOwnerRepository implements IOwnerRepository {
    async Create(owner: Owner): Promise<Owner> {
        if (owners.has(owner.id)) {
            throw new Error('Owner already exist');
        }

        owner.id = uuid();
        owners.set(owner.id, owner);

        return owner;
    }

    async GetById(id: string): Promise<Owner> {
        if (owners.has(id) === false) {
            throw new Error('Owner does not exist');
        } else {
            return owners.get(id)!;
        }
    }

    async GetOwnersById(ids: string[]): Promise<Owner[]> {
        if (ids.length <= 0) {
            return [];
        } else {
            const allOwners = Array.from(owners.values());

            return allOwners.filter(owner => {
                return ids.some(id => id === owner.id);
            })
        }
    }

    async Update(owner: Owner): Promise<Owner> {
        if (owners.has(owner.id) === false) {
            throw new Error('Owner does not exist');
        } else {
            owners.set(owner.id, owner);
            return owner;
        }
    }

    async DeleteById(id: string): Promise<Owner> {
        if (owners.has(id) === false) {
            throw new Error('owner dose not exist');
        } else {
            const owner = owners.get(id)!;
            owners.delete(id);
            return owner;
        }
    }

    async GetAll(): Promise<Owner[]> {
        return Array.from(owners.values());
    }
}
