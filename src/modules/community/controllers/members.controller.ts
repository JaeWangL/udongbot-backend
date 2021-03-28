import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAccessGuard } from '@infrastructure/guards';
import { CreateMemberCommand, GetMembersWithCommQuery } from '../application';
import { CreateMemberRequest, MemberPreviewDto, MemberWithCommunityDto } from '../dtos';

@ApiTags('Members')
@Controller('members')
@ApiBearerAuth()
export default class MembersController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post('')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Create Member' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: MemberPreviewDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async createMember(@Body() req: CreateMemberRequest): Promise<MemberPreviewDto> {
    const member: MemberPreviewDto = await this.commandBus.execute(new CreateMemberCommand(req));

    return member;
  }

  @Get('user/:userId')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Get Members With Community' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [MemberWithCommunityDto],
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  async getMembersWithComm(@Param('userId') userId: number): Promise<MemberWithCommunityDto[]> {
    const members: MemberWithCommunityDto[] = await this.queryBus.execute(new GetMembersWithCommQuery(userId));

    return members;
  }
}
