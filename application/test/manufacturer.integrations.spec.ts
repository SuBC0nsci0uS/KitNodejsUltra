import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import {ManufacturerController} from "../src/ManufactureModule/Controller/ManufacturerController";
import {InMemoryManufacturerRepository} from "infrastructure/distribution/InMemoryManufacturerRepository";
import {IManufactureRepository} from "domain/build/repository/IManufactureRepository";
import {Manufacturer} from "domain/build/entity/Manufacturer";

describe("ManufacturerController (integration)", () => {
    let app: INestApplication;
    let manufactureRepository: IManufactureRepository;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [
                ManufacturerController
            ],
            providers: [
                {
                    provide: "IManufactureRepository",
                    useClass: InMemoryManufacturerRepository
                }
            ]
        }).compile();

        app = moduleFixture.createNestApplication();
        manufactureRepository = moduleFixture.get<IManufactureRepository>("IManufactureRepository");
        await app.init();
    });

    it("/manufacturer (GET)", () => {
        jest.spyOn(manufactureRepository, 'GetAll').mockImplementation(async () => {
            return [ { id: 'some id value', name: "name", phone: "+380977777777", siret: 12345678900 } ] as Manufacturer[];
        });

        return request(app.getHttpServer())
            .get("/manufacturer")
            .expect(200)
            .expect([
                {
                    id: 'some id value',
                    name: "name",
                    phone: "+380977777777",
                    siret: 12345678900
                }
            ]);
    });

    it("/manufacturer (POST)", () => {
        jest.spyOn(manufactureRepository, 'Create').mockImplementation(async (manufacture) => {
            manufacture.id = "f5e0cc29-3655-40f5-8d50-fb92d13e5175";
            return manufacture as Manufacturer;
        });

        return request(app.getHttpServer())
            .post("/manufacturer" )
            .send({
                name: "Alex",
                phone: "+380977777777",
                siret: 12345678900,
            })
            .expect(201)
            .expect({
                id: "f5e0cc29-3655-40f5-8d50-fb92d13e5175",
                name: "Alex",
                phone: "+380977777777",
                siret: 12345678900
            });
    });

    it("/manufacturer (PUT)", () => {
        jest.spyOn(manufactureRepository, 'GetById').mockImplementation(async (id) => {
            return { id, name: "Name of manufacture", phone: "+380977777777", siret: 12345678900 } as Manufacturer;
        });
        jest.spyOn(manufactureRepository, 'Update').mockImplementation(async (manufacture) => {
            return manufacture as Manufacturer;
        });

        return request(app.getHttpServer())
            .put("/manufacturer/f5e0cc29-3655-40f5-8d50-fb92d13e5175" )
            .send({
                name: "Alex",
                phone: "+380977777777",
                siret: 12345678912,
            })
            .expect(200)
            .expect({
                id: "f5e0cc29-3655-40f5-8d50-fb92d13e5175",
                name: "Alex",
                phone: "+380977777777",
                siret: 12345678912
            });
    });

});
