import { USerService } from '../user/user.service';
import { userEntityList } from './user-entity-list.mock';

export const userServiceMock = {
  provide: USerService,
  useValue: {
    findOne: jest.fn().mockResolvedValue(userEntityList[0]),
    create: jest.fn().mockResolvedValue(userEntityList[0]),
    update: jest.fn().mockResolvedValue(userEntityList),
    updatePartial: jest.fn().mockResolvedValue(userEntityList[0]),
    find: jest.fn().mockResolvedValue(userEntityList),
    delete: jest.fn().mockResolvedValue(true),
    exists: jest.fn().mockResolvedValue(true),
  },
};
