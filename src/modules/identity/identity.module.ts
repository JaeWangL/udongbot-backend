import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import SharedModule from '@shared/shared.module';
import { ConfigService } from '@shared/services';
import JwtAccessStrategy from './strategies/jwt-access.strategy';
import JwtRefreshStrategy from './strategies/jwt-refresh.strategy';
import { AllCommandHandlers } from './commands';
import { AllQueryHandlers } from './queries';
import { AuthController, UserController } from './controllers';
import { TokenEntity, UserEntity } from './entities';
import { TokenRepository, UserRepository } from './repositories';

const AllControllers = [AuthController, UserController];
const AllEntities = [TokenEntity, UserEntity];
const AllRepositories = [TokenRepository, UserRepository];

@Module({
  imports: [
    CqrsModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [SharedModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.jwtSecretKey,
      }),
    }),
    TypeOrmModule.forFeature([...AllEntities]),
  ],
  controllers: [...AllControllers],
  providers: [JwtAccessStrategy, JwtRefreshStrategy, ...AllRepositories, ...AllCommandHandlers, ...AllQueryHandlers],
  exports: [...AllRepositories],
})
export default class IdentityModule {}
