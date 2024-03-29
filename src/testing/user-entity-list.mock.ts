import { Role } from '../enum/role.enum';
import { UserEntity } from '../user/entity/user.entity';

export const userEntityList: UserEntity[] = [
  {
    name: 'Thauan Fonseca',
    email: 'thauan@email.com',
    password: '$10$ddft0ZNtj66fN/i/0l2Yt.NVzcGJK.3PK161hiJyYs8m8XCbGGoza',
    birthAt: new Date('1995-02-11'),
    createdAt: new Date(),
    updatedAt: new Date(),
    role: Role.admin,
  },
  {
    name: 'Jeyquisson Lima',
    email: 'jeyquisson@email.com',
    password: '$10$ddft0ZNtj66fN/i/0l2Yt.NVzcGJK.3PK161hiJyYs8m8XCbGGoza',
    birthAt: new Date('1995-02-11'),
    createdAt: new Date(),
    updatedAt: new Date(),
    role: Role.admin,
  },
  {
    name: 'Nanan Lima',
    email: 'nanan@email.com',
    password: '$10$ddft0ZNtj66fN/i/0l2Yt.NVzcGJK.3PK161hiJyYs8m8XCbGGoza',
    birthAt: new Date('1995-02-11'),
    createdAt: new Date(),
    updatedAt: new Date(),
    role: Role.admin,
  },
];
