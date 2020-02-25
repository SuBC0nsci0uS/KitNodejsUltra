import {Car} from "domain/build/entity/Car";
import {CarResponseDTO} from "../DTO/CarResponseDTO";


export namespace CarMapper {
    export function ToCarResponse(car: Car): CarResponseDTO {
        const response: CarResponseDTO = new CarResponseDTO();

        response.id = car.id;
        response.price = car.price;
        response.discount = car.discount !== undefined ? car.discount.amount : 0;
        response.firstRegistrationDate = car.firstRegistrationDate;
        response.manufacture = car.manufacturer.id;

        return response;
    }
}
