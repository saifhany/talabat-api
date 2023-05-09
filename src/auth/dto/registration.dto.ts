import { IsString ,IsEmail ,IsNotEmpty, Length, IsEnum } from 'class-validator';
export class RegistrationDto {
    @IsString({ message: 'Must be a string' })
    @IsNotEmpty({ message: 'Must not be empty' })
    @IsEmail()
    readonly email: string;
   @IsNotEmpty({ message: 'Must not be empty' })
   @Length(8, 10)
    readonly password: string;

    @IsNotEmpty({ message: 'Must not be empty' })
    readonly name: string;

    @IsNotEmpty({ message: 'Must not be empty' })
    @IsString({ message: 'Must be a string' })
    @IsEnum(['admin', 'customer', 'provider'])
    readonly role : string;

    @IsNotEmpty({ message: 'Must not be empty' })
    @IsString({ message: 'Must be a string' })
    readonly phone: string;
}