import { ApiProperty } from '@nestjs/swagger'
import { UserResponseDto } from '../../user/dto/user-response.dto'
import { Type } from 'class-transformer'

export class LoginResponseDto {
    @ApiProperty({ type: String, description: '액세스 토큰', example: '1q2w3e4r' })
    accessToken: string

    @ApiProperty({ type: String, description: '리프레시 토큰', example: '1q2w3e4r' })
    refreshToken: string

    @ApiProperty({ type: UserResponseDto, description: '사용자 정보', example: () => UserResponseDto })
    user: UserResponseDto
}
