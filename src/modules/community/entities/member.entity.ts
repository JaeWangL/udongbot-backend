import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AbstractEntity } from '@common/entities';
import { parseMemberRankType, MemberRankType } from '@common/enums';
// eslint-disable-next-line import/no-cycle
import CommentEntity from './comment.entity';
// eslint-disable-next-line import/no-cycle
import CommnunityEntity from './community.entity';
// eslint-disable-next-line import/no-cycle
import PostEntity from './post.entity';

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
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'communityId', referencedColumnName: 'id' })
  community: CommnunityEntity;

  @OneToMany(() => PostEntity, (post) => post.member)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (commnent) => commnent.member)
  comments: CommentEntity[];

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
