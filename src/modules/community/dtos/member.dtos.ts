import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { MemberRankType } from '@common/enums';
import { CommunityForMemberDto } from './community.dtos';

export class CreateMemberRequest {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly communityId: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly userId: number;
}

export class MemberPreviewDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly userUserName: string;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly userName: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly userProfileUrl: string;

  @ApiProperty({ enum: MemberRankType })
  @IsNotEmpty()
  readonly rank: number;

  @ApiProperty({ type: Boolean })
  @IsNotEmpty()
  readonly isOnline: boolean;
}

export class MemberWithCommunityDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({ enum: MemberRankType })
  @IsNotEmpty()
  readonly rank: number;

  @ApiProperty({ type: CommunityForMemberDto })
  @IsNotEmpty()
  readonly commnunity: CommunityForMemberDto;
}
