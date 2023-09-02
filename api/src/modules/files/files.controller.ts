import {
  Controller,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { FilesService } from './files.service';
import multerConfig from 'src/shared/config/multer-config';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
      }),
    )
    file: Express.MulterS3.File,
  ) {
    return this.filesService.create(file);
  }

  @Delete(':fileKey')
  remove(@Param('fileKey') fileKey: string) {
    return this.filesService.remove(fileKey);
  }
}
