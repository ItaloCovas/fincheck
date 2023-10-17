import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async getUserById(userId: string) {
    return this.usersRepo.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        id: true,
      },
    });
  }
}
