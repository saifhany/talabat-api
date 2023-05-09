import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {CategoryService} from "./category.service";
import {CreateCategoryDto} from "./dto/request-dto.ts/create-category.dto";
import { Serialize } from 'src/shared/interceptor/serialize.interceptor';
import { CategoryDto } from "./dto/category.dto";
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('category')
export class CategoryController {
    constructor(private categoryservice: CategoryService) {
    }

    @Roles("admin")
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(@Body() dto: CreateCategoryDto){
        console.log(dto)
        return this.categoryservice.createCategory(dto)
    }
    
    @Roles("admin")
    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Serialize(CategoryDto)
    @Get('/:name')
    getByValue(@Param('name') name: string) {
        return this.categoryservice.getCategoryByName(name);
    }
}
