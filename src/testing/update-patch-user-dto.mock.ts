import { Role } from '../enum/role.enum';
import { UpdatePatchUserDTO } from '../user/dto/update-patch-user.dto';

export const UpdatePatchUserDto: UpdatePatchUserDTO = {
  name: 'Thauan Fonseca',
  email: 'thauan@email.com',
  password: '',
  birthAt: new Date('1995-02-11'),
  role: Role.user,
};
