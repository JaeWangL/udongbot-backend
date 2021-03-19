import { Global, HttpModule, Module } from '@nestjs/common';
import ConfigService from './config/config.service';
import LoggerService from './logger/logger.service';

const providers = [ConfigService, LoggerService];

@Global()
@Module({
  providers,
  imports: [HttpModule],
  exports: [...providers, HttpModule],
})
export default class SharedModule {}
