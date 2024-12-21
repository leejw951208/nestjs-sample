import { Inject, Injectable, Res } from '@nestjs/common';
import { User } from '@prisma/client';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseException } from '../common/exception/base.exception';
import { NOT_FOUND } from '../common/exception/error.code';
import { PRISMA_INJECTION_TOKEN } from '../../prisma/prisma.module';

@Injectable()
export class UserService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    @Inject(PRISMA_INJECTION_TOKEN) private readonly prisma: PrismaService,
  ) {}

  async findById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new BaseException(NOT_FOUND.GENERAL, this.constructor.name);
    }
    return user;
  }
}
