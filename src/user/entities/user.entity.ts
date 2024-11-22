import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';

export class UserEntity implements User {
  id: number | null;
  email: string;
  password: string;
  name: string;
  createdAt: Date | null;

  private constructor(email: string, password: string, name: string) {
    Object.assign(this, { email, password, name });
  }

  static create(createUserDto: CreateUserDto): UserEntity {
    const { email, password, name } = createUserDto;
    return new UserEntity(email, password, name);
  }
}
