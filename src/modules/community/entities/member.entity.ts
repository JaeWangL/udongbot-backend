import { Entity, Column, ManyToOne, JoinTable } from 'typeorm';
import { AbstractEntity } from '@common/entities';
import { parseMemberRankType, MemberRankType } from '@common/enums';
// eslint-disable-next-line import/no-cycle
import CommnunityEntity from './community.entity';

@Entity('Members')
export default class MemberEntity extends AbstractEntity {
  @Column({ type: 'bigint' })
  communityId: number;

  @Column({ type: 'bigint' })
  userId: number;

  @Column({ type: 'nvarchar', length: 30 })
  userUserName: string;

  @Column({ type: 'nvarchar', length: 30 })
  userName: string;

  @Column({ type: 'nvarchar', length: 'MAX' })
  userProfileUrl: string;

  @Column({ type: 'tinyint', enum: MemberRankType })
  rank: number;

  @Column({ type: 'bit' })
  isOnline: boolean;

  @Column({ type: 'bit' })
  isBlocked: boolean;

  @ManyToOne(() => CommnunityEntity, (commnunity) => commnunity.members, {
    cascade: true,
  })
  @JoinTable({
    name: 'FK_Members_Communities_CommunityId',
    joinColumn: {
      name: 'Members',
      referencedColumnName: 'communityId',
    },
  })
  community: CommnunityEntity;

  constructor(
    communityId: number,
    userId: number,
    userUserName: string,
    userName: string,
    userProfileUrl: string,
    rank = MemberRankType.Member,
    isOnline = false,
    isBlocked = false,
  ) {
    super();
    this.communityId = communityId;
    this.userId = userId;
    this.userUserName = userUserName;
    this.userName = userName;
    this.userProfileUrl = userProfileUrl;
    this.rank = parseMemberRankType(rank);
    this.isOnline = isOnline;
    this.isBlocked = isBlocked;
  }

  setOnline(isOnline: boolean): void {
    this.isOnline = isOnline;
    this.updatedAt = new Date();
  }

  setBlocked(isBlocked: boolean): void {
    this.isBlocked = isBlocked;
    this.updatedAt = new Date();
  }
}
