import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class PostSaveDto {
    @ApiProperty({ type: String, required: true, description: '제목', example: '서비스 이용 안내' })
    @IsNotEmpty({ message: '제목은 필수입니다.' })
    @IsString({ message: '제목은 문자열입니다.' })
    title: string

    @ApiProperty({ type: String, required: true, description: '내용', example: '본 서비스는...' })
    @IsNotEmpty({ message: '내용은 필수입니다.' })
    @IsString({ message: '내용은 문자열입니다.' })
    content: string
}
