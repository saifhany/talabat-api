import { IsEmpty, IsEnum, IsString } from "class-validator";
export class AddRoleDto {
    @IsEnum(['admin', 'customer', 'provider'])
    @IsEmpty({ message: 'Must not be empty' })
    readonly role: string ;
    @IsString({ message: 'Must be a string' })
    @IsEmpty({ message: 'Must not be empty' })
    readonly userId: String ;
}