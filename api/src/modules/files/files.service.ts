import { Injectable, NotFoundException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
@Injectable()
export class FilesService {
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  create(file: Express.MulterS3.File) {
    return file;
  }

  async remove(fileKey: string) {
    await this.s3
      .deleteObject({
        Bucket: process.env.BUCKET_NAME,
        Key: fileKey,
      })
      .promise();

    return null;
  }
}
