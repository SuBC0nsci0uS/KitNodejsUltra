import { IsAlpha, IsNumber, IsPhoneNumber } from "class-validator";

export class ManufactureCreateRequestDTO
{
  @IsAlpha()
  public name: string;

  @IsPhoneNumber(null)
  public phone: string;

  @IsNumber()
  public siret: number;
}
