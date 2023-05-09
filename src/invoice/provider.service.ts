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
    const provider = await this.providerModel.find({ owner:userId});
    if (!provider) {
      throw new NotFoundException(`provider with ID ${userId} not found`);
    }
    return provider;
  }

  async addProducts(products: any,providerId:string,userId:string): Promise<any> {
    for   (const product of products.products) {
      console.log(product , 'gg');
      const provider = await this.providerModel.findOne({ owner:userId,_id:providerId});
      if (!provider) {
        throw new NotFoundException(`provider with ID ${providerId} not found`);
      }
      provider.products.push(product);
      await provider.save();
    }
    return products;
  }




}
