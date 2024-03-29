import { Role } from '../enum/role.enum';
import { UpdatePutUserDTO } from '../user/dto/update-put-use.dro';

export const UpdatePutUserDto: UpdatePutUserDTO = {
  name: 'Thauan Fonseca',
  email: 'thauan@email.com',
  password: '',
  birthAt: new Date('1995-02-11'),
  role: Role.user,
};
