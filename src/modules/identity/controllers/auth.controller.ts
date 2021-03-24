import { BadRequestException, Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInCommand, SignInSocialCommand, SignUpCommand } from '../application';
import { AuthTokensDto, SignInRequest, SignInSocialRequest, SignUpRequest, UserPreviewDto } from '../dtos';

@ApiTags('Auth')
@Controller('auth')
export default class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('signIn')
  @ApiOperation({ summary: 'SignIn' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AuthTokensDto,
    description: 'signed in successfully.',
  })
  async signIn(@Body() req: SignInRequest): Promise<AuthTokensDto> {
    if (!req) {
      throw new BadRequestException();
    }
    const tokens: AuthTokensDto = await this.commandBus.execute(new SignInCommand(req));

    return tokens;
  }

  @Post('signIn/social')
  @ApiOperation({ summary: 'SignIn with social accounts' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AuthTokensDto,
    description: 'signed in with social accounts successfully.',
  })
  async signInSocial(@Body() req: SignInSocialRequest): Promise<AuthTokensDto> {
    if (!req) {
      throw new BadRequestException();
    }
    const tokens: AuthTokensDto = await this.commandBus.execute(new SignInSocialCommand(req));

    return tokens;
  }

  @Post('signUp')
  @ApiOperation({ summary: 'SignUp' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserPreviewDto,
    description: 'User Created.',
  })
  async signUp(@Body() req: SignUpRequest): Promise<UserPreviewDto> {
    if (req === undefined) {
      throw new BadRequestException();
    }
    const user: UserPreviewDto = await this.commandBus.execute(new SignUpCommand(req));

    return user;
  }
}
