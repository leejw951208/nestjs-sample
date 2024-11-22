import { Injectable, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(createUserDto.password, salt);
    const newUserEntity = UserEntity.create(Object.assign(createUserDto, { password: hashedPassword }));
    return await this.prisma.user.create({ data: newUserEntity });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
