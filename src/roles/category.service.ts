import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/request-dto.ts/create-category.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/shared/types/category';

@Injectable()
export class CategoryService {
    constructor(@InjectModel("Category") private categoryModel: Model<Category>) {
    }

    async createCategory(dto: CreateCategoryDto) : Promise<Category> {
        console.log(dto.name)
        const category = await this.categoryModel.findOne({name: dto.name});
        if (category) { 
            throw new HttpException('Category already exist', HttpStatus.BAD_REQUEST);
        }else{
            const newCategory = await this.categoryModel.create({ name: dto.name , description: dto.description});
            return newCategory;
        }


    }

    async getCategoryByName( name: string) {
        const category = await this.categoryModel.findOne({name: name});
        if (!category) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
        return category;
    }
}
