import moment from "moment";
import {ICarRepository} from "../repository/ICarRepository";
import {Car} from "../entity/Car";
import {ICarManager} from "./ICarManager";
import {CarCreateRequestDTO} from "../dto/CarCreateRequestDTO";
import {IManufactureRepository} from "../repository/IManufactureRepository";
import {CarUpdateRequestDTO} from "../dto/CarUpdateRequestDTO";
import {IOwnerRepository} from "../repository/IOwnerRepository";

export class CarManager implements ICarManager {

    private readonly DISCOUNT_AMOUNT: number = 20;
    private readonly TRIGGER_MONTH_MIN: number = 12;
    private readonly TRIGGER_MONTH_MAX: number = 18;

    constructor (
        private readonly carRepository: ICarRepository,
        private readonly manufactureRepository: IManufactureRepository,
        private readonly ownerRepository: IOwnerRepository,
    )
    { }

    public async Create(dto: CarCreateRequestDTO): Promise<Car>
    {
        const car = new Car();
        car.price = dto.price;
        car.firstRegistrationDate = dto.firstRegistrationDate;
        car.manufacturer = await this.manufactureRepository.GetById(dto.manufacturer);

        return this.carRepository.Save(car);
    }

    public async Update(id: string, dto: CarUpdateRequestDTO): Promise<Car>
    {
        const car: Car = await this.carRepository.GetById(id);

        car.price = dto.price;
        car.firstRegistrationDate = dto.firstRegistrationDate;
        car.manufacturer = await this.manufactureRepository.GetById(dto.manufacturer);
        car.owners = await this.ownerRepository.GetOwnersById(dto.owners);

        return this.carRepository.Update(car);
    }

    public async Delete(id: string): Promise<Car>
    {
        return this.carRepository.DeleteById(id);
    }

    public async GetAll(): Promise<Car[]>
    {
        return this.carRepository.GetAll();
    }

    public async GetById(id: string): Promise<Car>
    {
        return this.carRepository.GetById(id);
    }

    public async CalculateDiscount(date: Date): Promise<Car[]>
    {
        const cars = await this.carRepository.GetCarsWithRegistrationDateMoreThan(this.TRIGGER_MONTH_MIN);

        cars.forEach(car => {
            const months = moment(date).diff(car.firstRegistrationDate, "months");
            if (months <= this.TRIGGER_MONTH_MAX) {
                car.addDiscount(this.DISCOUNT_AMOUNT)
            }
        });

        return cars;
    }

    public async RemoveAllOwners(date: Date): Promise<Car[]>
    {
        const cars = await this.carRepository.GetCarsWithRegistrationDateMoreThan(this.TRIGGER_MONTH_MIN);

        cars.forEach(car => {
            const months = moment(date).diff(car.firstRegistrationDate, "months");
            if (months >= this.TRIGGER_MONTH_MAX) {
                car.RemoveOwners();
            }
        });

        return cars;
    }
}
