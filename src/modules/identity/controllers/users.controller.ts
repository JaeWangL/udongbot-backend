import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Put, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import PaginatedItemsViewModel from '@common/dtos/paginated-Items.viewModel';
import { ApiPaginatedResponse, Roles, RolesEnum } from '@infrastructure/decorators';
import { JwtAccessGuard, RolesGuard } from '@infrastructure/guards';
import { GetUserByIdQuery, GetUsersAllQuery, UpdateProfileCommand } from '../application';
import { UpdateProfileRequest, UserPreviewDto } from '../dtos';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export default class UsersController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

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

  @Put('profile')
  @ApiOperation({ summary: 'Update User Profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserPreviewDto,
    description: 'Profile is updated.',
  })
  async signUp(@Body() req: UpdateProfileRequest): Promise<UserPreviewDto> {
    if (req === undefined) {
      throw new BadRequestException();
    }
    const user: UserPreviewDto = await this.commandBus.execute(new UpdateProfileCommand(req));

    return user;
  }
}
