import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import Moment from 'moment';
import { parseSocialSignInType } from '@common/enums';
import { AuthTokensDto, SignInSocialRequest } from '@modules/identity/dtos';
import { TokenEntity, UserEntity } from '@modules/identity/entities';
import { TokenRepository, UserRepository } from '@modules/identity/repositories';
import { SignInPayload } from '@modules/identity/interfaces';
import { ConfigService } from '@shared/services';
import { getNameFromSocial, getUserNameFromSocial } from '@utils/identity.utils';
import SignInSocialCommand from './signIn-social.command';

@CommandHandler(SignInSocialCommand)
export default class SignInSocialHandler implements ICommandHandler<SignInSocialCommand, AuthTokensDto> {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configSvc: ConfigService,
    private readonly tokenRepo: TokenRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async execute(command: SignInSocialCommand): Promise<AuthTokensDto> {
    const { req } = command;

    const user = await this.userRepo.findByEmailWithSocialAsync(
      req.email,
      parseSocialSignInType(req.socialType),
      req.socialId,
    );
    if (!user) {
      // NOTE: for sign up
      const newUser = await this.signUpSocial(req);

      return await this.generateTokens(newUser);
    }

    return await this.generateTokens(user);
  }

  private async generateTokens(user: UserEntity): Promise<AuthTokensDto> {
    const payload: SignInPayload = {
      id: user.id,
      email: user.email,
      userName: user.userName,
      name: user.name,
      profileUrl: user.profileUrl,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
      secret: process.env.ACCESS_TOKEN_SECRET,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
      secret: process.env.REFRESH_TOKEN_SECRET,
    });

    await this.tokenRepo.createAsync(
      new TokenEntity(user.id, refreshToken, Moment(new Date()).add(7, 'days').toDate()),
    );

    return {
      accessToken,
      refreshToken,
    } as AuthTokensDto;
  }

  private async signUpSocial(req: SignInSocialRequest): Promise<UserEntity> {
    const newUserEntity = new UserEntity(
      req.email,
      getUserNameFromSocial(req.email, req.name),
      getNameFromSocial(req.email, req.name),
      req.profileUrl ? req.profileUrl : this.configSvc.get('DEFAULT_PROFILE_URL'),
      undefined,
      parseSocialSignInType(req.socialType),
      req.socialId,
      true,
    );

    return await this.userRepo.createAsync(newUserEntity);
  }
}
