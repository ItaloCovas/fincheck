import { ConflictException, Injectable } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositories';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { FilesService } from 'src/modules/files/files.service';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepo: CategoriesRepository,
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
