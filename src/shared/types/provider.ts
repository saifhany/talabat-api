import mongoose, { Document } from 'mongoose';
import { ProductDto } from 'src/invoice/dto/request-dto.ts/create-provider.dto';

export interface _provider extends Document {
  owner: mongoose.Schema.Types.ObjectId,
  categories: mongoose.Schema.Types.ObjectId,
  subCategories: string[],
  name: string,
  rating: number,
  products: ProductDto[],
  address: string,
  createdAt: Date,
  updatedAt: Date,
}
