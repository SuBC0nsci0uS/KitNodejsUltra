import { Test, TestingModule } from '@nestjs/testing';
import { ManufacturerController } from './ManufacturerController';
import {InMemoryManufacturerRepository} from "infrastructure/distribution/InMemoryManufacturerRepository";
import {IManufactureRepository} from "domain/build/repository/IManufactureRepository";
import {ManufactureCreateRequestDTO} from "../DTO/ManufactureCreateRequestDTO";
import {Manufacturer} from "domain/build/entity/Manufacturer";
import {ManufactureUpdateRequestDTO} from "../DTO/ManufactureUpdateRequestDTO";

describe('Manufacturer Controller', () => {
  let controller: ManufacturerController;
  let manufactureRepository: IManufactureRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManufacturerController],
      providers: [
        {
          provide: "IManufactureRepository",
          useClass: InMemoryManufacturerRepository
        }
      ]
    }).compile();

    controller = module.get<ManufacturerController>(ManufacturerController);
    manufactureRepository = module.get<IManufactureRepository>("IManufactureRepository");
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should create new manufacturer', async () => {
    const dto = new ManufactureCreateRequestDTO();
    dto.name = "Some name";
    dto.phone = "+380977777777";
    dto.siret = 12345678901;

    const result = await controller.create(dto);

    expect(result.id).toBeDefined();
    expect(result.name).toBe("Some name");
    expect(result.phone).toBe("+380977777777");
    expect(result.siret).toBe(12345678901);
  });

  it('should return manufacture with id 123', async () => {
    jest.spyOn(manufactureRepository, 'GetById').mockImplementation(async (id) => {
      return { id, name: "Some name", phone: "+380977777777", siret: 12345678901 } as Manufacturer;
    });

    const id = "123";

    const result = await controller.getById(id);

    expect(result.id).toBeDefined();
    expect(result.name).toBe("Some name");
    expect(result.phone).toBe("+380977777777");
    expect(result.siret).toBe(12345678901);
  });

  it('should update manufacturer with id: 555', async () => {
    jest.spyOn(manufactureRepository, 'GetById').mockImplementation(async (id) => {
      return { id, name: "Some name", phone: "+380977777777", siret: 12345678901 } as Manufacturer;
    });

    jest.spyOn(manufactureRepository, 'Update').mockImplementation(async (manufacture) => {
      return manufacture as Manufacturer;
    });

    const id = "123";
    const dto = new ManufactureUpdateRequestDTO();
    dto.siret = 12345678903;
    dto.phone = "+380977777777";
    dto.name = "New Name for manufacture";

    const result = await controller.update(id, dto);

    expect(result.id).toBeDefined();
    expect(result.name).toBe("New Name for manufacture");
    expect(result.phone).toBe("+380977777777");
    expect(result.siret).toBe(12345678903);
  });

});
