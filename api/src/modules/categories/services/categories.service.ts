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

    const iconImg = await this.filesService.create(file);

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

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
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
