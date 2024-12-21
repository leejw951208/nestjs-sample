import { BaseModel } from '../../common/base/base.model';
import { SignupReqDto } from '../../auth/dto/signup-req.dto';
import { User } from '@prisma/client';

export class UserModel extends BaseModel implements User {
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
