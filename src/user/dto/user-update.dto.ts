import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UserUpdateDto {
    @ApiProperty({ type: String, required: true, description: '회원명', example: '홍길동' })
    @IsOptional()
    @IsString({ message: '회원명은 문자입니다.' })
    name?: string
}
