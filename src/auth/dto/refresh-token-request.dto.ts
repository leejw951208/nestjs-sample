import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class RefreshTokenRequestDto {
    @ApiProperty({
        type: String,
        required: true,
        description: '리프레시 토큰',
        example: '1q2w3e4r5t6y7u8i9o0p'
    })
    @IsNotEmpty({ message: '리프레시 토큰은 필수입니다.' })
    @IsString({ message: '리프레시 토큰은 문자열입니다.' })
    refreshToken: string
}
