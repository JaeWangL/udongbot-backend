import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { TokenEntity } from '../entities';

@Injectable()
export default class TokenRepository {
  constructor(
    @InjectRepository(TokenEntity)
    private tokenRepo: Repository<TokenEntity>,
  ) {}

  async createAsync(newToken: TokenEntity): Promise<TokenEntity> {
    return await this.tokenRepo.save(newToken);
  }

  async deleteByExpirationAsync(): Promise<void> {
    await this.tokenRepo.delete({
      expirationDate: LessThanOrEqual(new Date()),
    });
  }

  async deleteByUserIdAsync(userId: number): Promise<void> {
    await this.tokenRepo.delete({ userId });
  }

  async findByUserIdAndTokenAsync(
    userId: number,
    type: number,
    refreshToken: string,
  ): Promise<TokenEntity | undefined> {
    const token = await this.tokenRepo.findOne({
      where: {
        userId,
        type,
        refreshToken,
      },
    });

    return token;
  }

  async updateAsync(updatedToken: TokenEntity): Promise<TokenEntity> {
    return await this.tokenRepo.save(updatedToken);
  }
}
