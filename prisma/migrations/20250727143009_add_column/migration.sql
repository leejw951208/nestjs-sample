-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'DEACTIVATED', 'DELETED');

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'DRAFT';
