import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class PostUpdateDto {
    @ApiProperty({ type: String, required: true, description: '제목', example: '서비스 이용 안내' })
    @IsOptional()
    @IsString({ message: '제목은 문자열입니다.' })
    title?: string

    @ApiProperty({ type: String, required: true, description: '내용', example: '본 서비스는...' })
    @IsOptional()
    @IsString({ message: '내용은 문자열입니다.' })
    content?: string
}
