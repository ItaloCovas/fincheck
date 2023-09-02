import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  create(file: Express.MulterS3.File) {
    return file;
  }

  async remove(fileKey: string) {
    return `This action removes a #${fileKey} file`;
  }
}
