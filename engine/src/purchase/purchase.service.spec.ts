import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseService } from './purchase.service';
import { PurchaseDto } from './dto/purchase.dto';

const mock: PurchaseDto[] = [
  {
    id: '79ef5f2a-5785-414b-8401-0a751985c3fe',
    userId: 'caaf24b1-1a6c-4720-a38f-14d88577df78',
    amount: 1,
    description: 'Desc',
    price: 10,
    value: 20,
    user: {
      id: '79ef5f2a-5785-414b-8401-0a751985c3fe',
      name: 'Claudinei',
      document: '0132222334',
      email: 'email@email.com',
      phone: '5555555555',
    },
  },
];

describe('PurchaseService', () => {
  let service: PurchaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PurchaseService,
          useValue: {
            findOne: jest.fn(() => mock[0]),
            findAll: jest.fn(() => mock),
            update: jest.fn(() => mock),
            remove: jest.fn(() => mock),
          },
        },
      ],
    }).compile();

    service = module.get<PurchaseService>(PurchaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a purchase', async () => {
      const response = await service.findOne(
        '79ef5f2a-5785-414b-8401-0a751985c3fe',
      );
      expect(service.findOne).toBeCalledTimes(1);
      expect(response).toBe(mock);
    });
  });

  describe('findAll', () => {
    it('should return a upurchaseer list', async () => {
      const response = await service.findAll();
      expect(service.findAll).toBeCalledTimes(1);
      expect(response).toBe(mock);
    });
  });

  describe('update', () => {
    it('should update a purchase', async () => {
      const response = await service.update(mock[0].id, {
        amount: 5,
      });
      expect(response).toBe(mock);
    });
  });

  describe('delete', () => {
    it('should delete a purchase', async () => {
      const response = await service.remove(mock[0].id);
      expect(service.remove).toBeCalledTimes(1);
      expect(response).toBe(mock);
    });
  });
});
