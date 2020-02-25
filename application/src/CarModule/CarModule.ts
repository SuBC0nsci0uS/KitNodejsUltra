import { Module } from '@nestjs/common';
import {ScheduleModule} from "nest-schedule";

import {InMemoryCarRepository} from "infrastructure/distribution/InMemoryCarRepository";
import {InMemoryManufacturerRepository} from "infrastructure/distribution/InMemoryManufacturerRepository";
import {InMemoryOwnerRepository} from "infrastructure/distribution/InMemoryOwnerRepository";

import {CarController} from "./Controller/CarController";
import {CarManager} from "domain/build/manager/CarManager";
import {ICarRepository} from "domain/build/repository/ICarRepository";
import {IOwnerRepository} from "domain/build/repository/IOwnerRepository";
import {IManufactureRepository} from "domain/build/repository/IManufactureRepository";


@Module({
    imports: [
        ScheduleModule.register(),
    ],
    controllers: [CarController],
    providers: [
        {
            provide: "ICarRepository",
            useValue: new InMemoryCarRepository()
        },
        {
            provide: "IManufactureRepository",
            useValue: new InMemoryManufacturerRepository()
        },
        {
            provide: "IOwnerRepository",
            useValue: new InMemoryOwnerRepository()
        },
        {
            provide: "ICarManager",
            useFactory: (carRepository: ICarRepository, manufactureRepository: IManufactureRepository, ownerRepository: IOwnerRepository,) => {
                return new CarManager(carRepository, manufactureRepository, ownerRepository);
            },
            inject: [
                "ICarRepository",
                "IManufactureRepository",
                "IOwnerRepository",
            ]
        }
    ]
})
export class CarModule {}
