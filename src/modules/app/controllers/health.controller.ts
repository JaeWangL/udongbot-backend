import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { ConfigService } from '@shared/services';

@Controller('health')
export default class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
    private readonly http: HttpHealthIndicator,
    public configSvc: ConfigService,
  ) {}

  @Get('db')
  @HealthCheck()
  async checkDatabase(): Promise<HealthCheckResult> {
    return await this.health.check([async () => this.db.pingCheck('typeorm')]);
  }

  @Get('dns')
  @HealthCheck()
  async checkDns(): Promise<HealthCheckResult> {
    if (!this.configSvc.get('DNS_URL')) {
      return { status: 'error' } as HealthCheckResult;
    }

    return await this.health.check([() => this.http.pingCheck('dns', `${this.configSvc.get('DNS_URL')}/docs`)]);
  }
}
