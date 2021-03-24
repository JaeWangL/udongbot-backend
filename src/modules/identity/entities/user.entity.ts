import { Entity, Column, Index } from 'typeorm';
import { AbstractEntity } from '@common/entities';
import { parseSocialSignInType, SocialSignInType } from '@common/enums';
import { RolesEnum } from '@infrastructure/decorators/roles.decorator';

@Entity('Users')
export default class UserEntity extends AbstractEntity {
  @Column({ type: 'nvarchar', length: 255 })
  @Index({ unique: true })
  email: string;

  @Column({ type: 'nvarchar', length: 'MAX', nullable: true })
  passwordHash?: string;

  @Column({ type: 'tinyint', enum: SocialSignInType, nullable: true })
  socialType?: number;

  @Column({ type: 'nvarchar', length: 'MAX', nullable: true })
  socialId?: string;

  @Column({ type: 'bit' })
  isVerified: boolean;

  @Column({ type: 'nvarchar', length: 30 })
  userName: string;

  @Column({ type: 'nvarchar', length: 30 })
  name: string;

  @Column({ type: 'nvarchar', length: 'MAX' })
  profileUrl: string;

  @Column({ type: 'tinyint', enum: RolesEnum })
  role: number;

  constructor(
    email: string,
    userName: string,
    name: string,
    profileUrl: string,
    passwordHash?: string,
    socialType?: SocialSignInType,
    socialId?: string,
    isVerified = false,
    role = RolesEnum.USER,
  ) {
    super();
    this.email = email;
    this.userName = userName;
    this.name = name;
    this.profileUrl = profileUrl;
    this.passwordHash = passwordHash;
    this.socialType = socialType ? parseSocialSignInType(socialType) : undefined;
    this.socialId = socialId;
    this.isVerified = isVerified;
    this.role = role;
  }

  updateVerified(verified = true): void {
    this.isVerified = verified;
    this.updatedAt = new Date();
  }
}
