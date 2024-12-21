export class BaseModel {
  id: number | null;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date | null;
  updatedBy: number | null;
  deletedAt: Date | null;
  deletedBy: number | null;
}
