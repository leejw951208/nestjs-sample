import { ApiProperty } from '@nestjs/swagger'

export class RefreshTokenResponseDto {
    @ApiProperty({
        type: String,
        required: true,
        description: '새로운 액세스 토큰',
        example: '1q2w3e4r5t6y7u8i9o0p'
    })
    accessToken: string

    @ApiProperty({
        type: String,
        required: true,
        description: '새로운 리프레시 토큰',
        example: '1q2w3e4r5t6y7u8i9o0p'
    })
    refreshToken: string
}
