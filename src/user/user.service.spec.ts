import { Test, TestingModule } from '@nestjs/testing';
import { USerService } from './user.service';
import { userRepositoryMock } from '../../src/testing/user-repository.mock';

import { userEntityList } from '../testing/user-entity-list.mock';
import { CreateUserDto } from '../testing/create-user-dto.mock';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdatePutUserDto } from '../testing/update-put-user-dto.mock';
import { UpdatePatchUserDto } from '../testing/update-patch-user-dto.mock';

describe('UserService', () => {
  let userService: USerService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [USerService, userRepositoryMock],
    }).compile();

    userService = module.get<USerService>(USerService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  test('Validar a definição', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Create', () => {
    test('method create', async () => {
      jest.spyOn(userRepository, 'exists').mockResolvedValueOnce(false);

      const result = await userService.create(CreateUserDto);
      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Read', () => {
    test('method find', async () => {
      const result = await userService.find();
      expect(result).toEqual(userEntityList);
    });

    test('method findOne', async () => {
      const result = await userService.findOne(1);
      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Update', () => {
    test('method update', async () => {
      const result = await userService.update(1, UpdatePutUserDto);
      expect(result).toEqual(userEntityList[0]);
    });

    test('method updatePartial', async () => {
      const result = await userService.updatePartial(1, UpdatePatchUserDto);
      expect(result).toEqual(userEntityList[0]);
    });
  });
  describe('Delete', () => {
    test('method Delete', async () => {
      const result = await userService.delete(1);
      expect(result).toEqual(userEntityList[0]);
    });
  });
});
