import { Module } from '@nestjs/common';
import {ManufacturerController} from "./Controller/ManufacturerController";
import {InMemoryManufacturerRepository} from "infrastructure/distribution/InMemoryManufacturerRepository";

@Module({
    controllers: [
        ManufacturerController
    ],
    providers: [
        {
            provide: "IManufactureRepository",
            useClass: InMemoryManufacturerRepository
        }
    ]
})
export class ManufactureModule {}
