import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { userServiceMock } from '../testing/user-service.mock';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { RoleGuard } from '../guards/role.guard';
import { USerService } from './user.service';
import { CreateUserDto } from '../testing/create-user-dto.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { UpdatePutUserDto } from '../testing/update-put-user-dto.mock';
import { UpdatePatchUserDto } from '../testing/update-patch-user-dto.mock';

describe('UserController', () => {
  let userController: UserController;
  let userService: USerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RoleGuard)
      .useValue(guardMock)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<USerService>(USerService);
  });

  test('Validar definição', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Teste da aplicação dos Guards neste controle', () => {
    test('Se os guards estão aplicados', () => {
      const guards = Reflect.getMetadata('__guards__', UserController);
      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });
  });

  describe('Create', () => {
    test('Create Method', async () => {
      const result = await userController.create(CreateUserDto);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    test('List Method', async () => {
      const result = await userController.read();
      expect(result).toEqual(userEntityList);
    });

    test('Find One Method', async () => {
      const result = await userController.readOne(1);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    test('Update Method', async () => {
      const result = await userController.update(UpdatePutUserDto, 1);
      expect(result).toEqual(userEntityList);
    });

    test('UpdatePartial Method', async () => {
      const result = await userController.updatePartial(UpdatePatchUserDto, 1);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    test('Delete Method', async () => {
      const result = await userController.delete(1);
      expect(result).toEqual({ success: true });
    });
  });
});
