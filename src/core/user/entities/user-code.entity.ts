import { v4 as uuid } from 'uuid';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity('user_code')
export class UserCode {
  @PrimaryColumn()
  id: string = uuid();

  @Column({ name: 'user_id', type: 'int', nullable: true })
  userId?: number;

  @Column({ type: 'varchar', length: 1024 })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  type: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @Column({ name: 'expires_at', type: 'datetime', nullable: true })
  expiresAt?: Date;

  @ManyToOne(() => User, (user) => user.codes, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
