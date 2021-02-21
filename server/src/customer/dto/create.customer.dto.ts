import { IsNotEmpty, IsDefined, Length, IsNumber } from 'class-validator'
export class createCustomerDto{
    @IsNotEmpty()
    @IsDefined()
    name:String;

    @IsNotEmpty()
    @IsDefined()
    personOfContact:String;

    @IsDefined()
    @IsNotEmpty()
    location:String;

    @IsDefined()
    @IsNotEmpty()
    @Length(10,10)
    telephoneNumber:String;

    @IsDefined()
    @IsNotEmpty()
    numberOfEmployees:Number;
}