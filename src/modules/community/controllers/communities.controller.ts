import { Body, Controller, Get, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import PaginatedItemsViewModel from '@common/dtos/paginated-Items.viewModel';
import { ApiPaginatedResponse } from '@infrastructure/decorators';
import { JwtAccessGuard } from '@infrastructure/guards';
import { CreateCommunityCommand, GetCommunitiesForQueryQuery, GetCommunityByIdQuery } from '../application';
import { CommunityPreviewDto, CreateCommunityRequest } from '../dtos';

@ApiTags('Communities')
@Controller('communities')
@ApiBearerAuth()
export default class CommunitiesController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post('')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Create Community' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CommunityPreviewDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async createCommunity(@Body() req: CreateCommunityRequest): Promise<CommunityPreviewDto> {
    const community: CommunityPreviewDto = await this.commandBus.execute(new CreateCommunityCommand(req));

    return community;
  }

  @Get(':id')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Get Community By Id' })
  @ApiResponse({ status: HttpStatus.OK, type: CommunityPreviewDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async getCommunitiyById(@Param('id') id: number): Promise<CommunityPreviewDto> {
    const community: CommunityPreviewDto = await this.queryBus.execute(new GetCommunityByIdQuery(id));

    return community;
  }

  @Get('search/:searchQuery')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Get Commnities For Search' })
  @ApiPaginatedResponse(CommunityPreviewDto)
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async getCommunitiesForSearch(
    @Param('searchQuery') searchQuery: string,
    @Query('pageIndex') pageIndex = 0,
    @Query('pageSize') pageSize = 10,
  ): Promise<PaginatedItemsViewModel<CommunityPreviewDto>> {
    const communities: PaginatedItemsViewModel<CommunityPreviewDto> = await this.queryBus.execute(
      new GetCommunitiesForQueryQuery(searchQuery, pageIndex, pageSize),
    );

    return communities;
  }
}
