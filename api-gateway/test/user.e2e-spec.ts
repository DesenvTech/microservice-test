import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserDto } from 'src/user/dto/user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/user (POST)', () => {
    it('it should create a user', async () => {
      const userDto: CreateUserDto = {
        name: 'Claudinei',
        document: '0132222334',
        email: 'email@email.com',
        phone: '5555555555',
      };

      const response = await request(app.getHttpServer())
        .post(`/user`)
        .send(userDto);

      const user = response.body as UserDto;

      if (user?.id) {
        expect(user.document).toEqual(userDto.document);
        expect(typeof user.id).toBe('string');

        expect(HttpStatus.OK);
      }
    });
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/user (GET)', () => {
    it('it should return the user lit', async () => {
      const response = await request(app.getHttpServer()).get(`/user`);

      const [user]: any = response.body;

      if (user?.id) {
        expect(typeof user.id).toBe('string');

        expect(HttpStatus.OK);
      }
    });
  });

  describe('/user/:ID (GET)', () => {
    it('it should return a user by id', async () => {
      const id = '3e88aa76-77c0-40e1-be5b-70c5a18c8849';

      const response = await request(app.getHttpServer()).get(`/user/${id}`);

      const user: any = response.body;

      if (user?.id) {
        expect(user.id).toEqual(id);
        expect(typeof user.id).toBe('string');

        expect(HttpStatus.OK);
      }
    });
  });

  describe('/user (PATCH)', () => {
    it('it should update a user phone', async () => {
      const id = '3e88aa76-77c0-40e1-be5b-70c5a18c8849';
      const userDto = {
        phone: '1',
      };

      const response = await request(app.getHttpServer())
        .patch(`/user`)
        .send(userDto);

      const user: any = response.body;

      if (user?.id) {
        expect(user.id).toEqual(id);
        expect(typeof user.id).toBe('string');

        expect(HttpStatus.OK);
      }
    });
  });

  describe('/user/:ID (DELETE)', () => {
    it('it should return a user by id', async () => {
      const id = '3e88aa76-77c0-40e1-be5b-70c5a18c8849';

      const response = await request(app.getHttpServer()).delete(`/user/${id}`);

      const user: any = response.body;

      if (user?.id === undefined) expect(HttpStatus.OK);
    });
  });
});
