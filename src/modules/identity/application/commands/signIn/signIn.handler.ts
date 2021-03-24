import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import Bcrypt from 'bcrypt';
import Moment from 'moment';
import { AuthTokensDto } from '@modules/identity/dtos';
import { TokenEntity } from '@modules/identity/entities';
import { SignInPayload } from '@modules/identity/interfaces';
import { TokenRepository, UserRepository } from '@modules/identity/repositories';
import { ConfigService, LoggerService } from '@shared/services';
import SignInCommand from './signIn.command';

@CommandHandler(SignInCommand)
export default class SignInHandler implements ICommandHandler<SignInCommand, AuthTokensDto> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configSvc: ConfigService,
    private readonly loggerSvc: LoggerService,
    private readonly tokenRepo: TokenRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async execute(command: SignInCommand): Promise<AuthTokensDto> {
    this.loggerSvc.info('SignIn...', 'SignInCommand');
    const { req } = command;

    const user = await this.userRepo.findByEmailAsync(req.email);
    if (!user || !user.passwordHash) {
      throw new NotFoundException('Email is invalid');
    }
    const passwordCompared = await Bcrypt.compare(req.password, user.passwordHash);
    if (!passwordCompared) {
      throw new UnauthorizedException('Password is invalid');
    }

    const payload: SignInPayload = {
      id: user.id,
      email: user.email,
      userName: user.userName,
      name: user.name,
      profileUrl: user.profileUrl,
      role: user.role,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configSvc.get('ACCESS_TOKEN_EXPIRATION_TIME'),
      secret: this.configSvc.get('ACCESS_TOKEN_SECRET'),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configSvc.get('REFRESH_TOKEN_EXPIRATION_TIME'),
      secret: this.configSvc.get('REFRESH_TOKEN_SECRET'),
    });

    await this.tokenRepo.createAsync(
      new TokenEntity(user.id, refreshToken, Moment(new Date()).add(7, 'days').toDate()),
    );

    return {
      accessToken,
      refreshToken,
    } as AuthTokensDto;
  }
}
