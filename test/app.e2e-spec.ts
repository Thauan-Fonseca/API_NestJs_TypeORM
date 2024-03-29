import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthRegisterDto } from '../src/testing/auth-register-dto.mock';
import { Role } from '../src/enum/role.enum';
import dataSource from '../typeorm/data-source';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let userId: number;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('Registrar um novo usuário ', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(AuthRegisterDto);

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');
  });

  it('Fazer login de um novo usuário', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: AuthRegisterDto.email,
        password: AuthRegisterDto.password,
      });
    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');
    accessToken = response.body.accessToken;
  });

  it('Obter os dados do usuário logado', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/me')
      .set('Authorization', `bearer ${accessToken}`)
      .send();
    console.log('Respostaaaa', response.body);
    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.id).toEqual('number');
    expect(response.body.role).toEqual(Role.user);
  });

  it('Registrar um novo usuário como administrador', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        ...AuthRegisterDto,
        role: Role.admin,
        email: 'email2@teste.com',
      });

    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.accessToken).toEqual('string');
    accessToken = response.body.accessToken;
  });

  it('Validar se a função do novo usuário ainda é user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/me')
      .set('Authorization', `bearer ${accessToken}`)
      .send();
    expect(response.statusCode).toEqual(201);
    expect(typeof response.body.id).toEqual('number');
    expect(response.body.role).toEqual(Role.user);

    userId = response.body.id;
  });

  it('Tentar ver a lista de todos os usuários', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `bearer ${accessToken}`)
      .send();
    expect(response.statusCode).toEqual(403);
    expect(response.body.error).toEqual('Forbidden');
  });

  it('Alterando manualmente o usuário para a função administrador', async () => {
    const ds = await dataSource.initialize();
    const queryRunner = ds.createQueryRunner();
    await queryRunner.query(`
    UPDATE users SET role = ${Role.admin} WHERE id = ${userId};
    `);

    const rows = await queryRunner.query(`
      SELECT * from users WHERE id = ${userId};
    `);
    expect(rows.length).toEqual(1);
    expect(rows[0].role).toEqual(Role.admin);
  });

  it('Tentar ver a lista de todos os usuários, Agora com permissão', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `bearer ${accessToken}`)
      .send();
    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toEqual(2);
  });
});
