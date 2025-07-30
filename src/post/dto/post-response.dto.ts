import { ApiProperty } from '@nestjs/swagger'
import { PostStatus } from '@prisma/client'
import { Expose, Transform } from 'class-transformer'

export class PostResponseDto {
    @ApiProperty({ type: Number, description: 'Post ID (PK)', example: 1 })
    @Expose()
    id: number

    @ApiProperty({ type: Number, description: 'User ID (PK)', example: 1 })
    @Expose()
    userId: number

    @ApiProperty({ type: String, description: '제목', example: '서비스 이용 안내' })
    @Expose()
    title: string

    @ApiProperty({ type: String, description: '내용', example: '본 서비스는...' })
    @Expose()
    content: string

    @ApiProperty({ type: String, description: '상태', example: 'DRAFT' })
    @Transform(({ value }) =>
        value === PostStatus.DRAFT ? 'DRAFT' : value === PostStatus.PUBLISHED ? 'PUBLISHED' : 'DEACTIVATED'
    )
    @Expose()
    status: PostStatus

    @ApiProperty({ type: String, description: '생성일자', example: '2025-05-25 13:00:00' })
    @Expose()
    createdAt: Date

    @ApiProperty({ type: String, description: '수정일자', example: '2025-05-25 13:00:00' })
    @Expose()
    updatedAt: Date
}
