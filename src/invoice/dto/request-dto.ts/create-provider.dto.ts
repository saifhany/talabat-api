import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum Size {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
}

export class ProductDto {

  @IsNotEmpty()
  @IsString()
  _id :string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  size: Size;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  subCategory: string;

  @IsOptional()
  @Type(() => Date)
  createdAt?: Date;

  @IsOptional()
  @Type(() => Date)
  updatedAt?: Date;
}

export class CreateProviderDto {
  @IsNotEmpty()
  owner: string;

  @IsNotEmpty()
  categories: string;

  @IsNotEmpty()
  subCategories: string[];

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @Type(() => ProductDto)
  products: ProductDto[];

  @IsNotEmpty()
  @IsString()
  address: string;
}
