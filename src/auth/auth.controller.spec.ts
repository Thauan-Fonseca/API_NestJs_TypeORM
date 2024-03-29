import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.contoller';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { authServiceMock } from '../testing/auth-service.mock';
import { fileServiceMock } from '../testing/file-service.mock';
import { authLoginDTO } from '../testing/auth-login-dto.mock';
import { accessToken } from '../testing/access-token.mock';
import { AuthRegisterDto } from '../testing/auth-register-dto.mock';
import { AuthRestDTO } from '../testing/auth-reset-dto.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { getPhoto } from '../testing/get-photo.mock';

describe('Auth Controller', () => {
  let authController: AuthController;
  // let fileService: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, fileServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  test('Validar definição', () => {
    expect(authController).toBeDefined();
  });

  describe('Fluxo de autenticação', () => {
    test('Login Method', async () => {
      const result = await authController.login(authLoginDTO);
      expect(result).toEqual({ accessToken });
    });
    test('Register Method', async () => {
      const result = await authController.register(AuthRegisterDto);
      expect(result).toEqual({ accessToken });
    });

    test('Forget Method', async () => {
      const result = await authController.forget(AuthRegisterDto);
      expect(result).toEqual({ success: true });
    });

    test('Reset Method', async () => {
      const result = await authController.reset(AuthRestDTO);
      expect(result).toEqual({ accessToken });
    });
  });

  describe('Me Method', () => {
    test('Me Method', async () => {
      const result = await authController.me(userEntityList[0]);
      expect(result).toEqual(userEntityList[0]);
    });

    test('UploadPhoto Method', async () => {
      const photo = await getPhoto();
      const result = await authController.uploadPhoto(userEntityList[0], photo);
      expect(result).toEqual(photo);
    });
  });
});
