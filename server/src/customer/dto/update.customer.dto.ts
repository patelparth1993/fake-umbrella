import { IsNotEmpty, IsDefined, Length, IsOptional } from 'class-validator'
export class UpdateCustomerDto{

    @IsOptional()
    @IsNotEmpty()
    name:String;

    @IsOptional()
    @IsNotEmpty()
    personOfContact:String;
    
    @IsOptional()
    @IsNotEmpty()
    location:String;
    
    @IsOptional()
    @Length(10,10)
    @IsNotEmpty()
    telephoneNumber:String;
    
    @IsOptional()
    @IsNotEmpty()
    numberOfEmployees:Number;
}