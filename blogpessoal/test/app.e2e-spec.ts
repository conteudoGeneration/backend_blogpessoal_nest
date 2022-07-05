import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Any } from 'typeorm';
import { Usuario } from '../src/usuario/entities/usuario.entity';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {

  let token: any;
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
          database: 'db_test',
          autoLoadEntities: true,
          synchronize: true,
          logging: false,
          dropSchema: true
        }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    async function getAdminToken() {
      let loginToken: string = '';
      const response = await request(app.getHttpServer())
        .post('/auth/logar')
        .send({
          username: 'root@root.com',
          password: 'rootroot',
        })
        

      loginToken = response.body.access_token;
      return loginToken;
    }

    token = getAdminToken();
    console.log(token);

  });

  it('Deve Cadastrar Usuario', () => {
    return request(app.getHttpServer())
      .post('/auth/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: ' '
      })
      .expect(201)
  });

  it('Deve Autenticar (Login)', () => {
    request(app.getHttpServer())
      .post('/auth/logar')
      .send({
        username: 'root@root.com',
        password: 'rootroot',
      })
      .expect(200)
  });

  it('Não Deve Duplicar o Usuário', () => {
    return request(app.getHttpServer())
      .post('/auth/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: ' '
      })
      .expect(400)
  });

 it('Deve Listar todos os Usuários', () => {
     return request(app.getHttpServer())
       .get('/usuarios/all')
       .set('Authorization', 'Bearer ${token}')
       //.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGVtYWlsLmNvbS5iciIsImlhdCI6MTY1Njk1NjEyMiwiZXhwIjoxNjU3MDQyNTIyfQ.d1_yNWQJo-ZAvZ_2DzJHo8Rg4OyiYLNIMsAv5xFQNB8`)
       .send({ })
       .expect(200)
   });
 
    /*it('Deve Atualizar um Usuário', () => {
     return request(app.getHttpServer())
       .put('/usuarios/atualizar')
       .set('Authorization', 'Bearer ${token}')
       //.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGVtYWlsLmNvbS5iciIsImlhdCI6MTY1Njk1NjEyMiwiZXhwIjoxNjU3MDQyNTIyfQ.d1_yNWQJo-ZAvZ_2DzJHo8Rg4OyiYLNIMsAv5xFQNB8`)
       .send({ 
         id : 1,
         nome: 'Root Atualizado',
         usuario: 'root@root.com',
         senha: 'rootroot',
         foto: ' '
       })
       .expect(200)
   });*/

  afterAll(async () => {
    await app.close();
  });

});
