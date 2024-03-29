import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../enum/role.enum';

// Usamos o decorador @Entity para definir que a classe UserEntity é uma entidade do banco de dados. E passamos um objeto com o nome da tabela para que ele possa reconhecê-la
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id?: number;

  @Column({
    length: 63,
  })
  name: string;

  @Column({
    length: 127,
    unique: true,
  })
  email: string;

  @Column({
    length: 127,
  })
  password: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthAt?: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({
    default: Role.user,
  })
  role: number;
}
