import { Global, HttpModule, Module } from '@nestjs/common';
import { BlobService, ConfigService, LoggerService } from './services';

const providers = [BlobService, ConfigService, LoggerService];

@Global()
@Module({
  providers,
  imports: [HttpModule],
  exports: [...providers, HttpModule],
})
export default class SharedModule {}
