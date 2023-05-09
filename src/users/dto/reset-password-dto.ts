import { IsString ,IsEmail ,IsNotEmpty, Length, IsEnum, IsNumber } from 'class-validator';

export class resetPasswordDto {
    @IsNumber()
    @IsNotEmpty({ message: 'Must not be empty' })
    @IsEmail()
    readonly otp: number;

    @IsNotEmpty({ message: 'Must not be empty' })
    @IsString({ message: 'Must be a string' })
    readonly email: string;

    @IsNotEmpty({ message: 'Must not be empty' })
    @IsString({ message: 'Must be a string' })
    readonly newPassword: string;
}