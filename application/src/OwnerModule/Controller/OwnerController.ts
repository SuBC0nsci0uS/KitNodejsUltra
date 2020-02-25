import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import {IOwnerRepository} from "domain/build/repository/IOwnerRepository";
import {OwnerMapper} from "../Mapper/OwnerMapper";
import {Owner} from "domain/build/entity/Owner";
import {OwnerUpdateRequestDTO} from "../DTO/OwnerUpdateRequestDTO";
import {OwnerCreateRequestDTO} from "../DTO/OwnerCreateRequestDTO";


@Controller('owners')
export class OwnerController {

    constructor(
        @Inject("IOwnerRepository") private readonly ownerRepository: IOwnerRepository,
    ) {}

    @Get()
    async all() {
        const owners = await this.ownerRepository.GetAll();
        return owners.map(OwnerMapper.ToResponse);
    }

    @Get(':id')
    async byId(@Param('id') id: string) {
        const owner = await this.ownerRepository.GetById(id);
        return OwnerMapper.ToResponse(owner);
    }

    @Post()
    async create(@Body() body: OwnerCreateRequestDTO) {
        const owner = new Owner();
        owner.name = body.name;

        const createdOwner = await this.ownerRepository.Create(owner);

        return OwnerMapper.ToResponse(createdOwner);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const owner = await this.ownerRepository.DeleteById(id);
        return OwnerMapper.ToResponse(owner);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: OwnerUpdateRequestDTO) {

        const owner = await this.ownerRepository.GetById(id);
        owner.name = body.name;

        const updatedOwner = await this.ownerRepository.Update(owner);
        return OwnerMapper.ToResponse(updatedOwner);
    }
}
