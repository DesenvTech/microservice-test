import { PurchaseEntity } from 'src/purchase/entities/purchase.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'nome' })
  name: string;

  @Column({ name: 'cpf' })
  document: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'telefone' })
  phone: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => PurchaseEntity, (x) => x.user)
  purchase: PurchaseEntity;
}
