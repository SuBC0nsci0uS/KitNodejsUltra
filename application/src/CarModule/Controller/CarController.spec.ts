import { Test, TestingModule } from "@nestjs/testing";


import { CarController } from "./CarController";
import {ScheduleModule} from "nest-schedule";


import {InMemoryCarRepository} from "infrastructure/distribution/InMemoryCarRepository";
import {InMemoryManufacturerRepository} from "infrastructure/distribution/InMemoryManufacturerRepository";
import {InMemoryOwnerRepository} from "infrastructure/distribution/InMemoryOwnerRepository";
import {ICarRepository} from "domain/build/repository/ICarRepository";
import {CarManager} from "domain/build/manager/CarManager";
import {Manufacturer} from "domain/build/entity/Manufacturer";
import {Car} from "domain/build/entity/Car";
import {CarCreateRequestDTO} from "../DTO/CarCreateRequestDTO";
import {IManufactureRepository} from "domain/build/repository/IManufactureRepository";
import {CarResponseDTO} from "../DTO/CarResponseDTO";
import {IOwnerRepository} from "domain/build/repository/IOwnerRepository";



describe("Car Controller", () => {
  let controller: CarController;
  let carRepository: ICarRepository;
  let manufactureRepository: IManufactureRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    controller = module.get<CarController>(CarController);
    carRepository = module.get<ICarRepository>("ICarRepository");
    manufactureRepository = module.get<IManufactureRepository>("IManufactureRepository");
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create new car", async () => {
    jest.spyOn(manufactureRepository, 'GetById').mockImplementation(async (id) => {
      return { id, name: "Some name", phone: "+380977777777", siret: 12345678901 } as Manufacturer;
    });

    const dto = new CarCreateRequestDTO();
    dto.price = 358.55;
    dto.firstRegistrationDate = new Date();
    dto.manufacturer = "444";

    const result = await controller.Create(dto);

    expect(result.id).toBeDefined();
    expect(result.price).toBe(358.55);
    expect(result.firstRegistrationDate).toBe(dto.firstRegistrationDate);
    expect(result.manufacture).toBe(dto.manufacturer);
  });

  it("should return car with id 72", async () => {
    jest.spyOn(carRepository, 'GetById').mockImplementation(async (id) => {
      return {
        id,
        price: 412.55,
        owners: [],
        manufacturer: { id: "123-456-789", name: "Some name", phone: "+380977777777", siret: 12345678900 },
        firstRegistrationDate: new Date(),
      } as Car;
    });

    const id = '72';

    const result: CarResponseDTO = await controller.ReadOneById(id);

    expect(result.id).toBeDefined();
    expect(result.price).toBe( 412.55);
    expect(result.discount).toBe( 0);
    expect(result.firstRegistrationDate).toBeDefined();
    expect(result.manufacture).toBe("123-456-789");
  });
});
