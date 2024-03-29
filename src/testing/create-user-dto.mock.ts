import { Role } from '../enum/role.enum';
import { CreateUserDTO } from '../user/dto/create-user.dto';

export const CreateUserDto: CreateUserDTO = {
  name: 'Thauan Fonseca',
  email: 'thauan@email.com',
  password: '',
  birthAt: new Date('1995-02-11'),
  role: Role.user,
};
