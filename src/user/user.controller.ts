import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-use.dro';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { USerService } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/rule.decorator';
import { Role } from 'src/enum/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@Roles(Role.admin)
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly UserService: USerService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.UserService.create(data);
  }

  @Get()
  async read() {
    return this.UserService.find();
  }

  @Get(':id')
  async readOne(@ParamId() id: number) {
    return this.UserService.findOne(id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @ParamId() id) {
    return this.UserService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(
    @Body() { name, email, password, birthAt }: UpdatePatchUserDTO,
    @ParamId() id,
  ) {
    return this.UserService.updatePartial(id, {
      name,
      email,
      password,
      birthAt,
    });
  }

  @Delete(':id')
  async delete(@ParamId() id) {
    console.log('Entrou no delete do controller');

    return this.UserService.delete(id);
  }
}
