import { ConflictException, Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  async create(userId: string, createCategoryDto: CreateCategoryDto) {
    const { name, icon, type } = createCategoryDto;

    const categoryAlreadyExists = await this.categoriesRepo.findFirst({
      where: { name, userId: userId },
    });

    if (categoryAlreadyExists) {
      throw new ConflictException('This category already exists.');
    }

    return this.categoriesRepo.create({
      data: {
        userId,
        name,
        icon,
        type,
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.categoriesRepo.findMany({
      where: { userId },
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} category`;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: string) {
    return `This action removes a #${id} category`;
  }
}
