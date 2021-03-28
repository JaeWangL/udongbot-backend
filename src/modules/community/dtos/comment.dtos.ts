import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentRequest {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly communityId: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly creatorMemberId: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly postId: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly message: string;
}

export class CommentPreviewDto {
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

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly likesCount: number;
}
