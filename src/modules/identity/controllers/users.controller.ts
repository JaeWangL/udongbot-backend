import { Controller, Get, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import PaginatedItemsViewModel from '@common/dtos/paginated-Items.viewModel';
import { ApiPaginatedResponse, Roles, RolesEnum } from '@infrastructure/decorators';
import { JwtAccessGuard, RolesGuard } from '@infrastructure/guards';
import { GetUserByIdQuery, GetUsersAllQuery } from '../application';
import { UserPreviewDto } from '../dtos';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export default class UsersController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':id')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Get User By Id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserPreviewDto,
    description: 'Get User By Id.',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async getById(@Param('id') id: number): Promise<UserPreviewDto> {
    const foundUser: UserPreviewDto = await this.queryBus.execute(new GetUserByIdQuery(id));

    return foundUser;
  }

  @Get('onlyVerified/:onlyVerified')
  @UseGuards(RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Get All Users Preview' })
  @ApiPaginatedResponse(UserPreviewDto)
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async getUsersAllPreview(
    @Param('onlyVerified') onlyVerified: boolean,
    @Query('pageIndex') pageIndex = 0,
    @Query('pageSize') pageSize = 10,
  ): Promise<PaginatedItemsViewModel<UserPreviewDto>> {
    const users: PaginatedItemsViewModel<UserPreviewDto> = await this.queryBus.execute(
      new GetUsersAllQuery(onlyVerified, pageIndex, pageSize),
    );

    return users;
  }
}
