import {Manufacturer} from "domain/build/entity/Manufacturer";
import {ManufactureResponseDTO} from "../DTO/ManufactureResponseDTO";

export namespace ManufacturerMapper {
    export function ToResponse(manufacturer: Manufacturer): ManufactureResponseDTO {
        const response: ManufactureResponseDTO = new ManufactureResponseDTO();

        response.id = manufacturer.id;
        response.name = manufacturer.name;
        response.phone = manufacturer.phone;
        response.siret = manufacturer.siret;

        return response;
    }
}
