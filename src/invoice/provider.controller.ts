import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {providerService} from "./provider.service";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {CreateProviderDto, ProductDto} from "./dto/request-dto.ts/create-provider.dto";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: providerService) {}

  @Roles("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('create/:userId')
  create(@Body() provider: CreateProviderDto,@Param('userId') userId: string) {
    return this.providerService.create(provider,userId);
  }

  @Roles("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('add-products/:userId/:providerId')
  addProducts(@Body() products: ProductDto[],@Param('providerId') providerId: string ,@Param('userId') userId: string) {
    return this.providerService.addProducts(products,providerId,userId);
  }

  @Roles("admin")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    console.log(userId);
    return this.providerService.getmyshop(userId);
  }

}