import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'

export class UserResponseDto {
    @ApiProperty({ type: Number, description: '사용자 ID', example: 1 })
    @Expose()
    id: number

    @ApiProperty({ type: String, description: '이메일', example: 'user@user.com' })
    @Expose()
    email: string

    @ApiProperty({ type: String, description: '이름', example: '홍길동' })
    @Expose()
    name: string

    @ApiProperty({ type: String, description: '상태', example: 'ACTIVATED' })
    @Expose()
    status: string

    @ApiProperty({ type: String, description: '생성일자', example: '2025-05-25 13:00:00' })
    @Expose()
    createdAt: Date

    @ApiProperty({ type: Number, description: '생성자 ID', example: 1 })
    @Expose()
    createdBy: number

    @ApiProperty({ type: String, description: '수정일자', example: '2025-05-25 13:00:00' })
    @Expose()
    updatedAt: Date

    @ApiProperty({ type: Number, description: '수정자 ID', example: 1 })
    @Expose()
    updatedBy: number
}
