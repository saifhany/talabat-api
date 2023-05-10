import {Body,Request, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {providerService} from "./provider.service";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {CreateProviderDto, ProductDto} from "./dto/request-dto.ts/create-provider.dto";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProviderGuard } from 'src/auth/provider.guard';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: providerService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create/:userId')
  create(@Body() provider: CreateProviderDto,@Param('userId') userId: string) {
    return this.providerService.create(provider,userId);
  }

  @Roles("provider")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('add-products/:providerId')
  addProducts(@Body() products: ProductDto[],@Param('providerId') providerId: string ,@Request() req  ) {
    return this.providerService.addProducts(products,providerId,req.user.id);
  }


  @Roles("provider")
  @UseGuards(ProviderGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('remove-product/:providerId/:productId')
  removeProduct(@Param('productId') productId: string,@Param('providerId') providerId: string, @Request() req) : Promise<any>{
    console.log( productId ,  providerId, req.user.id);
    return this.providerService.deleteProduct(productId,providerId,req.user.id);
  }

  @Roles("provider")
  @UseGuards(ProviderGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update-product/:providerId/:productId')
  updateProduct(@Body() product: ProductDto,@Param('productId') productId: string,@Param('providerId') providerId: string, @Request() req) : Promise<any>{
    console.log( productId ,  providerId, req.user.id); 
    return this.providerService.updateProduct(productId,providerId,req.user.id,product);
  }

  @Roles("provider")
  @UseGuards(ProviderGuard)
  @UseGuards(JwtAuthGuard)
  @Get('myshop')
  findOne(@Request() req) {
    return this.providerService.getmyshop(req.user.id);
  }

}