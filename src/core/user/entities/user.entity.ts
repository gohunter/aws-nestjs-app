import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { genSalt, hash } from 'bcryptjs';

import { ColumnBooleanTransformer } from '@common/helpers';
import { AuditModel } from '@common/models';

import { Profile } from './profile.entity';
import { UserCode } from './user-code.entity';

@Entity('fos_user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  username?: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false, select: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: false, select: false })
  salt: string;

  @Column({
    type: 'tinyint',
    nullable: false,
    default: 1,
    transformer: new ColumnBooleanTransformer(),
  })
  enabled: boolean;

  @Column(() => AuditModel, { prefix: false })
  audit: AuditModel;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  profile: Profile;

  @OneToMany(() => UserCode, (codes) => codes.user)
  codes: UserCode[];

  @BeforeInsert()
  setDefaultValues() {
    this.enabled = true;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.salt = await genSalt(6);
    this.password = await hash(this.password, this.salt);
  }
}
