import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import SharedModule from '@shared/shared.module';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@shared/services';
import IdentityModule from '../identity/identity.module';
import { AppController, HealthController } from './controllers';
import { AppService } from './app.service';

const AllControllers = [AppController, HealthController];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedModule,
    TerminusModule,
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
    }),
    IdentityModule,
  ],
  controllers: [...AllControllers],
  providers: [AppService],
})
export default class AppModule {}
