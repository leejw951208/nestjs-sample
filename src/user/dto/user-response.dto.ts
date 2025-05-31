import { ApiProperty } from '@nestjs/swagger'

export class UserResponseDto {
    @ApiProperty({ type: Number, description: '사용자 ID', example: 1 })
    id: number

    @ApiProperty({ type: String, description: '이메일', example: 'user@user.com' })
    email: string

    @ApiProperty({ type: String, description: '이름', example: '홍길동' })
    name: string

    @ApiProperty({ type: String, description: '생성일자', example: '2025-05-25 13:00:00' })
    createdAt: Date

    @ApiProperty({ type: Number, description: '생성자 ID', example: 1 })
    createdBy: number

    @ApiProperty({ type: String, description: '수정일자', example: '2025-05-25 13:00:00' })
    updatedAt: Date

    @ApiProperty({ type: Number, description: '수정자 ID', example: 1 })
    updatedBy: number
}
