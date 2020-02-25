import {Body, Controller, Get, Inject, Param, Post, Put} from '@nestjs/common';
import {ManufactureCreateRequestDTO} from "../DTO/ManufactureCreateRequestDTO";
import {ManufactureUpdateRequestDTO} from "../DTO/ManufactureUpdateRequestDTO";
import {IManufactureRepository} from "domain/build/repository/IManufactureRepository";
import {Manufacturer} from "domain/build/entity/Manufacturer";
import {ManufactureResponseDTO} from "../DTO/ManufactureResponseDTO";
import {ManufacturerMapper} from "../Mapper/ManufacturerMapper";

@Controller('manufacturer')
export class ManufacturerController
{
    constructor(
        @Inject("IManufactureRepository") private readonly manufactureRepository: IManufactureRepository,
    ) {}

    @Get()
    async GetAll(): Promise<ManufactureResponseDTO[]> {
        const manufacturer = await this.manufactureRepository.GetAll();
        return manufacturer.map(ManufacturerMapper.ToResponse);
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<ManufactureResponseDTO>
    {
        const manufacture = await this.manufactureRepository.GetById(id);
        return ManufacturerMapper.ToResponse(manufacture);
    }

    @Post()
    async create(@Body() dto: ManufactureCreateRequestDTO): Promise<ManufactureResponseDTO>
    {
        const manufacturer = new Manufacturer();
        manufacturer.siret = dto.siret;
        manufacturer.phone = dto.phone;
        manufacturer.name = dto.name;

        const manufacture = await this.manufactureRepository.Create(manufacturer);

        return ManufacturerMapper.ToResponse(manufacture);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: ManufactureUpdateRequestDTO): Promise<ManufactureResponseDTO>
    {
        const manufacturer = await this.manufactureRepository.GetById(id);

        manufacturer.name = dto.name;
        manufacturer.phone = dto.phone;
        manufacturer.siret = dto.siret;

        const updated = await this.manufactureRepository.Update(manufacturer);

        return ManufacturerMapper.ToResponse(updated);
    }
}
