import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './categories.controller';
import { ValidateCategoryOwnershipService } from './services/validate-category-ownership.service';

@Module({
  exports: [ValidateCategoryOwnershipService],
  controllers: [CategoriesController],
  providers: [CategoriesService, ValidateCategoryOwnershipService],
})
export class CategoriesModule {}
