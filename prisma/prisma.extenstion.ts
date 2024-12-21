import { Prisma } from '@prisma/client';

const findOpertions = ['findUnique', 'findFirst', 'findMany', 'findUniqueOrThrow', 'findFirstOrThrow', 'aggregate'];

export const filterSoftDeleted = Prisma.defineExtension({
  name: 'filterSoftDeleted',
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        if (findOpertions.includes(operation)) {
          // where 조건이 없거나, deletedAt이 where 조건에 없는 경우 deletedAt = null인 데이터만 조회
          // where 조건이 있는 경우, where 조건에 있는 deletedAt을 유지하면서 조회
          if ('where' in args) {
            if (!args.where) {
              args.where = { deletedAt: null };
            } else if (!('deletedAt' in args.where)) {
              args.where = { ...args.where, deletedAt: null };
            }
          }
          return query(args);
        }
        return query(args);
      },
    },
  },
});
