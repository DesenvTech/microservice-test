import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('purchase')
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
}
