import {IsDate, IsNumber} from "class-validator";
import {Transform, Type} from "class-transformer";
import moment from 'moment';

export class CarCreateRequestDTO
{
  @IsNumber()
  public price: number;

  @IsDate()
  @Type(() => Date)
  @Transform(value => moment(value).toDate())
  public firstRegistrationDate: Date;

  public manufacturer: string;
}
