import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AuditModel {
  // Created
  @ApiProperty()
  @Column({ name: 'created_user', type: 'varchar', nullable: true })
  createdUser: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Updated
  @ApiProperty()
  @Column({ name: 'updated_user', type: 'varchar', nullable: true })
  updatedUser: string;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Deleted
  @ApiProperty()
  @Column({ name: 'deleted_user', type: 'varchar', nullable: true })
  deletedUser: string;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
