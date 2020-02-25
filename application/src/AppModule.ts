import { Module } from "@nestjs/common";

import { CarModule } from './CarModule/CarModule';
import { ManufactureModule } from './ManufactureModule/ManufactureModule';
import { OwnerModule } from './OwnerModule/OwnerModule';

@Module({
  imports: [
    CarModule,
    ManufactureModule,
    OwnerModule,
  ],
})
export class AppModule {}
