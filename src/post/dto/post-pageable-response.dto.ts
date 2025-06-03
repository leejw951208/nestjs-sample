import { ApiProperty } from '@nestjs/swagger'
import { PageableResponseDto } from '../../_common/dto/pageable-response.dto'
import { PostModel } from '../model/post.model'
import { PostResponseDto } from './post-response.dto'

export class PostPageableResponseDto extends PageableResponseDto {
    @ApiProperty({ type: PostResponseDto, isArray: true, description: '현재 페이지에 보여줄 데이터 목록' })
    data: PostResponseDto[]

    constructor(data: PostResponseDto[], totalCount: number, page: number, size: number) {
        super(page, size, totalCount)
        this.data = data
    }
}
