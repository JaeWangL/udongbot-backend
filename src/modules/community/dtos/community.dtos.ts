import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommunityRequest {
  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ type: String, maxLength: 300 })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly profileUrl: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly coverUrl: string;

  @ApiProperty({ type: String, nullable: true })
  readonly website?: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly creatorUserId: number;
}

export class CommunityForMemberDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly profileUrl: string;
}

export class CommunityPreviewDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ type: String, maxLength: 300 })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly profileUrl: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly coverUrl: string;

  @ApiProperty({ type: String, nullable: true })
  readonly website?: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly memberCount: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly onlineCount: number;
}
