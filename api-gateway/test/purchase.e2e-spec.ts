import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreatePurchaseDto } from 'src/purchase/dto/create-purchase.dto';
import { PurchaseDto } from 'src/purchase/dto/purchase.dto';
// import { Transport } from '@nestjs/microservices';

describe('PurchaseController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.startAllMicroservices();

    await app.init();
  });

  describe('/purchase (POST)', () => {
    it('it should create a purchase', async () => {
      const purchaseDto: CreatePurchaseDto = {
        userId: '65ffcd1d-90f5-459b-9b02-f107079fca07',
        amount: 1,
        description: 'Desc',
        price: 10,
        value: 20,
      };

      const response = await request(app.getHttpServer())
        .post(`/purchase`)
        .send(purchaseDto);

      const purchase = response.body as PurchaseDto;

      if (purchase?.id) {
        expect(purchase.amount).toEqual(purchaseDto.amount);
        expect(typeof purchase.id).toBe('string');

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

  describe('/purchase (GET)', () => {
    it('it should return the purchase lit', async () => {
      const response = await request(app.getHttpServer()).get(`/purchase`);

      const [purchase]: any = response.body;

      if (purchase?.id) {
        expect(typeof purchase.id).toBe('string');

        expect(HttpStatus.OK);
      }
    });
  });

  describe('/purchase/:ID (GET)', () => {
    it('it should return a purchase by id', async () => {
      const id = '65ffcd1d-90f5-459b-9b02-f107079fca07';

      const response = await request(app.getHttpServer()).get(
        `/purchase/${id}`,
      );

      const purchase: any = response.body;

      if (purchase?.id) {
        expect(purchase.id).toEqual(id);
        expect(typeof purchase.id).toBe('string');

        expect(HttpStatus.OK);
      }
    });
  });

  describe('/purchase (PATCH)', () => {
    it('it should update a purchase phone', async () => {
      const id = '65ffcd1d-90f5-459b-9b02-f107079fca07';
      const purchaseDto = {
        phone: '1',
      };

      const response = await request(app.getHttpServer())
        .patch(`/purchase`)
        .send(purchaseDto);

      const purchase: any = response.body;

      if (purchase?.id) {
        expect(purchase.id).toEqual(id);
        expect(typeof purchase.id).toBe('string');

        expect(HttpStatus.OK);
      }
    });
  });

  describe('/purchase/:ID (DELETE)', () => {
    it('it should return a purchase by id', async () => {
      const id = '65ffcd1d-90f5-459b-9b02-f107079fca07';

      const response = await request(app.getHttpServer()).delete(
        `/purchase/${id}`,
      );

      if (response?.statusCode) expect(response.statusCode).toBe(HttpStatus.OK);
    });
  });
});
