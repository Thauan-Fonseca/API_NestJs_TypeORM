import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';

import { UpdatePutUserDTO } from './dto/update-put-use.dro';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class USerService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDTO) {
    if (
      await this.userRepository.exists({
        where: {
          email: data.email,
        },
      })
    ) {
      throw new NotFoundException(`O email ${data.email} já está em uso`);
    }
    // "Força do hash" com um força um pouco maior, será consumido mais processamento
    const salt = await bcrypt.genSalt();
    data.password = data.password;
    data.password = await bcrypt.hash(data.password, salt);
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async find() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.userRepository.findOneBy({
      id,
    });
  }

  async update(
    id: number,
    { name, email, password, birthAt, role }: UpdatePutUserDTO,
  ) {
    await this.exists(id);

    const salt = await bcrypt.genSalt();

    password = await bcrypt.hash(password, salt);

    await this.userRepository.update(id, {
      name,
      email,
      password,
      birthAt: birthAt ? new Date(birthAt) : null,
      role,
    });

    return this.findOne(id);
  }

  async updatePartial(
    id: number,
    { name, email, password, birthAt, role }: UpdatePatchUserDTO,
  ) {
    await this.exists(id);
    const data: any = {};

    const propertiesToCheck = { name, email, password, birthAt, role };

    for (const key in propertiesToCheck) {
      if (
        propertiesToCheck[key] !== undefined &&
        propertiesToCheck[key] !== null
      ) {
        // Verifica se a propriedade está definida e não é nula
        if (key === 'birthAt') {
          data[key] = new Date(propertiesToCheck[key]);
        } else if (key === 'password') {
          const salt = await bcrypt.genSalt();

          data[key] = await bcrypt.hash(propertiesToCheck[key], salt);
        } else {
          data[key] = propertiesToCheck[key];
        }
      }
    }

    await this.userRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number) {
    await this.exists(id);

    await this.userRepository.delete(id);
    return this.findOne(id);
  }

  async exists(id: number) {
    if (
      !(await this.userRepository.exists({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`O Usuário ${id} não existe`);
    }
  }
}
