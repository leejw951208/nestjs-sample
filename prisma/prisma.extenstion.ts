import { Prisma } from '@prisma/client';

const findOpertions = [
  'findUnique',
  'findFirst',
  'findMany',
  'findUniqueOrThrow',
  'findFirstOrThrow',
  'aggregate',
] as const;
type FindOperation = (typeof findOpertions)[number];

const deleteOperations = ['delete', 'deleteMany'] as const;
type DeleteOperation = (typeof deleteOperations)[number];

export const filterSoftDeleted = Prisma.defineExtension({
  name: 'filterSoftDeleted',
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        if (findOpertions.includes(operation as FindOperation)) {
          if ('where' in args) {
            if (!args.where) {
              args.where = { deletedAt: null };
            } else if (!('deletedAt' in args.where)) {
              args.where = { ...args.where, deletedAt: null };
            }
          }
        }
        return query(args);
      },
    },
  },
});

export const softDelete = Prisma.defineExtension({
  name: 'softDelete',
  model: {
    $allModels: {
      async delete<T>(this: T, where: Prisma.Args<T, 'delete'>['where']) {
        const context = Prisma.getExtensionContext(this);
        return await (context as any).update({
          ...where,
          data: { deletedBy: 0, deletedAt: new Date() },
        });
      },
      async deleteMany<T>(this: T, where: Prisma.Args<T, 'deleteMany'>['where']) {
        const context = Prisma.getExtensionContext(this);
        return await (context as any).updateMany({
          ...where,
          data: { deletedBy: 0, deletedAt: new Date() },
        });
      },
    },
  },
});
