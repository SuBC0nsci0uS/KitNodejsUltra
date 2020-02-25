import {Owner} from "../entity/Owner";

export interface IOwnerRepository {
    GetAll(): Promise<Owner[]>;
    GetOwnersById(ids: string[]): Promise<Owner[]>;
    GetById(id: string): Promise<Owner>;
    Update(owner: Owner): Promise<Owner>;
    DeleteById(id: string): Promise<Owner>;
    Create(owner: Owner): Promise<Owner>;
}
