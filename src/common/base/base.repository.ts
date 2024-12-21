import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { BaseModel } from './base.model';
import * as _ from 'lodash';
import { Prisma } from '@prisma/client';

@Injectable()
export class BaseRepository<T extends BaseModel> {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly modelName: string,
  ) {
    this.modelName = _.camelCase(this.modelName);
  }

  async findAll(): Promise<T[]> {
    return await this.prisma[this.modelName].findMany({
      where: { deletedAt: null },
    });
  }

  async findById(id: number): Promise<T> {
    return await this.prisma[this.modelName].findUnique({
      where: { id, deletedAt: null },
    });
  }

  async findByUnique(condition: Partial<T>): Promise<T> {
    return await this.prisma[this.modelName].findUnique({
      where: { ...condition, deletedAt: null },
    });
  }

  async findByWhere(condition: Partial<T>): Promise<T[]> {
    return await this.prisma[this.modelName].findMany({
      where: { ...condition, deletedAt: null },
    });
  }

  async save(model: T): Promise<T> {
    return await this.prisma[this.modelName].create({ data: model });
  }

  async update(model: T): Promise<T> {
    return await this.prisma[this.modelName].update({
      where: { id: model.id },
      data: { ...model, updatedAt: new Date() },
    });
  }
}
