import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import {OwnerController} from "../src/OwnerModule/Controller/OwnerController";
import {InMemoryOwnerRepository} from "infrastructure/distribution/InMemoryOwnerRepository";
import {IOwnerRepository} from "domain/build/repository/IOwnerRepository";
import {Owner} from "domain/build/entity/Owner";

describe("CarController (integration)", () => {
    let app: INestApplication;
    let repository: IOwnerRepository;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [
                OwnerController
            ],
            providers:[
                {
                    provide: "IOwnerRepository",
                    useValue: new InMemoryOwnerRepository()
                }
            ]
        }).compile();

        app = moduleFixture.createNestApplication();
        repository = moduleFixture.get<IOwnerRepository>("IOwnerRepository");
        await app.init();
    });

    it("/owners (GET)", () => {
        jest.spyOn(repository, 'GetAll').mockImplementation(async () => {
            return [ { id: "f5e0cc29-3655-40f5-8d50-fb92d13e5175", name: "Den" }, { id: "a1e8ca21-6677-45a5-8c50-fb92d13e8832", name: "Gary" } ] as Owner[];
        });

        return request(app.getHttpServer())
            .get("/owners")
            .expect(200)
            .expect([{
                id: "f5e0cc29-3655-40f5-8d50-fb92d13e5175",
                name: "Den"
            },{
                id: "a1e8ca21-6677-45a5-8c50-fb92d13e8832",
                name: "Gary"
            }]);
    });

    it("/owners (POST)", () => {
        jest.spyOn(repository, 'Create').mockImplementation(async (owner) => {
            owner.id = "f5e0cc29-3655-40f5-8d50-fb92d13e5175";
            return owner as Owner;
        });

        return request(app.getHttpServer())
            .post("/owners")
            .send({
                name: "Den"
            })
            .expect(201)
            .expect({
                id: "f5e0cc29-3655-40f5-8d50-fb92d13e5175",
                name: "Den"
            });
    });

    it("/owners/:id (GET)", () => {
        jest.spyOn(repository, 'GetById').mockImplementation(async () => {
            return { id: "123", name: "Den" } as Owner;
        });

        return request(app.getHttpServer())
            .get("/owners/123")
            .expect(200)
            .expect({
                id: "123",
                name: "Den"
            });
    });

    it("/owners/:id (DELETE)", () => {
        jest.spyOn(repository, 'DeleteById').mockImplementation(async (id) => {
            return { id, name: "Den" } as Owner;
        });

        return request(app.getHttpServer())
            .delete("/owners/f5e0cc29-3655-40f5-8d50-fb92d13e5175")
            .expect(200)
            .expect({
                id: "f5e0cc29-3655-40f5-8d50-fb92d13e5175",
                name: "Den"
            });
    });
});
