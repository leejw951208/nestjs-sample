export class PrismaModel {
    id: number | null;
    createdAt: Date;
    createdBy: number;
    updatedAt: Date | null;
    updatedBy: number | null;
    isDeleted: boolean;
    deletedAt: Date | null;
    deletedBy: number | null;
}
