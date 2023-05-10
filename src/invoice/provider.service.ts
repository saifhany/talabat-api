import { _provider  } from '../shared/types/provider';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProviderDto, ProductDto } from './dto/request-dto.ts/create-provider.dto';
import { Model } from 'mongoose';
@Injectable()
export class providerService {
    constructor(@InjectModel('Provider') private readonly providerModel: Model<_provider>) {}

  async create(provider: CreateProviderDto,userId:string): Promise<_provider> {
    console.log(provider);
    const newProvider = await this.providerModel.create({...provider, owner:userId});
    return newProvider;
  }

  async getmyshop( userId:string): Promise<_provider[]> {
    const provider = await this.providerModel.find({ owner:userId}).populate('owner',' -phone -password -otp').populate('categories','name')
    if (!provider) {
      throw new NotFoundException(`provider with ID ${userId} not found`);
    }
    return provider;
  }

  async addProducts(products: any,providerId:string,userId:string): Promise<any> {
    for   (const product of products.products) {
      const provider = await this.providerModel.findOne({ owner:userId,_id:providerId});
      if (!provider) {
        throw new NotFoundException(`provider with ID ${providerId} not found`);
      }
      provider.products.push(product);
      await provider.save();
    }
    return products;
  }

  async deleteProduct(productId: string,providerId:string,userId:string): Promise<any> { 
    const provider = await this.providerModel.findOne({ owner:userId,_id:providerId});
    if (!provider) {
      throw new NotFoundException(`provider with ID ${providerId} not found`);
    }
    provider.products = provider.products.filter((product) => product._id != productId);
    await provider.save();
    return provider;
  }
  
  async updateProduct(productId: string,providerId:string,userId:string,product:ProductDto): Promise<any> {

    const provider = await this.providerModel.findOne({ owner:userId,_id:providerId});
    if (!provider) {
      throw new NotFoundException(`provider with ID ${providerId} not found`);
    }
    const updated = provider.products.find((product) => product._id == productId);
    if (!updated) {
      throw new NotFoundException(`product with ID ${productId} not found`);
    }
    updated.name = product.name;
    updated.description = product.description;
    updated.price = product.price;
    updated.quantity = product.quantity;
    updated.size = product.size;
    updated.subCategory = product.subCategory;
    await provider.save();
    return updated;

  }





}
