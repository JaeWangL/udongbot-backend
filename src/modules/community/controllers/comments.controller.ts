import { Body, Controller, Get, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import PaginatedItemsViewModel from '@common/dtos/paginated-Items.viewModel';
import { ApiPaginatedResponse } from '@infrastructure/decorators';
import { JwtAccessGuard } from '@infrastructure/guards';
import { CreateCommentCommand, GetCommentsByPostIdQuery } from '../application';
import { CommentPreviewDto, CreateCommentRequest } from '../dtos';

@ApiTags('Comments')
@Controller('comments')
@ApiBearerAuth()
export default class CommentsController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post('')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Create Comment' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CommentPreviewDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async createComment(@Body() req: CreateCommentRequest): Promise<CommentPreviewDto> {
    const comment: CommentPreviewDto = await this.commandBus.execute(new CreateCommentCommand(req));

    return comment;
  }

  @Get('post/:postId')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Get Comments By PostId' })
  @ApiPaginatedResponse(CommentPreviewDto)
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async getCommentsByPostId(
    @Param('postId') postId: number,
    @Query('pageIndex') pageIndex = 0,
    @Query('pageSize') pageSize = 10,
  ): Promise<PaginatedItemsViewModel<CommentPreviewDto>> {
    const comments: PaginatedItemsViewModel<CommentPreviewDto> = await this.queryBus.execute(
      new GetCommentsByPostIdQuery(postId, pageIndex, pageSize),
    );

    return comments;
  }
}
