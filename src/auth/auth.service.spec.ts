import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { userRepositoryMock } from '../testing/user-repository.mock';
import { jwtServiceMock } from '../testing/jwt-service.mock';
import { mailerServiceMock } from '../testing/mailer-service.mock';
import { userServiceMock } from '../testing/user-service.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { accessToken } from '../testing/access-token.mock';
import { jwtPayload } from '../testing/jwt-payload.mock';
import { AuthRegisterDto } from '../testing/auth-register-dto.mock';

describe('AuthSertvice', () => {
  let authService: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userRepositoryMock,
        jwtServiceMock,
        mailerServiceMock,
        userServiceMock,
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
  });

  test('Validar definição', async () => {
    expect(authService).toBeDefined();
  });

  describe('Token', () => {
    test('CreateToken method', () => {
      const result = authService.createToken(userEntityList[0]);
      expect(result).toEqual({ accessToken });
    });

    test('CheckToken method', () => {
      const result = authService.chekcToken(accessToken);
      expect(result).toEqual(jwtPayload);
    });

    test('IsValidToken method', () => {
      const result = authService.IsValidToken(accessToken);
      expect(result).toEqual(true);
    });
  });
  describe('Autenticação', () => {
    // test('login method', async () => {
    //   const result = await authService.login('jeyquisson@email.com.br', );
    //   expect(result).toEqual({ accessToken });
    // });

    test('forget method', async () => {
      const result = await authService.forget('jeyquisson@email.com.br');
      expect(result).toEqual({ success: true });
    });

    // test('Reset method', async () => {
    //   const result = await authService.reset('Nova@#E$E', resetToken);
    //   expect(result).toEqual(true);
    // });

    test('register method', async () => {
      const result = await authService.register(AuthRegisterDto);
      expect(result).toEqual({ accessToken });
    });
  });
});
