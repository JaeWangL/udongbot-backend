import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostRequest {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly communityId: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly creatorMemberId: number;

  @ApiProperty({ type: String, maxLength: 100 })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly contentHtml: string;
}

export class PostDetailDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly creatorMemberId: number;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly memberUserName: string;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly memberName: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly memberProfileUrl: string;

  @ApiProperty({ type: String, maxLength: 100 })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly contentHtml: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly likesCount: number;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  readonly createdAt: Date;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  readonly updatedAt: Date;
}

export class PostPreviewDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly memberUserName: string;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly memberName: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly memberProfileUrl: string;

  @ApiProperty({ type: String, maxLength: 100 })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ type: String, maxLength: 300 })
  @IsNotEmpty()
  readonly contentPlain: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly likesCount: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly commentsCount: number;

  @ApiProperty({ type: Date })
  @IsNotEmpty()
  readonly createdAt: Date;
}
