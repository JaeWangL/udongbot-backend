import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default class ConfigService {
  public get(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public getNumber(key: string): number | undefined {
    return this.get(key) ? Number(this.get(key)) : undefined;
  }

  get host(): string {
    return this.isProduction ? '0.0.0.0' : '127.0.0.1';
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV') || 'development';
  }

  get port(): number {
    return this.getNumber('PORT') || 8080;
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get jwtSecretKey(): string | undefined {
    return this.get('JWT_SECRET_KEY');
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mssql',
      host: this.get('DB_SERVER'),
      port: this.getNumber('DB_PORT') ? this.getNumber('DB_PORT') : 1433,
      username: this.get('DB_USER'),
      password: this.get('DB_PASSWORD'),
      database: this.get('DB_NAME'),
      schema: this.get('DB_SCHEMA'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      subscribers: ['dist/**/*.subscriber{.ts,.js}'],
      synchronize: false,
      logging: !this.isProduction,
      ssl: this.isProduction,
      connectionTimeout: 30000,
      options: {
        encrypt: true,
        enableArithAbort: true,
      },
    };
  }
}
