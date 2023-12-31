import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from 'src/shared/config/multer-config';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  create(
    @ActiveUserId() userId: string,
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
      }),
    )
    file: Express.MulterS3.File,
  ) {
    return this.categoriesService.create(userId, file, createCategoryDto);
  }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.categoriesService.findAllByUserId(userId);
  }

  @Patch(':categoryId')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  update(
    @ActiveUserId() userId: string,
    @Param('categoryId') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.MulterS3.File,
  ) {
    return this.categoriesService.update(
      userId,
      categoryId,
      updateCategoryDto,
      file,
    );
  }

  @Delete(':id')
  remove(@ActiveUserId() userId: string, @Param('id') categoryId: string) {
    return this.categoriesService.remove(userId, categoryId);
  }
}
