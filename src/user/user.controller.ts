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
import { Roles } from '../decorators/rule.decorator';
import { Role } from '../enum/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { ParamId } from '../decorators/param-id.decorator';

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
    return {
      success: await this.UserService.delete(id),
    };
  }
}
