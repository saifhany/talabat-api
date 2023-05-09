import { Module, forwardRef } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { categorySchema } from './category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: categorySchema }]),
    forwardRef(()=> AuthModule)

],
  exports: [
      CategoryService
  ]
})
export class CategoryModule {}
