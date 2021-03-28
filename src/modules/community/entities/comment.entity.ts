import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from '@common/entities';
// eslint-disable-next-line import/no-cycle
import MemberEntity from './member.entity';
// eslint-disable-next-line import/no-cycle
import PostEntity from './post.entity';

@Entity('Comments')
export default class CommentEntity extends AbstractEntity {
  @Column({ type: 'bigint' })
  communityId: number;

  @Column({ type: 'bigint' })
  creatorMemberId: number;

  @Column({ type: 'bigint' })
  postId: number;

  @Column({ type: String })
  message: string;

  @Column({ type: 'int' })
  likesCount: number;

  @ManyToOne(() => MemberEntity, (member) => member.comments)
  @JoinColumn({ name: 'creatorMemberId', referencedColumnName: 'id' })
  member: MemberEntity;

  @ManyToOne(() => PostEntity, (post) => post.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: PostEntity;

  constructor(communityId: number, creatorMemberId: number, postId: number, message: string, likesCount = 0) {
    super();
    this.communityId = communityId;
    this.creatorMemberId = creatorMemberId;
    this.postId = postId;
    this.message = message;
    this.likesCount = likesCount;
  }

  decreaseLike(): void {
    this.likesCount -= 1;
  }

  increaseLike(): void {
    this.likesCount += 1;
  }

  setMessage(message: string): void {
    this.message = message;
    this.updatedAt = new Date();
  }
}
