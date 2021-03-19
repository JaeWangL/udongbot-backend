import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { SocialSignInType } from '@common/enums';

export class SignInRequest {
  @ApiProperty({ type: String, maxLength: 255 })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly password: string;
}

export class SignInSocialRequest {
  @ApiProperty({ type: String, maxLength: 255 })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ type: String, nullable: true })
  readonly profileUrl?: string;

  @ApiProperty({ enum: SocialSignInType })
  readonly socialType: SocialSignInType;

  @ApiProperty({ type: String })
  readonly socialId: string;
}

export class SignUpRequest {
  @ApiProperty({ type: String, maxLength: 256 })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ type: String, maxLength: 30 })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ type: String, nullable: true })
  readonly profileUrl?: string;
}

export class TokenRefreshingRequest {
  @ApiProperty({ type: String, maxLength: 1024 })
  @IsNotEmpty()
  readonly refreshToken: string;
}

export class AuthTokensDto {
  @ApiProperty({ type: String, maxLength: 1024 })
  @IsNotEmpty()
  readonly accessToken: string;

  @ApiProperty({ type: String, maxLength: 1024 })
  @IsNotEmpty()
  readonly refreshToken: string;
}
