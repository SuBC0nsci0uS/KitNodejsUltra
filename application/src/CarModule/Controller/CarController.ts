import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Put,
} from "@nestjs/common";

import { CarCreateRequestDTO } from "../DTO/CarCreateRequestDTO";

import { Car } from "domain/build/entity/Car";

import { Cron } from "nest-schedule";
import {CarMapper} from "../Mapper/CarMapper";
import {CarResponseDTO} from "../DTO/CarResponseDTO";
import {ManufacturerMapper} from "../../ManufactureModule/Mapper/ManufacturerMapper";
import {ManufactureResponseDTO} from "../../ManufactureModule/DTO/ManufactureResponseDTO";
import {ICarManager} from "domain/build/manager/ICarManager";
import {CarUpdateRequestDTO} from "../DTO/CarUpdateRequestDTO";

@Controller("cars")
export class CarController
{
  public constructor(
    @Inject("ICarManager") private readonly carManager: ICarManager,
  ) {}

  @Post()
  public async Create(@Body() dto: CarCreateRequestDTO): Promise<CarResponseDTO>
  {
      const car = await this.carManager.Create(dto);
      return CarMapper.ToCarResponse(car);
  }

  @Put(":id")
  public async UpdateById(@Param("id") id: string, @Body() dto: CarUpdateRequestDTO): Promise<CarResponseDTO>
  {
        const car = await this.carManager.Update(id, dto);
        return CarMapper.ToCarResponse(car);
  }

  @Delete(":id")
  public async DeleteById(@Param("id") id: string): Promise<string>
  {
      const deletedCar = await this.carManager.Delete(id);
      return deletedCar.id;
  }

  @Get()
  public async ReadAll(): Promise<CarResponseDTO[]>
  {
     const cars: Car[] = await this.carManager.GetAll();
     return cars.map(CarMapper.ToCarResponse);
  }

  @Get(":id")
  public async ReadOneById(@Param("id") id: string): Promise<CarResponseDTO>
  {
      const car = await this.carManager.GetById(id);
      return CarMapper.ToCarResponse(car);
  }

  @Get(":id/manufacture")
  public async ReadManufactureByCarId(@Param("id") id: string): Promise<ManufactureResponseDTO>
  {
      const car = await this.carManager.GetById(id);
      return ManufacturerMapper.ToResponse(car.manufacturer);
  }

  @Post('/car-discount')
  @Cron('0 0 1 * *')
  public async CalculateDiscount()
  {
        this.carManager.CalculateDiscount(new Date());
  }

    @Delete('/deprecated-car-owners')
    @Cron('0 0 1 * *')
    public async UpdateCars()
    {
         this.carManager.RemoveAllOwners(new Date());
    }
}
