import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { FilesService } from 'src/modules/files/files.service';
import { ValidateCategoryOwnershipService } from './validate-category-ownership.service';

import { isUUID } from 'class-validator';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepo: CategoriesRepository,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly filesService: FilesService,
  ) {}

  async create(
    userId: string,
    file: Express.MulterS3.File,
    createCategoryDto: CreateCategoryDto,
  ) {
    const { name, type } = createCategoryDto;

    const categoryAlreadyExists = await this.categoriesRepo.findFirst({
      where: { name, userId: userId },
    });

    if (categoryAlreadyExists) {
      throw new ConflictException('This category already exists.');
    }

    const iconImg = this.filesService.create(file);

    return this.categoriesRepo.create({
      data: {
        userId,
        name,
        icon: iconImg.fieldname,
        iconKey: iconImg.key,
        iconUrl: iconImg.location,
        type,
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.categoriesRepo.findMany({
      where: { userId },
    });
  }

  async getCategoryById(categoryId: string) {
    if (!isUUID(categoryId)) {
      throw new UnauthorizedException('Category must be valid.');
    }

    return this.categoriesRepo.findUnique({
      where: {
        id: categoryId,
      },
      select: {
        name: true,
        iconKey: true,
      },
    });
  }

  async update(
    userId: string,
    categoryId: string,
    updateCategoryDto: UpdateCategoryDto,
    file: Express.MulterS3.File,
  ) {
    const { name, type } = updateCategoryDto;
    let iconImg: Express.MulterS3.File;

    await this.validateCategoryOwnershipService.validate(userId, categoryId);

    if (file) {
      const category = await this.categoriesRepo.findUnique({
        where: {
          id: categoryId,
        },
        select: {
          iconKey: true,
        },
      });

      await this.filesService.remove(category.iconKey);

      iconImg = this.filesService.create(file);

      return this.categoriesRepo.update({
        where: { id: categoryId },
        data: {
          name,
          type,
          icon: iconImg.fieldname,
          iconKey: iconImg.key,
          iconUrl: iconImg.location,
        },
      });
    } else {
      return this.categoriesRepo.update({
        where: { id: categoryId },
        data: {
          name,
          type,
        },
      });
    }
  }

  async remove(userId: string, categoryId: string) {
    await this.validateCategoryOwnershipService.validate(userId, categoryId);

    const category = await this.getCategoryById(categoryId);

    await this.filesService.remove(category.iconKey);

    await this.categoriesRepo.delete({
      where: {
        id: categoryId,
      },
    });

    return null;
  }
}
