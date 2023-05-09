import { IsString ,IsEmail ,IsNotEmpty, Length, IsEnum } from 'class-validator';

export class forgetPasswordDto {
    @IsString({ message: 'Must be a string' })
    @IsNotEmpty({ message: 'Must not be empty' })
    @IsEmail()
    readonly email: string;

    @IsNotEmpty({ message: 'Must not be empty' })
    @IsString({ message: 'Must be a string' })
    readonly phone: string;
}