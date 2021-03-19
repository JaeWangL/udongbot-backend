import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '@common/entities';

@Entity('Tokens')
export default class TokenEntity extends AbstractEntity {
  @Column({ type: 'bigint' })
  userId: number;

  @Column({ type: 'nvarchar', length: 1024 })
  refreshToken: string;

  @Column({ type: 'datetimeoffset' })
  expirationDate: Date;

  constructor(userId: number, refreshToken: string, expirationDate: Date) {
    super();
    this.userId = userId;
    this.refreshToken = refreshToken;
    this.expirationDate = expirationDate;
  }

  updateToken(newRefreshToken: string): void {
    this.refreshToken = newRefreshToken;
    this.updatedAt = new Date();
  }
}
