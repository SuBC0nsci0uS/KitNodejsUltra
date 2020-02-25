import { Module } from '@nestjs/common';
import {OwnerController} from "./Controller/OwnerController";
import {InMemoryOwnerRepository} from "infrastructure/distribution/InMemoryOwnerRepository";

@Module({
    controllers: [
        OwnerController
    ],
    providers:[
        {
            provide: "IOwnerRepository",
            useValue: new InMemoryOwnerRepository()
        }
    ]
})
export class OwnerModule {}
