import { Inject, Injectable, Res } from '@nestjs/common';
import { User } from '@prisma/client';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../../prisma/prisma.service';
import { PRISMA_INJECTION_TOKEN } from '../../prisma/prisma.module';
import { UpdateUserDto } from './dto/update-user.dto';
import { NOT_FOUND } from '../common/exception/error.code';

@Injectable()
export class UserService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    @Inject(PRISMA_INJECTION_TOKEN) private readonly prisma: PrismaService,
  ) {}

  async findById(id: number): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, reqDto: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id } });
    await this.prisma.user.updateMany({
      where: { id: user.id },
      data: reqDto,
    });
    return user;
  }

  async remove(id: number): Promise<User> {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id } });
    return await this.prisma.user.delete({ where: { id: user.id } });
  }
}
