import { Test, TestingModule } from '@nestjs/testing';
import { OwnerController } from './OwnerController';
import {OwnerCreateRequestDTO} from "../DTO/OwnerCreateRequestDTO";
import {InMemoryOwnerRepository} from "infrastructure/distribution/InMemoryOwnerRepository";
import {IOwnerRepository} from "domain/build/repository/IOwnerRepository";
import {Owner} from "domain/build/entity/Owner";
import {OwnerUpdateRequestDTO} from "../DTO/OwnerUpdateRequestDTO";

describe('Owner Controller', () => {
  let controller: OwnerController;
  let ownerRepository: IOwnerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnerController],
      providers:[
        {
          provide: "IOwnerRepository",
          useValue: new InMemoryOwnerRepository()
        }
      ]
    }).compile();

    ownerRepository = module.get<IOwnerRepository>("IOwnerRepository");
    controller = module.get<OwnerController>(OwnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create new owner', async () => {

    const dto = new OwnerCreateRequestDTO();
    dto.name = 'Alex';

    const response = await controller.create(dto);

    expect(response.id).toBeDefined();
    expect(response.name).toBe('Alex');
  });

  it('should return 2 owners', async () => {
    jest.spyOn(ownerRepository, 'GetAll').mockImplementation(async () => {
      return [ { id: "someid", name: "Alex" }, { id: "123", name: "Den" } ] as Owner[];
    });

    const response = await controller.all();

    expect(response).toBeDefined();
    expect(response.length).toBe(2);
  });

  it('should remove Alex from owners', async () => {
    jest.spyOn(ownerRepository, 'DeleteById').mockImplementation(async (id) => {
      return { id: "someid", name: "Alex" } as Owner;
    });

    const response = await controller.delete("someid");

    expect(response).toBeDefined();
    expect(ownerRepository.DeleteById).toBeCalledWith("someid");
    expect(response.id).toBe("someid");
    expect(response.name).toBe("Alex");
  });

  it('should rename Alex to Alice', async () => {
    jest.spyOn(ownerRepository, 'GetById').mockImplementation(async (id) => {
      return { id: "some id", name: "Alex" } as Owner;
    });
    jest.spyOn(ownerRepository, 'Update').mockImplementation(async (owner) => {
      return owner as Owner;
    });

    const id = "some id";
    const body = new OwnerUpdateRequestDTO();
    body.name = "Alice";

    const response = await controller.update(id, body);

    expect(response).toBeDefined();
    expect(ownerRepository.GetById).toBeCalledWith(id);
    expect(ownerRepository.Update).toBeCalled();
    expect(response.id).toBe(id);
    expect(response.name).toBe("Alice");
  });
});
