import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import {InMemoryCarRepository} from "infrastructure/distribution/InMemoryCarRepository";
import {CarModule} from "../src/CarModule/CarModule";
import {ICarRepository} from "domain/build/repository/ICarRepository";
import {Car} from "domain/build/entity/Car";
import {InMemoryManufacturerRepository} from "infrastructure/distribution/InMemoryManufacturerRepository";
import {InMemoryOwnerRepository} from "infrastructure/distribution/InMemoryOwnerRepository";
import {IOwnerRepository} from "domain/build/repository/IOwnerRepository";
import {IManufactureRepository} from "domain/build/repository/IManufactureRepository";
import {CarManager} from "domain/build/manager/CarManager";

describe("CarController (integration)", () => {
    let app: INestApplication;
    let repository: ICarRepository;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                CarModule
            ],
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
                    useFactory: (carRepository: ICarRepository, manufactureRepository: IManufactureRepository, ownerRepository: IOwnerRepository) => {
                        return new CarManager(carRepository, manufactureRepository, ownerRepository);
                    },
                    inject: [
                        "ICarRepository",
                        "IManufactureRepository",
                        "IOwnerRepository",
                    ]
                }
            ]
        }).compile();

        app = moduleFixture.createNestApplication();
        repository = moduleFixture.get<ICarRepository>("ICarRepository");
        await app.init();
    });

    it("/cars (GET)", () => {
        return request(app.getHttpServer())
            .get("/cars")
            .expect(200)
            .expect([]);
    });

    it("/cars/:id (GET)", () => {
        jest.spyOn(repository, 'GetById').mockImplementation(async (id) => {
            return {
                id,
                price: 412.55,
                owners: [],
                manufacturer: { id: "123-456-789", name: "Some name", phone: "+380977777777", siret: 12345678900 },
                firstRegistrationDate: new Date('2020-02-25T11:09:18.275Z'),
            } as Car;
        });

        return request(app.getHttpServer())
            .get("/cars/123")
            .expect(200)
            .expect({
                id: '123',
                price: 412.55,
                discount: 0,
                firstRegistrationDate: '2020-02-25T11:09:18.275Z',
                manufacture: '123-456-789'
            });
    });

    it("/cars/:id (DELETE)", () => {
        jest.spyOn(repository, 'DeleteById').mockImplementation(async (id) => {
            return {
                id,
                price: 412.55,
                owners: [],
                manufacturer: { id: "123-456-789", name: "Some name", phone: "+380977777777", siret: 12345678900 },
                firstRegistrationDate: new Date('2010-01-10T11:10:18.275Z'),
            } as Car;
        });

        return request(app.getHttpServer())
            .delete("/cars/123")
            .expect(200)
            .expect('123');
    });
});
