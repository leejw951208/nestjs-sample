import { Exclude } from 'class-transformer'

export class PrismaModel {
    id: number | null
    createdAt: Date
    createdBy: number
    updatedAt: Date | null
    updatedBy: number | null

    @Exclude()
    isDeleted: boolean

    @Exclude()
    deletedAt: Date | null

    @Exclude()
    deletedBy: number | null
}
