import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { JoinColumn } from 'typeorm';
import { BankAccount } from './bank-account.model';

export enum PixKeyKind {
  cpf = 'cpf',
  email = 'email',
}

@Entity({
  name: 'pix_keys',
})
export class PixKey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string;

  @Column()
  kind: PixKeyKind;

  @ManyToOne(() => BankAccount)
  @JoinColumn({ name: 'bank_account_id' })
  bankAccount: BankAccount;

  @Column()
  bank_account_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @BeforeInsert()
  generateId() {
    if (this.id) {
      return;
    }
    this.id = uuidv4();
  }
}
