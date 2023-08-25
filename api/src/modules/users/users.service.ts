import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUserById(userId: string) {
    return { userId };
  }
}
