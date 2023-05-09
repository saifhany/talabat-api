import { IsString , IsNotEmpty } from 'class-validator';
export class CreateCategoryDto {
    @IsString({message: 'Must be a string'})
    @IsNotEmpty({message: 'Must not be empty'})
    readonly name: string;
    @IsString({message: 'Must be a string'})
    @IsNotEmpty({message: 'Must not be empty'})
    readonly description: string;
}