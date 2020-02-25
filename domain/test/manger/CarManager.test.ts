import { expect } from 'chai';

import {CarManager} from "../../src/manager/CarManager";
import { IManufactureRepository } from "../../src/repository/IManufactureRepository"
import { IOwnerRepository } from "../../src/repository/IOwnerRepository"
import { ICarRepository } from "../../src/repository/ICarRepository"
import {CarCreateRequestDTO} from "../../src/dto/CarCreateRequestDTO";
import {stubInterface} from "ts-sinon";
import {Car} from "../../src/entity/Car";
import {Manufacturer} from "../../src/entity/Manufacturer";


describe('Car manager (service)', async () => {
    const carRepository = stubInterface<ICarRepository>();
    const manufactureRepository = stubInterface<IManufactureRepository>();
    const ownerRepository = stubInterface<IOwnerRepository>();
    const manager = new CarManager(carRepository, manufactureRepository, ownerRepository);


    carRepository.Save.returns(car());
    carRepository.GetById.returns(car());
    carRepository.DeleteById.returns(car());
    carRepository.GetAll.returns(cars());
    manufactureRepository.GetById.returns(manufacture());

    it('should create new car', async () => {
        const dto = new CarCreateRequestDTO();
        dto.price = 20;
        dto.manufacturer = '123123';
        dto.firstRegistrationDate = new Date();

        const result = await manager.Create(dto);

        expect(result).be.not.undefined;
        expect(result).be.a.instanceof(Car)
    });

    it('should get car with id 485', async () => {
        const id = '485';
        const result = await manager.GetById(id);

        expect(result).be.not.undefined;
        expect(result).be.a.instanceof(Car);
        expect(result.id).be.equal('485');
    });

    it('should remove car with id 485', async () => {
        const id = '485';
        const result = await manager.Delete(id);

        expect(result).be.not.undefined;
        expect(result).be.a.instanceof(Car);
        expect(result.id).be.equal('485');
    });

    it('should return 2 cars', async () => {
        const result = await manager.GetAll();

        expect(result).be.not.undefined;
        expect(result).be.a.instanceof(Array);
        expect(result).be.length(2);
    });
});




async function car(): Promise<Car> {
    const car = new Car();
    car.id = '485';
    car.price = 20;
    car.manufacturer = await manufacture();
    car.firstRegistrationDate = new Date();
    car.owners = [];
    return car;
}

async function cars(): Promise<Car[]> {
    const car1 = new Car();
    car1.id = '485';
    car1.price = 20;
    car1.manufacturer = await manufacture();
    car1.firstRegistrationDate = new Date();
    car1.owners = [];

    const car2 = new Car();
    car2.id = '485';
    car2.price = 20;
    car2.manufacturer = await manufacture();
    car2.firstRegistrationDate = new Date();
    car2.owners = [];

    return [ car1, car2 ];
}

async function manufacture(): Promise<Manufacturer> {
    const manufacture = new Manufacturer();
    manufacture.id = '123321';
    manufacture.name = 'Some name';
    manufacture.siret = 123456789000;
    manufacture.phone = '+380977777777';
    return manufacture;
}

