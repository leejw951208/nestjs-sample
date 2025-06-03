import { Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common'
import { PostService } from './post.service'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { PostPageableResponseDto } from './dto/post-pageable-response.dto'
import { PostPageableRequestDto } from './dto/post-pageable-request.dto'
import { PostResponseDto } from './dto/post-response.dto'
import { PostSaveDto } from './dto/post-save.dto'

const path = 'post'
@ApiTags(path)
@ApiBearerAuth('JWT-Auth')
@Controller({ path })
export class PostController {
    constructor(private readonly postService: PostService) {}

    @ApiOperation({
        summary: '페이지로 조회'
    })
    @ApiResponse({ status: HttpStatus.OK, type: PostPageableResponseDto })
    @Get('page')
    async findPage(@Query() searchCondition: PostPageableRequestDto): Promise<PostPageableResponseDto> {
        const result = await this.postService.findPage(searchCondition)
        return new PostPageableResponseDto(result[0], result[1], searchCondition.page, searchCondition.size)
    }

    @ApiOperation({
        summary: '단건 조회'
    })
    @ApiParam({ type: Number, name: 'id', description: 'Post ID(PK)' })
    @ApiResponse({ status: HttpStatus.OK, type: PostResponseDto })
    @Get(':id')
    async findById(@Param('id') id: number): Promise<PostResponseDto> {
        return await this.postService.findById(id)
    }

    @ApiOperation({
        summary: '저장'
    })
    @ApiBody({ type: PostSaveDto })
    @ApiResponse({ status: HttpStatus.OK })
    @Post()
    async save(@Body() reqDto: PostSaveDto): Promise<void> {
        await this.postService.save(reqDto)
    }
}
