import {IsAlpha, IsNumber, IsPhoneNumber} from "class-validator";

export class ManufactureUpdateRequestDTO
{
    @IsNumber()
    public siret: number;

    @IsPhoneNumber(null)
    public phone: string;

    @IsAlpha()
    public name: string;
}
