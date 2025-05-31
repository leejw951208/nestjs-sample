import { Prisma } from '@prisma/client';
import { ClsService } from 'nestjs-cls';

const findOpertions = [
    'findUnique',
    'findFirst',
    'findMany',
    'findUniqueOrThrow',
    'findFirstOrThrow',
    'aggregate'
] as const;
type FindOperation = (typeof findOpertions)[number];

export const filterSoftDeleted = Prisma.defineExtension({
    name: 'filterSoftDeleted',
    query: {
        $allModels: {
            async $allOperations({ model, operation, args, query }) {
                if (findOpertions.includes(operation as FindOperation)) {
                    if ('where' in args) {
                        if (!args.where) {
                            args.where = { isDeleted: false };
                        }
                    }
                }
                return query(args);
            }
        }
    }
});

export const create = (clsService: ClsService) =>
    Prisma.defineExtension({
        name: 'create',
        query: {
            $allModels: {
                async create({ args, query }) {
                    args.data = { ...args.data, createdBy: clsService.get('userId') ?? 0 };
                    return query(args);
                },
                async createMany({ args, query }) {
                    args.data = Array.isArray(args.data)
                        ? args.data.map((data) => ({ ...data, createdBy: clsService.get('userId') ?? 0 }))
                        : { ...args.data, createdBy: clsService.get('userId') ?? 0 };
                    return query(args);
                }
            }
        }
    });

export const update = (clsService: ClsService) =>
    Prisma.defineExtension({
        name: 'update',
        query: {
            $allModels: {
                async update({ args, query }) {
                    args.data = { ...args.data, updatedBy: clsService.get('userId') ?? 0, updatedAt: new Date() };
                    return query(args);
                },
                async updateMany({ args, query }) {
                    args.data = Array.isArray(args.data)
                        ? args.data.map((data) => ({
                              ...data,
                              updatedBy: clsService.get('userId') ?? 0,
                              updatedAt: new Date()
                          }))
                        : { ...args.data, updatedBy: clsService.get('userId') ?? 0, updatedAt: new Date() };
                    return query(args);
                }
            }
        }
    });

// delete 쿼리를 update 쿼리로 변경
export const softDelete = (clsService: ClsService) =>
    Prisma.defineExtension({
        name: 'softDelete',
        model: {
            $allModels: {
                async delete<T>(this: T, where: Prisma.Args<T, 'delete'>['where']) {
                    const context = Prisma.getExtensionContext(this);
                    return await (context as any).update({
                        ...where,
                        data: { isDeleted: true, deletedBy: clsService.get('userId') ?? 0, deletedAt: new Date() }
                    });
                },
                async deleteMany<T>(this: T, where: Prisma.Args<T, 'deleteMany'>['where']) {
                    const context = Prisma.getExtensionContext(this);
                    return await (context as any).updateMany({
                        ...where,
                        data: { isDeleted: true, deletedBy: clsService.get('userId') ?? 0, deletedAt: new Date() }
                    });
                }
            }
        }
    });
