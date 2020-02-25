import {Owner} from "domain/build/entity/Owner";
import {OwnerResponseDTO} from "../DTO/OwnerResponseDTO";

export namespace OwnerMapper {

    export function ToResponse(owner: Owner): OwnerResponseDTO {
        return {
            id: owner.id,
            name: owner.name,
        };
    }

}
