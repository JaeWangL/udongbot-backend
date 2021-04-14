import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateProfileRequest {
  @ApiProperty({ type: Number })
  readonly id: number;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ type: String, nullable: true })
  readonly profileUrl?: string;
}

export class UserPreviewDto {
  @ApiProperty({ type: Number })
  readonly id: number;

  @ApiProperty({ type: String, maxLength: 255 })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly userName: string;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly profileUrl: string;
}
