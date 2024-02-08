import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDTO } from './dto/update-put-use.dro';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class USerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    data.password = data.password;

    // "Força do hash" com um força um pouco maior, será consumido mais processamento
    const salt = await bcrypt.genSalt();

    data.password = await bcrypt.hash(data.password, salt);

    return this.prisma.user.create({
      data,
    });
  }

  async find() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    { name, email, password, birthAt, role }: UpdatePutUserDTO,
  ) {
    await this.exists(id);

    const salt = await bcrypt.genSalt();

    password = await bcrypt.hash(password, salt);

    return this.prisma.user.update({
      data: {
        name,
        email,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
        role,
      },
      where: {
        id,
      },
    });
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

    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    await this.exists(id);

    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`O Usuário ${id} não existe`);
    }
  }
}
