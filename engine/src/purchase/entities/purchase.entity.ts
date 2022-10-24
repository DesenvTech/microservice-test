import { UserEntity } from 'src/user/entities/user.entity';
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

@Entity('pedidos')
export class PurchaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('uuid', { name: 'usuario_id' })
  userId: string;

  @Column({ name: 'descricao' })
  description: string;

  @Column({ name: 'quantidade' })
  amount: number;

  @Column({ name: 'preco' })
  price: number;

  @Column({ name: 'valor' })
  value: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => UserEntity, (x) => x.purchase, { eager: true })
  @JoinColumn({ name: 'usuario_id', referencedColumnName: 'id' })
  user: UserEntity;
}
