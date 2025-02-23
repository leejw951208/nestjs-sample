import { PrismaModel } from '../../common/prisma/prisma.model';
import { SignupReqDto } from '../../auth/dto/signup-req.dto';
import { User } from '@prisma/client';

export class UserModel extends PrismaModel implements User {
  email: string;
  password: string;
  name: string;
  isActive: boolean;

  private constructor(email: string, password: string, name: string) {
    super();
    Object.assign(this, { email, password, name });
  }

  static create(dto: SignupReqDto): UserModel {
    return new UserModel(dto.email, dto.password, dto.name);
  }
}
