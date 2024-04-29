import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('fos_profile')
export class Profile {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'document_type', type: 'int' })
  documentType: number;

  @Column({ name: 'document_number', type: 'varchar', length: 128 })
  documentNumber: string;

  @Column({ name: 'lastname', type: 'varchar', length: 255 })
  lastName: string;

  @Column({ name: 'firstname', type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  phone?: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'id' })
  user: User;
}
