import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './categories.controller';
import { ValidateCategoryOwnershipService } from './services/validate-category-ownership.service';
import { FilesService } from '../files/files.service';

@Module({
  exports: [ValidateCategoryOwnershipService],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    ValidateCategoryOwnershipService,
    FilesService,
  ],
})
export class CategoriesModule {}
