import { Body, Controller, Get, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import PaginatedItemsViewModel from '@common/dtos/paginated-Items.viewModel';
import { ApiPaginatedResponse } from '@infrastructure/decorators';
import { JwtAccessGuard } from '@infrastructure/guards';
import { CreatePostCommand, GetPostByIdQuery, GetPostsByCommIdQuery } from '../application';
import { CreatePostRequest, PostDetailDto, PostPreviewDto } from '../dtos';

@ApiTags('Posts')
@Controller('posts')
@ApiBearerAuth()
export default class PostsController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post('')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Create Post' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PostDetailDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async createPost(@Body() req: CreatePostRequest): Promise<PostDetailDto> {
    const post: PostDetailDto = await this.commandBus.execute(new CreatePostCommand(req));

    return post;
  }

  @Get(':id')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Get Post By Id' })
  @ApiResponse({ status: HttpStatus.OK, type: PostDetailDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async getPostById(@Param('id') id: number): Promise<PostDetailDto> {
    const post: PostDetailDto = await this.queryBus.execute(new GetPostByIdQuery(id));

    return post;
  }

  @Get('community/:communityId')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Get Posts By CommunityId' })
  @ApiPaginatedResponse(PostPreviewDto)
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async getPostsByCommId(
    @Param('communityId') communityId: number,
    @Query('pageIndex') pageIndex = 0,
    @Query('pageSize') pageSize = 10,
  ): Promise<PaginatedItemsViewModel<PostPreviewDto>> {
    const posts: PaginatedItemsViewModel<PostPreviewDto> = await this.queryBus.execute(
      new GetPostsByCommIdQuery(communityId, pageIndex, pageSize),
    );

    return posts;
  }
}
