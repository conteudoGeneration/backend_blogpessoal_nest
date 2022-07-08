import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {

  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'db_teste',
          autoLoadEntities: true,
          synchronize: true,
          logging: false,
          dropSchema: true
        }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

  });

  afterAll(async () => {
    await app.close();
  });

  it('Deve Cadastrar Usuario', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: ' '
      });
    expect(201)

    usuarioId = resposta.body.id;

  });

  it('Deve Autenticar Usuario (Login)', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/auth/logar')
      .send({
        username: 'root@root.com',
        password: 'rootroot',
      });
    expect(200)

    token = resposta.body.access_token;

  });

  it('Não Deve Duplicar o Usuário', async () => {
    return request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: ' '
      })
      .expect(400)
  });

  it('Deve Listar todos os Usuários', async () => {
    return request(app.getHttpServer())
      .get('/usuarios/all')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect(200)
  });

  it('Deve Atualizar um Usuário', async () => {
    return request(app.getHttpServer())
      .put('/usuarios/atualizar')
      .set('Authorization', `Bearer ` + token)
      .send({
        id: usuarioId,
        nome: 'Root Atualizado',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: ' '
      })
      .expect(200)
  });

});


